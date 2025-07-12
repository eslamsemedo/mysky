import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { Card } from '../../../components/ui/card';
import { cookies } from 'next/headers';
import InteractiveTabs from './InteractiveTabs';

// Function to extract columns from data
const extractColumns = (data: any[]): string[] => {
  if (data.length === 0) return [];

  // Get all unique keys from all objects
  const allKeys = new Set<string>();
  data.forEach(item => {
    if (item && typeof item === 'object') {
      Object.keys(item).forEach(key => allKeys.add(key));
    }
  });

  // Filter out unwanted columns
  const unwantedColumns = [
    'id', 'created_at', 'updated_at', 'createdAt', 'updatedAt',
    'image', 'images', 'video', 'videos', 'photo', 'photos',
    'thumbnail', 'thumbnails', 'banner', 'banners',
    'image_url', 'video_url', 'photo_url', 'thumbnail_url',
    'imageUrl', 'videoUrl', 'photoUrl', 'thumbnailUrl'
  ];

  const filteredKeys = Array.from(allKeys).filter(key =>
    !unwantedColumns.some(unwanted =>
      key.toLowerCase().includes(unwanted.toLowerCase())
    )
  );

  return filteredKeys;
};

type DashboardStats = {
  seatrips: any[];
  hotels: any[];
  safaris: any[];
};

async function getDashboardStats(): Promise<DashboardStats> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  if (!authToken) {
    throw new Error('No authentication token found');
  }

  const [seatripsRes, hotelsRes, safarisRes] = await Promise.all([
    fetch('https://darkgray-termite-166434.hostingersite.com/api/seatrips', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }),
    fetch('https://darkgray-termite-166434.hostingersite.com/api/hotels', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }),
    fetch('https://darkgray-termite-166434.hostingersite.com/api/safaris', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }),
  ]);

  const [seatripsData, hotelsData, safarisData] = await Promise.all([
    seatripsRes.json(),
    hotelsRes.json(),
    safarisRes.json(),
  ]);

  // Log the raw responses to debug
  console.log('Seatrips response:', seatripsData);
  console.log('Hotels response:', hotelsData);
  console.log('Safaris response:', safarisData);

  // Handle different response formats based on the actual API responses
  const seatrips = seatripsData.seatrips || [];
  const hotels = Array.isArray(hotelsData) ? hotelsData : [];
  const safaris = safarisData.safaris || [];

  console.log('Processed data:', { seatrips, hotels, safaris });

  return {
    seatrips,
    hotels,
    safaris,
  };
}

export default async function DashboardPage() {
  let data: DashboardStats;

  try {
    data = await getDashboardStats();
  } catch (error) {
    console.error('Error loading dashboard:', error);
    return <div>Error loading dashboard: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  const statCards = [
    { label: 'SeaTrips', value: data.seatrips.length },
    { label: 'Hotels', value: data.hotels.length },
    { label: 'Safaris', value: data.safaris.length },
  ];

  const tabData = [
    {
      key: 'seatrips',
      label: 'SeaTrips',
      rows: data.seatrips.slice(0, 5),
      columns: extractColumns(data.seatrips)
    },
    {
      key: 'hotels',
      label: 'Hotels',
      rows: data.hotels.slice(0, 5),
      columns: extractColumns(data.hotels)
    },
    {
      key: 'safaris',
      label: 'Safaris',
      rows: data.safaris.slice(0, 5),
      columns: extractColumns(data.safaris)
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} className="p-6 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-muted-foreground">{card.label}</div>
          </Card>
        ))}
      </div>
      <InteractiveTabs tabData={tabData} />
    </div>
  );
} 