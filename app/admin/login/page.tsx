"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { loginAdmin } from './server-actions';
import { useRouter } from 'next/navigation';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    const result = await loginAdmin(data);
    if (result?.success) {
      router.push('/admin/dashboard');
      return;
    }
    if (result?.error) setError(result.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <Input placeholder="Username" {...register('username')} disabled={loading} />
        {errors.username && <div className="text-destructive text-sm">{errors.username.message}</div>}
        <Input type="password" placeholder="Password" {...register('password')} disabled={loading} />
        {errors.password && <div className="text-destructive text-sm">{errors.password.message}</div>}
        {error && <div className="text-destructive text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
      </form>
    </div>
  );
} 