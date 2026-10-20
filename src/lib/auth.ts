import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'rajshree-secret-session-key-2026-bengaluru';
const COOKIE_NAME = 'rss_admin_token';

export function signToken(username: string): string {
  const payload = `${username}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64');
}

export function verifyToken(token: string): string | null {
  try {
    const raw = Buffer.from(token, 'base64').toString('utf8');
    const parts = raw.split(':');
    if (parts.length !== 3) return null;
    const [username, timestamp, hmac] = parts;

    // Check expiry (e.g. 7 days)
    const ageMs = Date.now() - Number(timestamp);
    if (isNaN(ageMs) || ageMs > 7 * 24 * 60 * 60 * 1000) return null;

    const expectedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(`${username}:${timestamp}`).digest('hex');
    if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      return username;
    }
  } catch (e) {
    return null;
  }
  return null;
}

export async function isServerAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export function checkRequestAdminAuth(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export { COOKIE_NAME };
