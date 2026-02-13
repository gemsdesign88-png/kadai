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
    // Use service role key to bypass RLS for public contact submissions
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
    const body = await request.json();
    
    const { 
      name, 
      email, 
      whatsapp, 
      subject, 
      message, 
      metadata 
    } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' }, 
        { status: 400, headers: corsHeaders }
      );
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

    // Use payment code from mobile app or generate if not provided
    const paymentCode = metadata?.paymentUniqueCode || Math.floor(Math.random() * 900) + 100;

    // Update submission with payment code
    const { error: updateError } = await supabase
      .from('contact_submissions')
      .update({ 
        metadata: { 
          ...metadata, 
          payment_code: paymentCode 
        } 
      })
      .eq('id', submission.id);

    if (updateError) console.error('Error updating payment code:', updateError);

    // 2. Send confirmation email to customer
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        
        console.log('📧 Sending customer email to:', email);
        
        // Parse metadata and message to get request details
        const business_type = metadata?.businessType || metadata?.business_type || 'Tidak disebutkan';
        const total_amount = metadata?.totalAmount || 0;
        
        // Parse order summary from message
        let orderSummaryLines: string[] = [];
        let tier_name = 'Tidak disebutkan';
        
        console.log('📝 Parsing message:', message);
        
        if (message) {
          // Extract summary between "Ringkasan Pesanan:" and "Total Nominal:"
          const summaryMatch = message.match(/Ringkasan Pesanan:[\r\n]+([\s\S]+?)[\r\n]+Total Nominal:/i);
          if (summaryMatch) {
            const summaryText = summaryMatch[1].trim();
            console.log('✅ Found summary text:', summaryText);
            orderSummaryLines = summaryText.split(/[\r\n]+/).filter(line => line.trim());
            console.log('📋 Order lines:', orderSummaryLines);
            
            // For single outlet, extract tier name
            if (orderSummaryLines.length === 1) {
              const tierMatch = orderSummaryLines[0].match(/-> ([^(]+)/);
              if (tierMatch) {
                tier_name = tierMatch[1].trim();
              }
            }
          } else {
            console.log('❌ No summary match found');
          }
        }
        
        const paymentDeepLink = `kadai://payment/${submission.id}`;
        const paymentWebFallback = `https://app.kadai.id/payment/${submission.id}`;
        
        // Format currency
        const formatIdr = (amount: number) => {
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(amount);
        };
        
        const customerEmailResult = await resend.emails.send({
          from: 'Kadai <no-reply@kadaipos.id>',
          to: email,
          subject: 'Permintaan Aktivasi Diterima - Kadai',
          text: `Halo ${name}! 👋

Terima kasih telah menghubungi Kadai!

Kami telah menerima permintaan aktivasi akun Anda dengan detail berikut:

Nama: ${name}
Email: ${email}
No. WhatsApp: ${whatsapp}
Tipe Bisnis: ${business_type}
Paket: ${tier_name}
Total: ${formatIdr(total_amount + paymentCode)}

Tim kami akan segera menghubungi Anda melalui WhatsApp untuk proses aktivasi lebih lanjut dalam waktu 1x24 jam.

Jika Anda memiliki pertanyaan, silakan hubungi kami:
- Email: support@kadaipos.id
- WhatsApp: +62 813-3976-5775

Terima kasih,
Tim Kadai`,
          html: `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Permintaan Aktivasi Diterima - Kadai</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%); padding: 40px 40px 30px; text-align: center;">
                            <!-- Inline SVG Logo -->
                            <div style="margin-bottom: 20px;">
                                <svg width="160" height="53" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block;">
                                    <path d="M35.8292 17.2939C38.4963 16.5793 41.2383 18.1621 41.9532 20.8291L49.7178 49.8076C50.4324 52.4748 48.8497 55.2158 46.1827 55.9307C43.5153 56.6454 40.7734 55.0628 40.0587 52.3955L32.294 23.418C31.5793 20.7508 33.1621 18.0088 35.8292 17.2939ZM17.127 20.3115C17.8419 17.6446 20.583 16.062 23.2501 16.7764C25.9174 17.4911 27.5009 20.2331 26.7862 22.9004L19.0215 51.8779C18.3068 54.5452 15.5648 56.1278 12.8975 55.4131C10.2305 54.6983 8.64788 51.9572 9.36237 49.29L17.127 20.3115ZM45.0001 4C47.7615 4.00003 50.0001 6.2386 50.0001 9C50.0001 11.7614 47.7615 14 45.0001 14H15.0001C12.2386 14 10.0001 11.7614 10.0001 9C10.0001 6.23858 12.2386 4 15.0001 4H45.0001Z" fill="#FFFFFF"/>
                                    <path d="M68 45.078V14.418H72.83V32.226H77.45L82.826 23.658H88.16L82.154 32.982C84.086 33.654 85.584 34.788 86.648 36.384C87.712 37.952 88.244 39.758 88.244 41.802V45.078H83.414V41.802C83.414 40.794 83.176 39.884 82.7 39.072C82.224 38.232 81.58 37.574 80.768 37.098C79.956 36.622 79.032 36.384 77.996 36.384H72.83V45.078H68Z" fill="#FFFFFF"/>
                                    <path d="M101.96 45.582C99.9156 45.582 98.1516 45.078 96.6676 44.07C95.1836 43.062 94.0356 41.718 93.2236 40.038C92.4396 38.33 92.0476 36.454 92.0476 34.41C92.0476 32.282 92.4956 30.378 93.3916 28.698C94.3156 26.99 95.6176 25.646 97.2976 24.666C99.0056 23.658 101.036 23.154 103.388 23.154C105.712 23.154 107.686 23.658 109.31 24.666C110.962 25.646 112.222 26.99 113.09 28.698C113.986 30.378 114.434 32.254 114.434 34.326V45.078H109.604V41.088H109.52C109.1 41.872 108.554 42.614 107.882 43.314C107.21 43.986 106.384 44.532 105.404 44.952C104.424 45.372 103.276 45.582 101.96 45.582ZM103.262 41.466C104.522 41.466 105.614 41.158 106.538 40.542C107.49 39.898 108.218 39.044 108.722 37.98C109.254 36.888 109.52 35.67 109.52 34.326C109.52 32.982 109.268 31.792 108.764 30.756C108.26 29.692 107.546 28.852 106.622 28.236C105.698 27.592 104.592 27.27 103.304 27.27C101.96 27.27 100.812 27.592 99.8596 28.236C98.9076 28.852 98.1796 29.692 97.6756 30.756C97.1716 31.82 96.9196 33.024 96.9196 34.368C96.9196 35.684 97.1716 36.888 97.6756 37.98C98.1796 39.044 98.8936 39.898 99.8176 40.542C100.77 41.158 101.918 41.466 103.262 41.466Z" fill="#FFFFFF"/>
                                    <path d="M130.167 45.582C128.459 45.582 126.905 45.316 125.505 44.784C124.133 44.224 122.957 43.426 121.977 42.39C121.025 41.354 120.283 40.136 119.751 38.736C119.247 37.308 118.995 35.74 118.995 34.032C118.995 31.848 119.429 29.944 120.297 28.32C121.193 26.696 122.425 25.436 123.993 24.54C125.561 23.616 127.353 23.154 129.369 23.154C130.377 23.154 131.329 23.308 132.225 23.616C133.121 23.924 133.933 24.358 134.661 24.918C135.389 25.478 135.977 26.136 136.425 26.892H136.467V14.418H141.297V34.116C141.297 36.468 140.821 38.512 139.869 40.248C138.945 41.956 137.643 43.272 135.963 44.196C134.311 45.12 132.379 45.582 130.167 45.582ZM130.167 41.466C131.399 41.466 132.477 41.172 133.401 40.584C134.353 39.968 135.095 39.128 135.627 38.064C136.159 37 136.425 35.768 136.425 34.368C136.425 32.968 136.159 31.736 135.627 30.672C135.095 29.608 134.353 28.782 133.401 28.194C132.477 27.578 131.385 27.27 130.125 27.27C128.921 27.27 127.843 27.578 126.891 28.194C125.939 28.81 125.197 29.65 124.665 30.714C124.133 31.778 123.867 32.996 123.867 34.368C123.867 35.768 124.133 37 124.665 38.064C125.197 39.128 125.939 39.968 126.891 40.584C127.871 41.172 128.963 41.466 130.167 41.466Z" fill="#FFFFFF"/>
                                    <path d="M155.608 45.582C153.564 45.582 151.8 45.078 150.316 44.07C148.832 43.062 147.684 41.718 146.872 40.038C146.088 38.33 145.696 36.454 145.696 34.41C145.696 32.282 146.144 30.378 147.04 28.698C147.964 26.99 149.266 25.646 150.946 24.666C152.654 23.658 154.684 23.154 157.036 23.154C159.36 23.154 161.334 23.658 162.958 24.666C164.61 25.646 165.87 26.99 166.738 28.698C167.634 30.378 168.082 32.254 168.082 34.326V45.078H163.252V41.088H163.168C162.748 41.872 162.202 42.614 161.53 43.314C160.858 43.986 160.032 44.532 159.052 44.952C158.072 45.372 156.924 45.582 155.608 45.582ZM156.91 41.466C158.17 41.466 159.262 41.158 160.186 40.542C161.138 39.898 161.866 39.044 162.37 37.98C162.902 36.888 163.168 35.67 163.168 34.326C163.168 32.982 162.916 31.792 162.412 30.756C161.908 29.692 161.194 28.852 160.27 28.236C159.346 27.592 158.24 27.27 156.952 27.27C155.608 27.27 154.46 27.592 153.508 28.236C152.556 28.852 151.828 29.692 151.324 30.756C150.82 31.82 150.568 33.024 150.568 34.368C150.568 35.684 150.82 36.888 151.324 37.98C151.828 39.044 152.542 39.898 153.466 40.542C154.418 41.158 155.566 41.466 156.91 41.466Z" fill="#FFFFFF"/>
                                    <path d="M173.861 45.078V23.658H178.691V45.078H173.861ZM176.255 20.676C175.415 20.676 174.687 20.368 174.071 19.752C173.455 19.136 173.147 18.408 173.147 17.568C173.147 16.728 173.455 16 174.071 15.384C174.687 14.768 175.415 14.46 176.255 14.46C177.123 14.46 177.851 14.768 178.439 15.384C179.055 16 179.363 16.728 179.363 17.568C179.363 18.408 179.055 19.136 178.439 19.752C177.851 20.368 177.123 20.676 176.255 20.676Z" fill="#FFFFFF"/>
                                </svg>
                            </div>
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; line-height: 1.2;">
                                Permintaan Aktivasi Diterima ✅
                            </h1>
                            <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; line-height: 1.5;">
                                Terima kasih telah memilih Kadai untuk bisnis Anda!
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin: 0 0 20px;">
                                Halo, ${name}! 👋
                            </h2>
                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Kami telah menerima permintaan aktivasi akun <strong>Kadai</strong> Anda. Tim kami sedang memproses permintaan Anda dan akan segera menghubungi Anda melalui WhatsApp.
                            </p>

                            <!-- Details Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td align="center" style="padding: 30px 20px; background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border-radius: 16px; border: 2px solid #E2E8F0;">
                                        <p style="color: #64748B; font-size: 14px; font-weight: 600; margin: 0 0 20px; text-transform: uppercase; letter-spacing: 1px;">
                                            DETAIL PERMINTAAN ANDA
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 12px 16px; text-align: left; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #64748B; font-size: 13px; margin: 0; font-weight: 600;">Nama Lengkap</p>
                                                </td>
                                                <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #1E293B; font-size: 14px; margin: 0; font-weight: 600;">${name}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 16px; text-align: left; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #64748B; font-size: 13px; margin: 0; font-weight: 600;">Email</p>
                                                </td>
                                                <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #1E293B; font-size: 14px; margin: 0; font-weight: 600;">${email}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 16px; text-align: left; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #64748B; font-size: 13px; margin: 0; font-weight: 600;">No. WhatsApp</p>
                                                </td>
                                                <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #1E293B; font-size: 14px; margin: 0; font-weight: 600;">${whatsapp}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 16px; text-align: left; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #64748B; font-size: 13px; margin: 0; font-weight: 600;">Tipe Bisnis</p>
                                                </td>
                                                <td style="padding: 12px 16px; text-align: right; border-bottom: 1px solid #E2E8F0;">
                                                    <p style="color: #1E293B; font-size: 14px; margin: 0; font-weight: 600;">${business_type}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Order Summary -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 20px; background: #FFFFFF; border-radius: 12px; border: 2px solid #E2E8F0;">
                                        <p style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 16px;">
                                            📦 Ringkasan Pesanan
                                        </p>
                                        ${orderSummaryLines.length === 0 ? `
                                            <div style="background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                                                <p style="color: #64748B; font-size: 12px; margin: 0 0 4px; font-weight: 600;">PAKET</p>
                                                <p style="color: #1E293B; font-size: 16px; margin: 0; font-weight: 700;">${business_type}</p>
                                            </div>
                                        ` : orderSummaryLines.length === 1 ? `
                                            <div style="background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                                                <p style="color: #64748B; font-size: 12px; margin: 0 0 4px; font-weight: 600;">PAKET</p>
                                                <p style="color: #1E293B; font-size: 16px; margin: 0; font-weight: 700;">${tier_name}</p>
                                            </div>
                                        ` : `
                                            <div style="background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                                                ${orderSummaryLines.map(line => `
                                                    <p style="color: #1E293B; font-size: 14px; margin: 0 0 8px; line-height: 1.6;">${line}</p>
                                                `).join('')}
                                            </div>
                                        `}
                                        <div style="border-top: 2px solid #E2E8F0; padding-top: 16px; margin-top: 16px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding: 8px 0;">
                                                        <p style="color: #64748B; font-size: 14px; margin: 0;">Subtotal</p>
                                                    </td>
                                                    <td style="padding: 8px 0; text-align: right;">
                                                        <p style="color: #1E293B; font-size: 14px; margin: 0; font-weight: 600;">${formatIdr(total_amount)}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px 0;">
                                                        <p style="color: #8B5CF6; font-size: 14px; margin: 0;">Kode Unik Verifikasi</p>
                                                    </td>
                                                    <td style="padding: 8px 0; text-align: right;">
                                                        <p style="color: #8B5CF6; font-size: 14px; margin: 0; font-weight: 700; font-family: monospace;">+${paymentCode}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding: 16px 0 8px 0; border-top: 2px solid #8B5CF6;">
                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td>
                                                                    <p style="color: #1a1a1a; font-size: 16px; margin: 0; font-weight: 700;">Total Pembayaran</p>
                                                                </td>
                                                                <td style="text-align: right;">
                                                                    <p style="color: #8B5CF6; font-size: 20px; margin: 0; font-weight: 700;">${formatIdr(total_amount + paymentCode)}</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Payment Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td align="center" style="padding: 10px 0;">
                                        <a href="${paymentWebFallback}" style="display: inline-block; background: linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 16px 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(255, 90, 95, 0.3);">
                                            💳 Lihat Detail Pembayaran
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Next Steps -->
                            <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 600; margin: 0 0 16px;">
                                Langkah Selanjutnya 🚀
                            </h3>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="40" valign="top">
                                                    <table cellpadding="0" cellspacing="0" style="width: 32px; height: 32px; background: linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%); border-radius: 50%;">
                                                        <tr>
                                                            <td align="center" valign="middle" style="color: #ffffff; font-weight: 600; font-size: 14px;">1</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 12px;">
                                                    <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 4px;">Tim kami akan menghubungi Anda</p>
                                                    <p style="color: #6b7280; font-size: 13px; margin: 0; line-height: 1.4;">Melalui WhatsApp dalam 1x24 jam</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="40" valign="top">
                                                    <table cellpadding="0" cellspacing="0" style="width: 32px; height: 32px; background: linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%); border-radius: 50%;">
                                                        <tr>
                                                            <td align="center" valign="middle" style="color: #ffffff; font-weight: 600; font-size: 14px;">2</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 12px;">
                                                    <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 4px;">Verifikasi data & pembayaran</p>
                                                    <p style="color: #6b7280; font-size: 13px; margin: 0; line-height: 1.4;">Proses verifikasi dan konfirmasi detail paket</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="40" valign="top">
                                                    <table cellpadding="0" cellspacing="0" style="width: 32px; height: 32px; background: linear-gradient(135deg, #FF5A5F 0%, #8B5CF6 100%); border-radius: 50%;">
                                                        <tr>
                                                            <td align="center" valign="middle" style="color: #ffffff; font-weight: 600; font-size: 14px;">3</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 12px;">
                                                    <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 4px;">Aktivasi akun Kadai</p>
                                                    <p style="color: #6b7280; font-size: 13px; margin: 0; line-height: 1.4;">Mulai gunakan sistem POS untuk restoran Anda!</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Info Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%); border-left: 4px solid #8B5CF6; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 8px;">
                                            💡 Tips Mempersiapkan Aktivasi
                                        </p>
                                        <p style="color: #4a5568; font-size: 14px; line-height: 1.5; margin: 0;">
                                            • Pastikan WhatsApp Anda aktif untuk dihubungi tim kami<br>
                                            • Siapkan daftar menu dan kategori restoran Anda<br>
                                            • Siapkan data staf/karyawan yang akan menggunakan sistem
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                                Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim support kami kapan saja.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding-bottom: 16px;">
                                        <p style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 8px;">
                                            Butuh Bantuan? 🤝
                                        </p>
                                        <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px;">
                                            Tim kami siap membantu Anda 24/7
                                        </p>
                                        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 12px;">
                                                    <a href="mailto:support@kadaipos.id" style="color: #FF5A5F; font-size: 14px; font-weight: 600; text-decoration: none;">
                                                        📧 support@kadaipos.id
                                                    </a>
                                                </td>
                                                <td style="padding: 0 12px; border-left: 1px solid #e5e7eb;">
                                                    <a href="https://wa.me/6281339765775" style="color: #FF5A5F; font-size: 14px; font-weight: 600; text-decoration: none;">
                                                        📱 WhatsApp
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                        <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0 0 8px;">
                                            © 2025 Kadai. All rights reserved.
                                        </p>
                                        <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
                                            <a href="https://kadaipos.id" style="color: #9ca3af; text-decoration: none;">Website</a> •
                                            <a href="https://kadaipos.id/privacy" style="color: #9ca3af; text-decoration: none;">Privacy</a> •
                                            <a href="https://kadaipos.id/terms" style="color: #9ca3af; text-decoration: none;">Terms</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>

                <!-- Plain text version note -->
                <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <p style="color: #9ca3af; font-size: 11px; line-height: 1.5; margin: 0;">
                                Email ini dikirim secara otomatis. Mohon tidak membalas email ini.<br>
                                Jika Anda memiliki pertanyaan, silakan hubungi kami melalui WhatsApp atau email support.
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>
</html>
          `
        });
        
        console.log('✅ Customer email result:', customerEmailResult);
        
        // Also notify admin
        console.log('📧 Sending admin notification...');
        const adminEmailResult = await resend.emails.send({
          from: 'Kadai System <no-reply@kadaipos.id>',
          to: 'gemmyadyendra@gmail.com',
          subject: `NEW UPGRADE REQUEST: ${name}`,
          html: `<p>User <b>${name}</b> (${email}) requested: ${subject}</p><p>Message: ${message}</p>`
        });
        
        console.log('✅ Admin email result:', adminEmailResult);
      }
    } catch (emailError) {
      console.error('❌ Error sending request confirmation email:', emailError);
    }

    return NextResponse.json(
      { success: true, submissionId: submission.id }, 
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error('Error in subscription-request API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500, headers: corsHeaders }
    );
  }
}
