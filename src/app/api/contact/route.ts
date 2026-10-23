import { NextRequest, NextResponse } from 'next/server';
import { sendContactEnquiryEmail } from '@/lib/email';

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

    const emailResult = await sendContactEnquiryEmail({
      name: String(name).trim(),
      phone: phone ? String(phone).trim() : undefined,
      email: email ? String(email).trim() : undefined,
      subject: subject ? String(subject).trim() : undefined,
      message: String(message).trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting Rajshree Sweets & Snacks. Your inquiry has been sent to our shop email (sribhog2026@gmail.com).',
      emailDelivered: emailResult.success,
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your message. Please call us directly.' },
      { status: 500 }
    );
  }
}
