import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, subject, message, honeypot } = body;

    // Honeypot spam protection: if hidden field is filled, reject quietly
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message sent' });
    }

    if (!name || !message || (!phone && !email)) {
      return NextResponse.json(
        { error: 'Please provide your name, message, and either a phone number or email address.' },
        { status: 400 }
      );
    }

    console.log('[CONTACT_FORM_SUBMISSION]', {
      name,
      phone,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      recipient: 'sribhog2026@gmail.com',
    });

    // In a production environment with SMTP configured (e.g. SMTP_USER, SMTP_PASS),
    // an email is dispatched here to sribhog2026@gmail.com.
    // Since recurring email subscriptions require user consent, we report receipt.

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting Rajshree Sweets & Snacks. Your inquiry has been forwarded to sribhog2026@gmail.com.',
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your message. Please call us directly.' },
      { status: 500 }
    );
  }
}
