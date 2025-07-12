import { Button } from '../../../components/ui/button';
import { cookies } from 'next/headers';
import SafarisTable from './SafarisTable';

interface Safari {
  id: number;
  name: string;
  description: string;
  price: number;
  start_time: string;
  end_time: string;
  transportation: number;
  image?: string;
  video?: string;
  discount?: string;
  total_price?: string;
}

async function getSafaris(): Promise<Safari[]> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  if (!authToken) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('https://darkgray-termite-166434.hostingersite.com/api/safaris', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  const data = await response.json();

  // Handle different response formats
  const safaris = data.safaris || data.data || [];

  console.log('Safaris response:', data);
  console.log('Processed safaris:', safaris);

  return safaris;
}

export default async function SafarisPage() {
  let safaris: Safari[];
  let authToken = '';

  try {
    safaris = await getSafaris();
    const cookieStore = await cookies();
    authToken = cookieStore.get('auth_token')?.value || '';
  } catch (error) {
    console.error('Error loading safaris:', error);
    return <div>Error loading safaris: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Safaris</h1>
      </div>
      <SafarisTable safaris={safaris} authToken={authToken} />
    </div>
  );
} 