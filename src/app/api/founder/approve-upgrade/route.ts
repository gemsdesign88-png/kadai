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
          subject: 'Selamat! Akun Kadai Anda Telah Aktif',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #FF5A5F;">Halo ${name},</h2>
              <p>Kami punya kabar gembira! Permintaan aktivasi paket <strong>${typeLabel}</strong> Anda telah disetujui.</p>
              
              <div style="margin: 20px 0; padding: 15px; background-color: #F0FFF4; border-left: 4px solid #48BB78; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold; color: #2F855A;">Aktivasi Berhasil!</p>
                <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #38A169;">
                  <li>Toko Utama (<strong>${activatedStoreName}</strong>) sudah aktif.</li>
                  ${outletCount > 1 ? `<li>Anda memiliki total <strong>${outletCount} slot outlet</strong>.</li>` : ''}
                  ${outletCount > 1 ? `<li>Anda dapat menambah <strong>${outletCount - 1} outlet tambahan</strong> sekarang di menu Manajemen Toko.</li>` : ''}
                </ul>
              </div>

              <p>Silakan buka aplikasi Kadai Anda untuk mulai menggunakan fitur-fitur baru Anda.</p>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="font-size: 14px; color: #666;">Terima kasih telah mempercayakan bisnis Anda kepada Kadai.</p>
              </div>
              
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888;">Ini adalah email otomatis dari Kadai. Jika Anda memiliki pertanyaan, silakan hubungi kami via WhatsApp.</p>
            </div>
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
