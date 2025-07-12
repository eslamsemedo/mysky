"use client";
import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import SeaTripEditDrawer from './SeaTripEditDrawer';

interface SeaTrip {
  id: number;
  name: string;
  description: string;
  price: number;
  start_time: string;
  end_time: string;
  image?: string;
  video_url?: string;
  discount?: string;
  transportation?: string;
  total_price?: string;
}

interface SeaTripsTableProps {
  seatrips: SeaTrip[];
  authToken: string;
}

export default function SeaTripsTable({ seatrips, authToken }: SeaTripsTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Edit drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTrip, setEditTrip] = useState<SeaTrip | null>(null);

  // Filter seatrips based on search
  const filteredSeaTrips = seatrips.filter(trip =>
    trip.name.toLowerCase().includes(search.toLowerCase()) ||
    trip.description.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate results
  const total = filteredSeaTrips.length;
  const pagedSeaTrips = filteredSeaTrips.slice((page - 1) * pageSize, page * pageSize);

  // Refresh page after edit
  const handleSuccess = () => {
    window.location.reload();
  };

  const handleEdit = (trip: SeaTrip) => {
    setEditTrip(trip);
    setDrawerOpen(true);
  };

  const handleAddNew = () => {
    setEditTrip(null); // null means we're creating a new trip
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search seatrips..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleAddNew} variant="default">
          Add New SeaTrip
        </Button>
      </div>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price (EGP)</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Transportation</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Video</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedSeaTrips.length ? (
              pagedSeaTrips.map((trip) => (
                <tr key={trip.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{trip.name}</td>
                  <td className="px-4 py-2">{trip.description}</td>
                  <td className="px-4 py-2">{trip.price}</td>
                  <td className="px-4 py-2">{trip.start_time}</td>
                  <td className="px-4 py-2">{trip.end_time}</td>
                  <td className="px-4 py-2">{trip.discount || 'N/A'}</td>
                  <td className="px-4 py-2">{trip.transportation || 'N/A'}</td>
                  <td className="px-4 py-2">{trip.total_price || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {trip.image && (
                      <img
                        src={trip.image}
                        alt={trip.name}
                        className="h-10 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {trip.video_url && (
                      <a
                        href={trip.video_url}
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
                      <Button size="sm" variant="outline" onClick={() => handleEdit(trip)}>Edit</Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center p-8 text-gray-500">
                  {search ? 'No seatrips found matching your search' : 'No seatrips available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {total > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} seatrips
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
      <SeaTripEditDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        trip={editTrip ? { ...editTrip, price: String(editTrip.price) } : null}
        onSuccess={handleSuccess}
        authToken={authToken}
      />
    </>
  );
} 