'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function loginAdmin({ username, password }: { username: string; password: string }) {
  try {
    // console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      cache: 'no-store',
    });
    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Login failed' };
    }
    const data = await res.json();
    const cookieStore = await cookies();
    cookieStore.set('auth_token', data.token, { httpOnly: true, path: '/', sameSite: 'lax' });
    return { success: true };
  } catch (e) {
    console.error('Login error:', e);
    return { error: 'Network error' };
  }
} 