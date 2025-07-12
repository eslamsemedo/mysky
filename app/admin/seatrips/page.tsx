import { Button } from '../../../components/ui/button';
import { cookies } from 'next/headers';
import SeaTripsTable from './SeaTripsTable';

interface SeaTrip {
  id: number;
  name: string;
  description: string;
  price: number;
  start_time: string;
  end_time: string;
  image_url?: string;
  video_url?: string;
  discount?: string;
  transportation?: string;
  total_price?: string;
}

async function getSeaTrips(): Promise<SeaTrip[]> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  if (!authToken) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('https://darkgray-termite-166434.hostingersite.com/api/seatrips', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  const data = await response.json();

  // Handle different response formats
  const seatrips = data.seatrips || data.data || [];

  console.log('SeaTrips response:', data);
  console.log('Processed seatrips:', seatrips);

  return seatrips;
}

export default async function SeaTripsPage() {
  let seatrips: SeaTrip[];
  let authToken = '';

  try {
    seatrips = await getSeaTrips();
    const cookieStore = await cookies();
    authToken = cookieStore.get('auth_token')?.value || '';
  } catch (error) {
    console.error('Error loading seatrips:', error);
    return <div>Error loading seatrips: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SeaTrips</h1>
      </div>
      <SeaTripsTable seatrips={seatrips} authToken={authToken} />
    </div>
  );
} 