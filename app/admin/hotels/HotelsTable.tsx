"use client";
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import HotelEditDrawer from './HotelEditDrawer';

interface Hotel {
  id: number;
  name: string;
  description: string;
  image?: string;
  video_link?: string;
  location?: string;
  city?: string;
  admin_id?: number;
  image_url?: string;
}

interface HotelsTableProps {
  hotels: Hotel[];
  authToken: string;
}

export default function HotelsTable({ hotels, authToken }: HotelsTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Edit drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editHotel, setEditHotel] = useState<Hotel | null>(null);

  // Filter hotels based on search
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.description.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate results
  const total = filteredHotels.length;
  const pagedHotels = filteredHotels.slice((page - 1) * pageSize, page * pageSize);

  // Refresh page after edit
  const handleSuccess = () => {
    window.location.reload();
  };

  const handleEdit = (hotel: Hotel) => {
    setEditHotel(hotel);
    setDrawerOpen(true);
  };

  const handleAddNew = () => {
    setEditHotel(null); // null means we're creating a new hotel
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search hotels..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleAddNew} variant="default">
          Add New Hotel
        </Button>
      </div>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Image URL</th>
              <th className="px-4 py-2">Video Link</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedHotels.length ? (
              pagedHotels.map((hotel) => (
                <tr key={hotel.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{hotel.name}</td>
                  <td className="px-4 py-2">{hotel.description}</td>
                  <td className="px-4 py-2">
                    {hotel.location ? (
                      <a
                        href={hotel.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {hotel.location}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{hotel.city || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {hotel.image && (
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-10 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {hotel.image_url ? (
                      <a href={hotel.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Image URL</a>
                    ) : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {hotel.video_link && (
                      <a
                        href={hotel.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Video
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(hotel)}>Edit</Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-8 text-gray-500">
                  {search ? 'No hotels found matching your search' : 'No hotels available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {total > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} hotels
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>
            <span className="px-2 py-1 text-sm">Page {page}</span>
            <Button
              size="sm"
              variant="outline"
              disabled={page * pageSize >= total}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      <HotelEditDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        hotel={editHotel}
        onSuccess={handleSuccess}
        authToken={authToken}
      />
    </>
  );
} 