import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    
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
      metadata: { ...metadata, payment_code: paymentCode, tier_name, order_summary: orderSummaryLines } 
    }).eq('id', submission.id);

    // 4. Send Emails via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const translations: Record<string, any> = {
        id: { subject: 'Permintaan Langganan Kadai', thanks: 'Terima kasih telah mengajukan permintaan langganan Kadai!', subtitle: 'Kami telah menerima permintaan Anda dan akan segera memprosesnya.', greeting: 'Halo', nameLabel: 'Nama Lengkap', emailLabel: 'Email', whatsappLabel: 'WhatsApp', businessTypeLabel: 'Tipe Bisnis', outletCountLabel: 'Jumlah Outlet', summaryLabel: 'Ringkasan Pesanan', subtotalLabel: 'Subtotal', uniqueCodeLabel: 'Kode Unik', totalLabel: 'Total Pembayaran', buttonLabel: '✅ Konfirmasi Sudah Bayar', stepsLabel: 'Langkah Selanjutnya 🚀', step1: 'Tim kami akan menghubungi Anda (WhatsApp 1x24 jam)', step2: 'Verifikasi data & pembayaran', step3: 'Aktivasi akun Kadai', footer: 'Tim Kadai akan segera menghubungi Anda.' },
        en: { subject: 'Kadai Subscription Request', thanks: 'Thank you for your Kadai subscription request!', subtitle: 'We have received your request and will process it shortly.', greeting: 'Hello', nameLabel: 'Full Name', emailLabel: 'Email', whatsappLabel: 'WhatsApp', businessTypeLabel: 'Business Type', outletCountLabel: 'Outlet Count', summaryLabel: 'Order Summary', subtotalLabel: 'Subtotal', uniqueCodeLabel: 'Unique Code', totalLabel: 'Total Payment', buttonLabel: '✅ Confirm Payment Made', stepsLabel: 'Next Steps 🚀', step1: 'Our team will contact you (WhatsApp 1x24h)', step2: 'Data & payment verification', step3: 'Kadai account activation', footer: 'Kadai Team will contact you shortly.' }
      };
      const t = translations[lang] || translations.id;

      const htmlTemplate = (isCustomer: boolean) => `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <tr><td style="background: linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%); padding: 40px; text-align: center;">
                  <h1 style="color: #ffffff; font-size: 24px; margin: 0;">${isCustomer ? t.thanks : 'NEW UPGRADE REQUEST: ' + name}</h1>
                  <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">${isCustomer ? t.subtitle : 'Business Type: ' + business_type}</p>
                </td></tr>
                <tr><td style="padding: 40px;">
                  <h2 style="font-size: 18px; margin-bottom: 20px;">${isCustomer ? t.greeting + ' ' + name + '!' : 'Customer Details'}</h2>
                  <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
                    <table width="100%">
                      <tr><td>${t.nameLabel}</td><td align="right"><b>${name}</b></td></tr>
                      <tr><td>${t.whatsappLabel}</td><td align="right"><b>${whatsapp}</b></td></tr>
                      <tr><td>${t.businessTypeLabel}</td><td align="right"><b>${business_type}</b></td></tr>
                      <tr><td>${t.outletCountLabel}</td><td align="right"><b>${outlet_count} Outlet</b></td></tr>
                    </table>
                  </div>
                  <div style="padding: 20px; background: white; border-radius: 12px; border: 2px solid #e2e8f0; margin-bottom: 30px;">
                    <p style="font-weight: bold; margin-bottom: 15px;">📦 ${t.summaryLabel}</p>
                    ${orderSummaryLines.length > 0 ? orderSummaryLines.map(line => `<p style="margin: 5px 0; font-size: 14px;">${line}</p>`).join('') : '<p style="margin: 5px 0; font-size: 14px;">Tier: ' + tier_name + '</p>'}
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                    <table width="100%">
                      <tr><td>${t.subtotalLabel}</td><td align="right">${formatIdr(total_amount)}</td></tr>
                      <tr><td style="color: #8B5CF6;">${t.uniqueCodeLabel}</td><td align="right" style="color: #8B5CF6;">+${paymentCode}</td></tr>
                      <tr><td style="font-weight: bold; font-size: 18px;">${t.totalLabel}</td><td align="right" style="font-weight: bold; font-size: 20px; color: #8B5CF6;">${formatIdr(total_amount + paymentCode)}</td></tr>
                    </table>
                  </div>
                  <div style="text-align: center; margin-bottom: 30px;">
                    <a href="https://app.kadai.id/payment/${submission.id}" style="display: inline-block; background: linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 12px rgba(255,90,95,0.3);">${t.buttonLabel}</a>
                  </div>
                  ${isCustomer ? `<h3 style="font-size: 16px; border-top: 1px solid #eee; padding-top: 20px;">${t.stepsLabel}</h3><p style="font-size: 14px; color: #666;">• ${t.step1}<br>• ${t.step2}<br>• ${t.step3}</p>` : `<p style="font-size: 11px; color: #999;">Raw Message:<br>${message.replace(/\n/g, '<br>')}</p>`}
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
        html: htmlTemplate(true)
      });
      // Admin Email
      await resend.emails.send({
        from: 'Kadai Notification <no-reply@kadaipos.id>',
        to: 'gemmyadyendra@gmail.com',
        subject: `[UPGRADE] ${name} - ${business_type}`,
        html: htmlTemplate(false)
      });
    }

    return NextResponse.json({ success: true, submissionId: submission.id }, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
