import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server-admin';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateInvoicePDF } from '@/lib/pdf-service';

const ADMIN_EMAILS = ['gemmyadyendra@gmail.com', 'admin@kadaipos.id', 'mamak@kadaipos.id'];

const normalizeStoreName = (name: string) =>
  name
    .replace(/^\d+\.\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const extractStoreNamesFromOrderSummary = (orderSummary: unknown): string[] => {
  const lines: string[] = Array.isArray(orderSummary)
    ? orderSummary.map((line) => String(line || '').trim())
    : typeof orderSummary === 'string'
      ? orderSummary
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
      : [];

  if (lines.length === 0) return [];

  return lines
    .map((line) => {
      const arrowSplit = line.split('->');
      if (arrowSplit.length >= 2) return arrowSplit[0].trim();

      const dashSplit = line.split(' - ');
      return dashSplit.length >= 2 ? dashSplit[0].trim() : '';
    })
    .map((name) => normalizeStoreName(name))
    .filter((name) => !!name && !name.includes('slot outlet'));
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();
    
    // Verify admin access via normal client
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

    // Get submission details using admin client to ensure we can read it
    const { data: submission, error: fetchSubError } = await adminSupabase
      .from('contact_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchSubError) throw fetchSubError;

    const isFirstApproval = submission.status === 'new';

    // 1. Update contact submission status
    const notesPrefix = isFirstApproval ? 'Approved by admin' : 'Re-applied approval by admin';
    const { error: subError } = await adminSupabase
      .from('contact_submissions')
      .update({ status: 'replied', notes: `${notesPrefix} at ${new Date().toISOString()}` })
      .eq('id', submissionId);

    if (subError) throw subError;

    // 2. Update user_profiles.outlet_count only on first approval
    if (isFirstApproval && outletCount && outletCount > 0) {
      // First get current count
      const { data: profile } = await adminSupabase
        .from('user_profiles')
        .select('outlet_count')
        .eq('id', userId)
        .single();
      
      const currentCount = profile?.outlet_count || 0;
      const newTotalCount = currentCount + outletCount;

      const { error: profileError } = await adminSupabase
        .from('user_profiles')
        .update({ outlet_count: newTotalCount })
        .eq('id', userId);
      
      if (profileError) throw profileError;
      console.log(`✅ Updated outlet_count from ${currentCount} to ${newTotalCount} for user ${userId}`);
    } else if (!isFirstApproval) {
      console.log(`ℹ️ Skipped outlet_count increment for re-approval on submission ${submissionId}`);
    }

    // 3. Activate/Upgrade Restaurants
    const metadata = submission.metadata || {};
    const restaurantIdFromMetadata = metadata.restaurantId;
    const restaurantIdsFromMetadata = Array.isArray(metadata.restaurantIds)
      ? metadata.restaurantIds.filter((id: unknown) => typeof id === 'string')
      : [];
    const orderSummaryStoreNames = extractStoreNamesFromOrderSummary(
      metadata.order_summary || metadata.orderSummary || submission.message || ''
    );
    const effectiveBusinessType = String(
      businessType || metadata.businessType || metadata.business_type || ''
    ).toLowerCase();
    
    let activatedStoreName = 'Toko';

    // Set expiration 32 days from now (30 days + 2 days grace)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 32);

    const updatePayload = {
      is_active: true,
      subscription_status: 'active',
      subscription_plan: 'monthly',
      // Map Preppo/Depo to 'pro' for now because of DB constraint 'restaurants_plan_tier_check'
      // which only allows ['toko', 'starter', 'growth', 'pro']
      plan_tier: (effectiveBusinessType === 'preppo' || effectiveBusinessType === 'depo' || effectiveBusinessType === 'pro') ? 'pro' :
                 (['toko', 'starter', 'growth', 'pro'].includes(effectiveBusinessType) ? effectiveBusinessType : 'starter'),
      is_trial: false,
      subscription_starts_at: startDate.toISOString(),
      subscription_ends_at: endDate.toISOString()
    };

    const targetRestaurantIds = new Set<string>();

    if (restaurantIdFromMetadata && typeof restaurantIdFromMetadata === 'string') {
      targetRestaurantIds.add(restaurantIdFromMetadata);
    }

    for (const id of restaurantIdsFromMetadata) {
      targetRestaurantIds.add(id);
    }

    if (orderSummaryStoreNames.length > 0) {
      const { data: ownerRestaurants, error: ownerRestaurantsError } = await adminSupabase
        .from('restaurants')
        .select('id, name')
        .eq('owner_id', userId);

      if (ownerRestaurantsError) {
        console.error('❌ Error loading owner restaurants:', ownerRestaurantsError);
      } else if (ownerRestaurants) {
        const orderSummarySet = new Set(orderSummaryStoreNames);
        for (const store of ownerRestaurants) {
          if (orderSummarySet.has(normalizeStoreName(store.name || ''))) {
            targetRestaurantIds.add(store.id);
          }
        }
      }
    }

    if (targetRestaurantIds.size > 0) {
      const targetIds = Array.from(targetRestaurantIds);
      const { data: targetedActivated, error: targetedError } = await adminSupabase
        .from('restaurants')
        .update(updatePayload)
        .in('id', targetIds)
        .select('name');

      if (targetedError) {
        console.error('❌ Error in targeted activation:', targetedError);
      } else if (targetedActivated && targetedActivated.length > 0) {
        activatedStoreName = targetedActivated[0].name;
        console.log(`✅ Activated ${targetedActivated.length} targeted restaurants for user ${userId}`);
      }
    }

    // Fallback: activate by owner (+ optional business_type) if no explicit target was found.
    if (activatedStoreName === 'Toko') {
      let massActivateQuery = adminSupabase
        .from('restaurants')
        .update(updatePayload)
        .eq('owner_id', userId);

      if (effectiveBusinessType) {
        massActivateQuery = massActivateQuery.eq('business_type', effectiveBusinessType);
      }

      const { data: activatedBunch, error: massActivateError } = await massActivateQuery.select('name');

      if (massActivateError) {
        console.error('❌ Error in mass activation:', massActivateError);
      } else if (activatedBunch && activatedBunch.length > 0) {
        activatedStoreName = activatedBunch[0].name;
        console.log(`✅ Mass activated ${activatedBunch.length} restaurants for user ${userId}`);
      }
    }

    // 4. Send approval email to customer with Invoice Attachment
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey && submission.email) {
        const resend = new Resend(resendApiKey);
        const name = submission.name || 'Pelanggan';
        const typeLabel = effectiveBusinessType === 'preppo' ? 'Preppo' : (effectiveBusinessType === 'depo' ? 'Depo' : 'Premium');
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear().toString().slice(-2);
        const fallbackId = submissionId.split('-')[0].toUpperCase().slice(0, 4);
        const invoiceNo = submission.metadata?.invoice_number || `KAD-${day}${month}${year}-${fallbackId}`;
        const totalAmount = submission.metadata?.totalAmount || 0;
        const paymentCode = submission.metadata?.payment_code || 0;
        const finalAmount = totalAmount + paymentCode;

        // Helper to format currency
        const formatIdr = (amount: number) => {
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(amount);
        };

        // Generate PDF Invoice (PAID/Lunas version)
        const pdfBytes = await generateInvoicePDF({
          invoiceNumber: invoiceNo,
          date: new Date().toLocaleDateString('id-ID'),
          customerName: name,
          customerEmail: submission.email,
          customerPhone: submission.whatsapp || '',
          businessType: typeLabel,
          items: submission.metadata?.order_summary || [`Langganan Kadai - Paket ${typeLabel} - ${formatIdr(totalAmount)}`],
          subtotal: totalAmount,
          uniqueCode: paymentCode,
          total: finalAmount,
          lang: 'id',
          status: 'PAID'
        });

        await resend.emails.send({
          from: 'Kadai <no-reply@kadaipos.id>',
          to: submission.email,
          subject: '🎉 Akun Kadai Anda Telah Aktif & Invoice Lunas',
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
                    <tr>
                        <td style="background: linear-gradient(135deg, #FF0050 0%, #D00040 100%); padding: 40px 40px 30px; text-align: center;">
                            <img src="https://kadaipos.id/logo-email.png" alt="Kadai Logo" style="height: 40px; margin-bottom: 20px;">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; line-height: 1.2;">
                                🎉 Akun Telah Aktif!
                            </h1>
                            <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; line-height: 1.5;">
                                Selamat bergabung dengan Kadai ${typeLabel}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin: 0 0 20px;">
                                Halo, ${name}! 👋
                            </h2>
                            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                                Permintaan aktivasi paket <strong>Kadai ${typeLabel}</strong> Anda telah disetujui. Akun Anda sekarang sudah <strong style="color: #FF0050;">AKTIF</strong>!
                            </p>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 24px; background: #fff5f7; border-radius: 12px; border-left: 4px solid #FF0050;">
                                        <p style="margin: 0 0 8px; font-size: 12px; color: #9B1C1C; font-weight: bold; text-transform: uppercase;">Nomor Invoice Lunas</p>
                                        <p style="font-family: monospace; font-size: 18px; font-weight: bold; color: #7F1D1D; margin: 0;">${invoiceNo}</p>
                                        <p style="margin: 8px 0 0; font-size: 13px; color: #9B1C1C;">File invoice resmi (PDF) telah kami lampirkan di email ini.</p>
                                    </td>
                                </tr>
                            </table>

                            <div style="margin-bottom: 30px;">
                                <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 600; margin: 0 0 16px;">Detail Outlet:</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #4a5568;">
                                    <li style="margin-bottom: 8px;">Toko Utama: <strong>${activatedStoreName}</strong></li>
                                    ${outletCount > 1 ? `<li>Total Slot Outlet: <strong>${outletCount} Outlet</strong></li>` : ''}
                                </ul>
                            </div>

                            <div style="text-align: center;">
                                <a href="https://app.kadai.id" style="display: inline-block; background: #FF0050; color: white; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: bold;">Masuk ke Aplikasi</a>
                            </div>
                            
                            <p style="margin-top: 30px; font-size: 12px; color: #718096; text-align: center;">
                                Butuh bantuan? Hubungi kami di WhatsApp <a href="https://wa.me/628211031903" style="color: #FF0050;">+62 821 1031 9033</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
          attachments: [
            {
              content: Buffer.from(pdfBytes).toString('base64'),
              filename: `Invoice-${invoiceNo.replace(/\//g, '-')}.pdf`,
              type: 'application/pdf',
            }
          ]
        });
        console.log(`Approval email sent with invoice to ${submission.email}`);
      }
    } catch (emailError) {
      console.error('Error sending approval email:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Upgrade approved successfully' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error in approve-upgrade API:', error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

