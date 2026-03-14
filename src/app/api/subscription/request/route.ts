import { createAdminClient } from '@/lib/supabase/server-admin';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateInvoicePDF } from '@/lib/pdf-service';

// Add CORS headers for mobile app access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    
    const body = await request.json();
    const { name, email, whatsapp, subject, message, metadata } = body;

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required' }, { status: 400, headers: corsHeaders });
    }

    // 1. Insert into contact_submissions
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        whatsapp: whatsapp || '',
        subject: subject || 'KADAI - Subscription Request',
        message,
        metadata: metadata || {},
        status: 'new'
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // 2. Parse details and generate Unique Code
    const paymentCode = metadata?.paymentUniqueCode || Math.floor(Math.random() * 900) + 100;
    const lang = metadata?.language || 'id';
    
    // Generate Invoice Number: KAD-DDMMYY-XXXX
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    const shortId = submission.id.split('-')[0].toUpperCase().slice(0, 4);
    const invoiceNumber = `KAD-${day}${month}${year}-${shortId}`;

    // Format currency helper
    const formatIdr = (amount: number) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);
    };

    const rawBusinessType = metadata?.businessType || metadata?.business_type || 'Tidak disebutkan';
    const business_type = rawBusinessType === 'preppo' ? 'Kadai Preppo' : 
                          rawBusinessType === 'depo' ? 'Kadai Depo' : 
                          rawBusinessType === 'pro' ? 'Kadai Pro' : 
                          rawBusinessType === 'resto' ? 'Kadai Resto' : 
                          rawBusinessType;
    const total_amount = metadata?.totalAmount || 0;
    const outlet_count = metadata?.outletCount || 1;

    // Robust parsing logic
    let orderSummaryLines: string[] = [];
    let tier_name = 'Tidak disebutkan';

    if (message) {
      const normalizedMessage = message.replace(/\r\n/g, '\n').replace(/\n\n+/g, '\n');
      let summaryText = '';
      const patterns = [
        /Ringkasan Pesanan:[\n\r\s]*([\s\S]+?)[\n\r\s]*Total Nominal:/i,
        /Ringkasan Pesanan:[\n\r\s]*([\s\S]+?)[\n\r\s]*Total:/i,
        /Paket Yang Dipilih:[\n\r\s]*([\s\S]+?)[\n\r\s]*Pilihan Tier/i,
        /Paket Yang Dipilih:[\n\r\s]*([\s\S]+?)[\n\r\s]*Kode Unik/i
      ];

      for (const pattern of patterns) {
        const match = normalizedMessage.match(pattern);
        if (match) {
          summaryText = match[1].trim();
          break;
        }
      }
      
      if (summaryText) {
        orderSummaryLines = summaryText.split(/\n/).filter(line => line.trim());
        // Clean emojis and special sequences
        orderSummaryLines = orderSummaryLines.map(l => l.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim());
        
        if (orderSummaryLines.length >= 2 && orderSummaryLines.some(l => l.includes('Outlet'))) {
          const outletLine = orderSummaryLines.find(l => l.includes('Outlet')) || '';
          const countMatch = outletLine.match(/\(x(\d+)\s+Outlet\)/i);
          const billingMatch = orderSummaryLines.find(l => /Tahunan|Bulanan|Thn|Bln/i.test(l)) || '';
          tier_name = orderSummaryLines[0].trim();
          
          if (countMatch) {
            const count = parseInt(countMatch[1]);
            const billing = billingMatch.trim() || 'Thn';
            const priceLine = orderSummaryLines.find(l => l.includes('Rp')) || '';
            const priceVal = parseInt(priceLine.replace(/[^0-9]/g, '')) || total_amount;
            const pricePer = priceVal / count;
            
            orderSummaryLines = [`1. Slot Outlet #1 - ${tier_name} (${billing}) - ${formatIdr(pricePer)}`];
            for (let i = 2; i <= count; i++) {
              orderSummaryLines.push(`${i}. Slot Outlet #${i} (Pending Setup) - ${tier_name} (${billing}) - ${formatIdr(pricePer)}`);
            }
          }
        } else if (orderSummaryLines.length === 1) {
          const line = orderSummaryLines[0];
          const multiMatch = line.match(/(.+?)\s*->\s*(.+?)\s*\(x(\d+)\s+Outlet\)/i);
          if (multiMatch) {
            const [, storeName, tierName, count] = multiMatch;
            const c = parseInt(count);
            tier_name = tierName.trim();
            const pricePer = total_amount / c;
            orderSummaryLines = [`1. ${storeName.trim()} - ${tier_name} - ${formatIdr(pricePer)}`];
            for (let i = 2; i <= c; i++) {
              orderSummaryLines.push(`${i}. Slot Outlet #${i} (Pending Setup) - ${tier_name} - ${formatIdr(pricePer)}`);
            }
          } else {
            const tierMatch = line.match(/->\s*([^(]+)/);
            if (tierMatch) tier_name = tierMatch[1].trim();
          }
        }
      } else {
        // Fallback search for any line with ->
        const detailLine = normalizedMessage.split('\n').find(l => l.includes('->'));
        if (detailLine) {
          orderSummaryLines = [detailLine.trim()];
          const tMatch = detailLine.match(/->\s*([^(]+)/);
          if (tMatch) tier_name = tMatch[1].trim();
        }
      }
    }

    // 3. Update Database with Correct Metadata
    await supabase.from('contact_submissions').update({ 
      metadata: { ...metadata, payment_code: paymentCode, tier_name, order_summary: orderSummaryLines, invoice_number: invoiceNumber } 
    }).eq('id', submission.id);

    // 4. Send Emails via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const translations: Record<string, any> = {
        id: { 
          subject: 'Permintaan Langganan Kadai', 
          thanks: 'Terima kasih telah mengajukan permintaan langganan Kadai!', 
          subtitle: 'Kami telah menerima permintaan Anda dan akan segera memprosesnya.', 
          greeting: 'Halo', 
          nameLabel: 'Nama Lengkap', 
          emailLabel: 'Email', 
          whatsappLabel: 'WhatsApp', 
          businessTypeLabel: 'Tipe Bisnis', 
          outletCountLabel: 'Jumlah Outlet', 
          summaryLabel: 'Ringkasan Pesanan', 
          subtotalLabel: 'Subtotal', 
          uniqueCodeLabel: 'Kode Unik', 
          totalLabel: 'Total Pembayaran', 
          buttonLabel: '✅ Konfirmasi Sudah Bayar', 
          stepsLabel: 'Langkah Selanjutnya 🚀', 
          step1: 'Tim kami akan menghubungi Anda (WhatsApp 1x24 jam)', 
          step2: 'Verifikasi data & pembayaran', 
          step3: 'Aktivasi akun Kadai', 
          footer: 'Tim Kadai akan segera menghubungi Anda.', 
          invoiceLabel: 'Nomor Invoice',
          paymentInfoLabel: '🏦 Informasi Pembayaran',
          bankLabel: 'Bank',
          accountNoLabel: 'No. Rekening',
          accountNameLabel: 'Atas Nama',
          transferNote: 'Mohon transfer tepat sampai 3 digit terakhir agar sistem dapat mendeteksi pembayaran Anda secara otomatis.'
        },
        en: { 
          subject: 'Kadai Subscription Request', 
          thanks: 'Thank you for your Kadai subscription request!', 
          subtitle: 'We have received your request and will process it shortly.', 
          greeting: 'Hello', 
          nameLabel: 'Full Name', 
          emailLabel: 'Email', 
          whatsappLabel: 'WhatsApp', 
          businessTypeLabel: 'Business Type', 
          outletCountLabel: 'Outlet Count', 
          summaryLabel: 'Order Summary', 
          subtotalLabel: 'Subtotal', 
          uniqueCodeLabel: 'Unique Code', 
          totalLabel: 'Total Payment', 
          buttonLabel: '✅ Confirm Payment Made', 
          stepsLabel: 'Next Steps 🚀', 
          step1: 'Our team will contact you (WhatsApp 1x24h)', 
          step2: 'Data & payment verification', 
          step3: 'Kadai account activation', 
          footer: 'Kadai Team will contact you shortly.', 
          invoiceLabel: 'Invoice Number',
          paymentInfoLabel: '🏦 Payment Information',
          bankLabel: 'Bank',
          accountNoLabel: 'Account Number',
          accountNameLabel: 'Account Name',
          transferNote: 'Please transfer the exact amount including the last 3 digits so our system can detect your payment automatically.'
        }
      };
      const t = translations[lang] || translations.id;

      // Generate PDF Invoice
      const pdfBytes = await generateInvoicePDF({
        invoiceNumber,
        date: new Date().toLocaleDateString('id-ID'),
        customerName: name,
        customerEmail: email,
        customerPhone: whatsapp || '',
        businessType: business_type,
        items: orderSummaryLines.length > 0 ? orderSummaryLines : [`Langganan Kadai - Paket ${tier_name} - ${formatIdr(total_amount)}`],
        subtotal: total_amount,
        uniqueCode: paymentCode,
        total: total_amount + paymentCode,
        lang,
        status: 'PENDING'
      });

      const htmlTemplate = (isCustomer: boolean) => `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                <tr><td style="background: linear-gradient(135deg, #FF0050 0%, #CC0040 100%); padding: 40px; text-align: center;">
                  <img src="https://kadaipos.id/logo-email.png" alt="Kadai Logo" style="height: 48px; margin-bottom: 24px;">
                  <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">${isCustomer ? t.thanks : 'NEW UPGRADE REQUEST: ' + name}</h1>
                  <p style="color: rgba(255,255,255,0.9); margin-top: 12px; font-size: 16px;">${isCustomer ? t.subtitle : 'Business Type: ' + business_type}</p>
                </td></tr>
                <tr><td style="padding: 40px;">
                  <h2 style="font-size: 18px; margin-bottom: 24px; color: #1a1a1a;">${isCustomer ? t.greeting + ' ' + name + '!' : 'Customer Details'}</h2>
                  
                  <div style="background: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; margin-bottom: 32px;">
                    <table width="100%" style="border-spacing: 0;">
                      <tr><td style="padding: 8px 0; color: #64748b;">${t.invoiceLabel}</td><td align="right" style="padding: 8px 0;"><strong>${invoiceNumber}</strong></td></tr>
                      <tr><td style="padding: 8px 0; color: #64748b;">${t.nameLabel}</td><td align="right" style="padding: 8px 0;"><strong>${name}</strong></td></tr>
                      <tr><td style="padding: 8px 0; color: #64748b;">${t.whatsappLabel}</td><td align="right" style="padding: 8px 0;"><strong>${whatsapp}</strong></td></tr>
                      <tr><td style="padding: 8px 0; color: #64748b;">${t.businessTypeLabel}</td><td align="right" style="padding: 8px 0;"><strong>${business_type}</strong></td></tr>
                      <tr><td style="padding: 8px 0; color: #64748b;">${t.outletCountLabel}</td><td align="right" style="padding: 8px 0;"><strong>${outlet_count} Outlet</strong></td></tr>
                    </table>
                  </div>

                  <div style="padding: 24px; background: #fff5f7; border-radius: 16px; border: 1px solid #fed7e2; margin-bottom: 32px;">
                    <p style="font-weight: 800; margin: 0 0 16px; color: #9B1C1C; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">${t.paymentInfoLabel}</p>
                    <table width="100%" style="font-size: 14px; border-spacing: 0;">
                      <tr><td style="padding: 8px 0; color: #702459;">${t.bankLabel}</td><td align="right" style="padding: 8px 0;"><strong>BCA</strong></td></tr>
                      <tr><td style="padding: 8px 0; color: #702459;">${t.accountNoLabel}</td><td align="right" style="padding: 8px 0;"><strong style="font-family: 'SF Mono', Consolas, monospace; font-size: 18px; color: #FF0050;">8690868653</strong></td></tr>
                      <tr><td style="padding: 8px 0; color: #702459;">${t.accountNameLabel}</td><td align="right" style="padding: 8px 0;"><strong>Gemmy Adyendra</strong></td></tr>
                      <tr><td colspan="2" style="padding-top: 16px; border-top: 1px solid #fed7e2; font-size: 12px; color: #9B1C1C; line-height: 1.5; font-style: italic;">${t.transferNote}</td></tr>
                    </table>
                  </div>

                  <div style="padding: 24px; background: white; border-radius: 16px; border: 2px solid #f1f5f9; margin-bottom: 32px;">
                    <p style="font-weight: 800; margin-bottom: 16px; color: #1a1a1a;">📦 ${t.summaryLabel}</p>
                    ${orderSummaryLines.length > 0 ? orderSummaryLines.map(line => `<p style="margin: 8px 0; font-size: 14px; color: #475569;">• ${line}</p>`).join('') : '<p style="margin: 8px 0; font-size: 14px; color: #475569;">• Tier: ' + tier_name + '</p>'}
                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;">
                    <table width="100%">
                      <tr><td style="padding: 4px 0; color: #64748b;">${t.subtotalLabel}</td><td align="right" style="padding: 4px 0;">${formatIdr(total_amount)}</td></tr>
                      <tr><td style="padding: 4px 0; color: #FF0050; font-weight: 600;">${t.uniqueCodeLabel}</td><td align="right" style="padding: 4px 0; color: #FF0050; font-weight: 600;">+${paymentCode}</td></tr>
                      <tr><td style="padding: 16px 0 0; font-weight: 800; font-size: 18px; color: #1a1a1a;">${t.totalLabel}</td><td align="right" style="padding: 16px 0 0; font-weight: 800; font-size: 20px; color: #FF0050;">${formatIdr(total_amount + paymentCode)}</td></tr>
                    </table>
                  </div>

                  <div style="text-align: center; margin-bottom: 32px;">
                    <a href="https://wa.me/628211031903?text=${encodeURIComponent('Halo Admin, saya konfirmasi pembayaran untuk Invoice ' + invoiceNumber)}" style="display: inline-block; background: #FF0050; color: white; padding: 18px 48px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 16px; box-shadow: 0 4px 14px rgba(255,0,80,0.4);">${t.buttonLabel}</a>
                  </div>

                  ${isCustomer ? `
                  <div style="border-top: 2px solid #f1f5f9; padding-top: 32px;">
                    <h3 style="font-size: 16px; font-weight: 800; color: #1a1a1a; margin-bottom: 16px;">${t.stepsLabel}</h3>
                    <div style="color: #64748b; font-size: 14px; line-height: 1.6;">
                      <p style="margin: 8px 0;">✅ ${t.step1}</p>
                      <p style="margin: 8px 0;">✅ ${t.step2}</p>
                      <p style="margin: 8px 0;">✅ ${t.step3}</p>
                    </div>
                  </div>
                  ` : `
                  <div style="border-top: 2px solid #f1f5f9; padding-top: 32px;">
                    <p style="font-size: 11px; color: #94a3b8; font-family: monospace;">Raw Message Source:<br>${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  `}

                  <p style="margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: center;">
                    Email ini dikirim secara otomatis oleh sistem penagihan Kadai.<br>
                    &copy; 2026 PT Kadai Indonesia. All rights reserved.
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `;

      // Customer Email
      await resend.emails.send({
        from: 'Kadai <no-reply@kadaipos.id>',
        to: email,
        subject: t.subject,
        html: htmlTemplate(true),
        attachments: [
          {
            filename: `Invoice_${invoiceNumber}.pdf`,
            content: Buffer.from(pdfBytes)
          }
        ]
      });
      // Admin Email
      await resend.emails.send({
        from: 'Kadai Notification <no-reply@kadaipos.id>',
        to: 'gemmyadyendra@gmail.com',
        subject: `[UPGRADE] ${name} - ${business_type}`,
        html: htmlTemplate(false),
        attachments: [
          {
            filename: `Invoice_${invoiceNumber}.pdf`,
            content: Buffer.from(pdfBytes)
          }
        ]
      });
    }

    return NextResponse.json({ success: true, submissionId: submission.id, invoiceNumber }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
