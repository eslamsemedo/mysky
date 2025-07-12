'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAdmin() {
  const cookieStore = await cookies();

  // Clear the auth token cookie
  cookieStore.delete('auth_token');

  // Redirect to login page
  redirect('/admin/login');
} 