import { NextRequest, NextResponse } from 'next/server';
import { checkRequestAdminAuth } from '@/lib/auth';
import { sendTestEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 });
  }

  try {
    const result = await sendTestEmail();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to send test email' },
      { status: 500 }
    );
  }
}
