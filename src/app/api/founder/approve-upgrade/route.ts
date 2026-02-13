import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const ADMIN_EMAILS = ['gemmyadyendra@gmail.com', 'admin@kadaipos.id', 'mamak@kadaipos.id'];

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Verify admin access
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { submissionId, userId, outletCount, businessType } = body;

    if (!submissionId || !userId) {
      return NextResponse.json({ error: 'Submission ID and User ID are required' }, { status: 400 });
    }

    // Get submission details for email
    const { data: submission, error: fetchSubError } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchSubError) throw fetchSubError;

    // 1. Update contact submission status
    const { error: subError } = await supabase
      .from('contact_submissions')
      .update({ status: 'replied', notes: `Approved by admin at ${new Date().toISOString()}` })
      .eq('id', submissionId);

    if (subError) throw subError;

    // 2. Update user_profiles.outlet_count
    if (outletCount && outletCount > 0) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ outlet_count: outletCount })
        .eq('id', userId);
      
      if (profileError) throw profileError;
    }

    // 3. Activate the main Preppo/Depo store if applicable
    const { data: stores, error: storeFetchError } = await supabase
      .from('restaurants')
      .select('id, name, business_type')
      .eq('owner_id', userId)
      .eq('is_active', false)
      .order('created_at', { ascending: false });

    if (storeFetchError) throw storeFetchError;

    let activatedStoreName = 'Toko';
    if (stores && stores.length > 0) {
      activatedStoreName = stores[0].name;
      const { error: activateError } = await supabase
        .from('restaurants')
        .update({ 
          is_active: true,
          subscription_status: 'active',
          subscription_plan: 'monthly',
          subscription_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('id', stores[0].id);
      
      if (activateError) throw activateError;
    }

    // 4. Send approval email to customer
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey && submission.email) {
        const resend = new Resend(resendApiKey);
        const name = submission.name || 'Pelanggan';
        const typeLabel = businessType === 'preppo' ? 'Preppo' : (businessType === 'depo' ? 'Depo' : 'Premium');

        await resend.emails.send({
          from: 'Kadai <no-reply@kadaipos.id>',
          to: submission.email,
          subject: '🎉 Selamat! Akun Kadai Anda Telah Aktif',
          html: `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akun Anda Telah Aktif - Kadai</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 40px 30px; text-align: center;">
                            <div style="margin-bottom: 20px;">
                                <svg width="160" height="53" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block;">
                                    <path d="M35.8292 17.2939C38.4963 16.5793 41.2383 18.1621 41.9532 20.8291L49.7178 49.8076C50.4324 52.4748 48.8497 55.2158 46.1827 55.9307C43.5153 56.6454 40.7734 55.0628 40.0587 52.3955L32.294 23.418C31.5793 20.7508 33.1621 18.0088 35.8292 17.2939ZM17.127 20.3115C17.8419 17.6446 20.583 16.062 23.2501 16.7764C25.9174 17.4911 27.5009 20.2331 26.7862 22.9004L19.0215 51.8779C18.3068 54.5452 15.5648 56.1278 12.8975 55.4131C10.2305 54.6983 8.64788 51.9572 9.36237 49.29L17.127 20.3115ZM45.0001 4C47.7615 4.00003 50.0001 6.2386 50.0001 9C50.0001 11.7614 47.7615 14 45.0001 14H15.0001C12.2386 14 10.0001 11.7614 10.0001 9C10.0001 6.23858 12.2386 4 15.0001 4H45.0001Z" fill="#FFFFFF"/>
                                    <path d="M68 45.078V14.418H72.83V32.226H77.45L82.826 23.658H88.16L82.154 32.982C84.086 33.654 85.584 34.788 86.648 36.384C87.712 37.952 88.244 39.758 88.244 41.802V45.078H83.414V41.802C83.414 40.794 83.176 39.884 82.7 39.072C82.224 38.232 81.58 37.574 80.768 37.098C79.956 36.622 79.032 36.384 77.996 36.384H72.83V45.078H68Z" fill="#FFFFFF"/>
                                </svg>
                            </div>
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; line-height: 1.2;">
                                🎉 Akun Anda Telah Aktif!
                            </h1>
                            <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; line-height: 1.5;">
                                Selamat bergabung dengan Kadai ${typeLabel}
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
                                Kami punya kabar gembira! Permintaan aktivasi paket <strong>Kadai ${typeLabel}</strong> Anda telah disetujui dan akun Anda sekarang sudah <strong style="color: #10B981;">AKTIF</strong>! 🚀
                            </p>

                            <!-- Success Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 24px; background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%); border-radius: 12px; border-left: 4px solid #10B981;">
                                        <p style="color: #065F46; font-size: 16px; font-weight: 700; margin: 0 0 12px;">
                                            ✅ Aktivasi Berhasil
                                        </p>
                                        <ul style="margin: 0; padding-left: 20px; color: #047857;">
                                            <li style="margin-bottom: 8px;">Toko Utama (<strong>${activatedStoreName}</strong>) sudah aktif</li>
                                            ${outletCount > 1 ? `<li style="margin-bottom: 8px;">Anda memiliki total <strong>${outletCount} slot outlet</strong></li>` : ''}
                                            ${outletCount > 1 ? `<li style="margin-bottom: 8px;">Anda dapat menambah <strong>${outletCount - 1} outlet tambahan</strong> di menu Manajemen Toko</li>` : ''}
                                            <li>Semua fitur ${typeLabel} sekarang tersedia untuk Anda</li>
                                        </ul>
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
                                                    <table cellpadding="0" cellspacing="0" style="width: 32px; height: 32px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%;">
                                                        <tr>
                                                            <td align="center" valign="middle" style="color: #ffffff; font-weight: 600; font-size: 14px;">1</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 12px;">
                                                    <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 4px;">Buka Aplikasi Kadai</p>
                                                    <p style="color: #6b7280; font-size: 13px; margin: 0; line-height: 1.4;">Login dan mulai gunakan fitur-fitur baru Anda</p>
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
                                                    <table cellpadding="0" cellspacing="0" style="width: 32px; height: 32px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%;">
                                                        <tr>
                                                            <td align="center" valign="middle" style="color: #ffffff; font-weight: 600; font-size: 14px;">2</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 12px;">
                                                    <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 4px;">Kelola Toko Anda</p>
                                                    <p style="color: #6b7280; font-size: 13px; margin: 0; line-height: 1.4;">Setup menu, staff, dan konfigurasi toko Anda</p>
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
                                                    <table cellpadding="0" cellspacing="0" style="width: 32px; height: 32px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%;">
                                                        <tr>
                                                            <td align="center" valign="middle" style="color: #ffffff; font-weight: 600; font-size: 14px;">3</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="padding-left: 12px;">
                                                    <p style="color: #1a1a1a; font-size: 15px; font-weight: 600; margin: 0 0 4px;">Mulai Transaksi</p>
                                                    <p style="color: #6b7280; font-size: 13px; margin: 0; line-height: 1.4;">Sistem POS Anda siap digunakan!</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            ${outletCount > 1 ? `
                            <!-- Info Box for Multiple Outlets -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); border-left: 4px solid #3B82F6; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 8px;">
                                            📍 Menambah Outlet Tambahan
                                        </p>
                                        <p style="color: #1e40af; font-size: 14px; line-height: 1.5; margin: 0;">
                                            Anda memiliki ${outletCount - 1} slot outlet tambahan. Untuk menambahkan outlet baru, buka menu <strong>Manajemen Toko</strong> di aplikasi Kadai.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}

                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                                Terima kasih telah mempercayakan bisnis Anda kepada Kadai. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.
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
                                                    <a href="mailto:support@kadaipos.id" style="color: #10B981; font-size: 14px; font-weight: 600; text-decoration: none;">
                                                        📧 support@kadaipos.id
                                                    </a>
                                                </td>
                                                <td style="padding: 0 12px; border-left: 1px solid #e5e7eb;">
                                                    <a href="https://wa.me/6281339765775" style="color: #10B981; font-size: 14px; font-weight: 600; text-decoration: none;">
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
            </td>
        </tr>
    </table>
</body>
</html>
          `
        });
        console.log(`Approval email sent to ${submission.email}`);
      }
    } catch (emailError) {
      console.error('Error sending approval email:', emailError);
      // We don't throw here to avoid failing the whole process if only email fails
    }

    return NextResponse.json({ success: true, message: 'Upgrade approved successfully' });
  } catch (error: any) {
    console.error('Error in approve-upgrade API:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
