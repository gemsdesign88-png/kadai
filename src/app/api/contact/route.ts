import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('API Contact - Received body:', body);
    const { name, email, whatsapp, subject, message } = body;

    // Basic validation
    if (!name || name.trim().length < 2) {
      console.log('API Contact - Validation failed: name');
      return NextResponse.json({ error: 'Name is too short' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      console.log('API Contact - Validation failed: email');
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (!whatsapp || whatsapp.trim().length < 8) {
      console.log('API Contact - Validation failed: whatsapp');
      return NextResponse.json({ error: 'Valid WhatsApp number is required' }, { status: 400 });
    }
    if (!subject || subject.trim().length < 2) {
      console.log('API Contact - Validation failed: subject');
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }
    if (!message || message.trim().length < 10) {
      console.log('API Contact - Validation failed: message');
      return NextResponse.json({ error: 'Message is too short' }, { status: 400 });
    }

    const supabase = await createClient();

    // Insert into contact_submissions table
    const { data, error: supabaseError } = await supabase
      .from('contact_submissions')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'new'
      })
      .select()
      .single();

    if (supabaseError) {
      console.error('Contact submission database error:', supabaseError);
      return NextResponse.json(
        { error: 'Failed to save message', details: supabaseError.message },
        { status: 500 }
      );
    }

    // Try to send email notifications
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.warn('Email sending skipped: RESEND_API_KEY is not set');
      } else {
        const resend = new Resend(resendApiKey);

        // 1. Send notification to admin
        await resend.emails.send({
          from: 'Kadai Marketing <no-reply@kadaipos.id>',
          to: 'mamak@kadaipos.id',
          subject: `New Lead: ${subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #FF5A5F;">New Contact Submission</h2>
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>WhatsApp:</strong> ${whatsapp}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #888;">Submitted via Kadai Marketing Website</p>
            </div>
          `
        });

        // 2. Send confirmation to user
        await resend.emails.send({
          from: 'Kadai <no-reply@kadaipos.id>',
          to: email,
          subject: 'We received your message!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #FF5A5F;">Hello ${name},</h2>
              <p>Thank you for reaching out to us. We have received your message regarding "<strong>${subject}</strong>" and our team will get back to you shortly.</p>
              <p>Our typical response time is within 24 hours.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 14px;"><strong>Your message:</strong></p>
              <p style="font-style: italic; color: #666;">${message}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888;">This is an automated confirmation from Kadai. Please do not reply directly to this email.</p>
            </div>
          `
        });
      }
    } catch (mailError) {
      // We don't want to fail the whole request if email fails,
      // as long as it's saved in the database.
      console.error('Email sending error:', mailError);
    }

    // Success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        data 
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
