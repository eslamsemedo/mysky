import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLoginPage from './login-form';

export default async function LoginPageWrapper() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token');

  // If user is already authenticated, redirect to dashboard
  if (authToken) {
    redirect('/admin/dashboard');
  }

  return <AdminLoginPage />;
} 