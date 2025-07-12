import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { cookies } from 'next/headers';
import HotelsTable from './HotelsTable';

interface Hotel {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_from: string;
  duration_to: string;
  image?: string;
  video_link?: string;
  location?: string;
}

async function getHotels(): Promise<Hotel[]> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  if (!authToken) {
    throw new Error('No authentication token found');
  }

  const response = await fetch('https://darkgray-termite-166434.hostingersite.com/api/hotels', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  const data = await response.json();

  // Handle different response formats
  const hotels = Array.isArray(data) ? data : (data.hotels || data.data || []);

  console.log('Hotels response:', data);
  console.log('Processed hotels:', hotels);

  return hotels;
}

export default async function HotelsPage() {
  let hotels: Hotel[];
  let authToken = '';

  try {
    hotels = await getHotels();
    const cookieStore = await cookies();
    authToken = cookieStore.get('auth_token')?.value || '';
  } catch (error) {
    console.error('Error loading hotels:', error);
    return <div>Error loading hotels: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotels</h1>
      </div>
      <HotelsTable hotels={hotels} authToken={authToken} />
    </div>
  );
} 