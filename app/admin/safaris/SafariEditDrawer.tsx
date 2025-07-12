"use client";
import React, { useState, useRef } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { CldUploadWidget } from 'next-cloudinary';

interface Safari {
  id: number;
  name: string;
  description: string;
  price: string;
  start_time: string;
  end_time: string;
  transportation: number;
  image?: string;
  video?: string;
  discount?: string;
  total_price?: string;
}

interface SafariEditDrawerProps {
  open: boolean;
  onClose: () => void;
  safari: Safari | null;
  onSuccess: () => void;
  authToken: string;
}

export default function SafariEditDrawer({ open, onClose, safari, onSuccess, authToken }: SafariEditDrawerProps) {
  const [form, setForm] = useState({
    name: safari?.name || '',
    description: safari?.description || '',
    price: safari?.price || '',
    start_time: safari?.start_time || '',
    end_time: safari?.end_time || '',
    transportation: safari?.transportation?.toString() || '',
    discount: safari?.discount || '',
    total_price: safari?.total_price || '',
    image: safari?.image || '',
    video: safari?.video || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    setForm({
      name: safari?.name || '',
      description: safari?.description || '',
      price: safari?.price || '',
      start_time: safari?.start_time || '',
      end_time: safari?.end_time || '',
      transportation: safari?.transportation?.toString() || '',
      discount: safari?.discount || '',
      total_price: safari?.total_price || '',
      image: safari?.image || '',
      video: safari?.video || '',
    });
    setError(null);
  }, [safari, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${authToken}`);

      const formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("description", form.description);
      formdata.append("price", form.price);
      formdata.append("start_time", form.start_time);
      formdata.append("end_time", form.end_time);
      formdata.append("transportation", form.transportation);
      formdata.append("discount", form.discount);
      formdata.append("total_price", form.total_price);
      formdata.append("image", form.image);
      formdata.append("video", form.video);

      // Debug logging to see what's being sent
      console.log('Headers:', Object.fromEntries(myHeaders.entries()));
      console.log('FormData contents:');
      for (let [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
      }
      console.log('Safari ID:', safari?.id);
      console.log('Form state:', form);

      let url: string;
      let method: string;

      if (safari?.id) {
        // Update existing safari
        url = `https://darkgray-termite-166434.hostingersite.com/api/safaris/${safari.id}`;
        method = "POST";
      } else {
        // Create new safari
        url = `https://darkgray-termite-166434.hostingersite.com/api/safaris`;
        method = "POST";
      }

      const response = await fetch(url, {
        method: method,
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      });
      const result = await response.text();
      console.log(result);

      if (!response.ok) {
        throw new Error(result);
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || "Unknown error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!safari?.id) return;

    if (!confirm('Are you sure you want to delete this safari?')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${authToken}`);

      const response = await fetch(`https://darkgray-termite-166434.hostingersite.com/api/safaris/${safari.id}`, {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      });

      if (!response.ok) {
        const result = await response.text();
        throw new Error(result);
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to delete safari");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const isEditing = !!safari?.id;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit' : 'Add New'} Safari</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <Input name="price" value={form.price} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <Input name="start_time" value={form.start_time} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">End Time</label>
              <Input name="end_time" value={form.end_time} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Transportation</label>
              <Input name="transportation" value={form.transportation} onChange={handleChange} type="number" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Discount</label>
              <Input name="discount" value={form.discount} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium">Total Price</label>
              <Input name="total_price" value={form.total_price} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2 min-h-[60px]" required />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <CldUploadWidget
              uploadPreset="moshNext"
              options={{
                maxFileSize: 2000000, // 2MB
                sources: ["local", "camera"],
                styles: {
                  palette: {
                    window: "#07253E",
                    windowBorder: "#90A0B3",
                    tabIcon: "#0078FF",
                    menuIcons: "#5A616A",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#0078FF",
                    action: "#FF620C",
                    inactiveTabIcon: "#245DA7",
                    error: "#F44235",
                    inProgress: "#0078FF",
                    complete: "#20B832",
                    sourceBg: "#000000"
                  },
                  fonts: {
                    default: {
                      active: true
                    }
                  }
                }
              }}
              onSuccess={(result: any) => {
                const url =
                  typeof result.info === "object" && result.info && "url" in result.info
                    ? (result.info.url as string)
                    : ""
                setForm(prev => ({ ...prev, image: url }))
              }}
            >
              {({ open }: { open: () => void }) => {
                return (
                  <div className='flex items-center gap-2'>
                    <Button
                      type="button"
                      onClick={() => open()}
                      variant="outline"
                      className="cursor-pointer hover:bg-slate-500 hover:text-white transition-colors duration-300"
                    >
                      <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21,15 16,10 5,21" />
                      </svg>
                      Add Image
                    </Button>
                    <div className="text-sm text-black">
                      {form.image || 'No image'}
                    </div>
                  </div>
                )
              }}
            </CldUploadWidget>
            {form.image && (
              <div className="mt-2">
                <img src={form.image} alt="Current" className="h-20 w-32 object-cover rounded" />
              </div>
            )}
          </div>

          {/* Video URL Section */}
          <div>
            <label className="block text-sm font-medium">Video URL</label>
            <Input
              name="video"
              value={form.video}
              onChange={handleChange}
              placeholder="Enter video URL (YouTube, Vimeo, etc.)"
            />
            {form.video && (
              <a
                href={form.video}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2 text-sm"
              >
                View Video
              </a>
            )}
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end gap-2">
            {isEditing && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
} 