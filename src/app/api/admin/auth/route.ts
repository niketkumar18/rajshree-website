import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/db';
import { signToken, checkRequestAdminAuth, COOKIE_NAME } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const isAuth = checkRequestAdminAuth(req);
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const isValid = verifyAdminCredentials(username, password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = signToken(username);
    const response = NextResponse.json({ success: true, message: 'Login successful' });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: 'Authentication error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
