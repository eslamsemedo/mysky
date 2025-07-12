"use client";
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import SafariEditDrawer from './SafariEditDrawer';

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

interface SafarisTableProps {
  safaris: Safari[];
  authToken: string;
}

export default function SafarisTable({ safaris, authToken }: SafarisTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Edit drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editSafari, setEditSafari] = useState<Safari | null>(null);

  // Filter safaris based on search
  const filteredSafaris = safaris.filter(safari =>
    safari.name.toLowerCase().includes(search.toLowerCase()) ||
    safari.description.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate results
  const total = filteredSafaris.length;
  const pagedSafaris = filteredSafaris.slice((page - 1) * pageSize, page * pageSize);

  // Refresh page after edit
  const handleSuccess = () => {
    window.location.reload();
  };

  const handleEdit = (safari: Safari) => {
    setEditSafari(safari);
    setDrawerOpen(true);
  };

  const handleAddNew = () => {
    setEditSafari(null); // null means we're creating a new safari
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search safaris..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={handleAddNew} variant="default">
          Add New Safari
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
              <th className="px-4 py-2">Transportation</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Video</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedSafaris.length ? (
              pagedSafaris.map((safari) => (
                <tr key={safari.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{safari.name}</td>
                  <td className="px-4 py-2">{safari.description}</td>
                  <td className="px-4 py-2">{safari.price}</td>
                  <td className="px-4 py-2">{safari.start_time}</td>
                  <td className="px-4 py-2">{safari.end_time}</td>
                  <td className="px-4 py-2">{safari.transportation}</td>
                  <td className="px-4 py-2">{safari.discount || 'N/A'}</td>
                  <td className="px-4 py-2">{safari.total_price || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {safari.image && (
                      <img
                        src={safari.image}
                        alt={safari.name}
                        className="h-10 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {safari.video && (
                      <a
                        href={safari.video}
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
                      <Button size="sm" variant="outline" onClick={() => handleEdit(safari)}>Edit</Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center p-8 text-gray-500">
                  {search ? 'No safaris found matching your search' : 'No safaris available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {total > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} safaris
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
      <SafariEditDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        safari={editSafari ? { ...editSafari, price: String(editSafari.price) } : null}
        onSuccess={handleSuccess}
        authToken={authToken}
      />
    </>
  );
} 