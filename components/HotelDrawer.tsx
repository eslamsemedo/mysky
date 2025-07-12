"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import api from '../lib/axios';
import type { AxiosProgressEvent } from 'axios';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price is required'),
  duration_from: z.string().min(1, 'Start date is required'),
  duration_to: z.string().min(1, 'End date is required'),
  image: z.any().optional(),
  video_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<FormData & { id: number; image: string }>;
  onSuccess: () => void;
};

export default function HotelDrawer({ open, onClose, initialData, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.image || null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    reset(initialData || {});
    setPreview(initialData?.image || null);
    setError(null);
    setProgress(0);
  }, [open, initialData, reset]);

  const imageFile = watch('image');
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', String(data.price));
    formData.append('duration_from', data.duration_from);
    formData.append('duration_to', data.duration_to);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }
    if (data.video_link) {
      formData.append('video_link', data.video_link);
    }
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      };
      if (initialData?.id) {
        await api.post(`/hotels/${initialData.id}`, formData, config);
      } else {
        await api.post('/hotels', formData, config);
      }
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to save');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-full max-w-md bg-card shadow-lg h-full p-6 overflow-y-auto relative animate-in slide-in-from-right-32">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">{initialData?.id ? 'Edit' : 'Add'} Hotel</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Name" {...register('name')} disabled={loading} />
            {errors.name && <div className="text-destructive text-sm">{errors.name.message}</div>}
          </div>
          <div>
            <Input placeholder="Description" {...register('description')} disabled={loading} />
            {errors.description && <div className="text-destructive text-sm">{errors.description.message}</div>}
          </div>
          <div>
            <Input type="number" placeholder="Price" {...register('price')} disabled={loading} />
            {errors.price && <div className="text-destructive text-sm">{errors.price.message}</div>}
          </div>
          <div className="flex gap-2">
            <Input type="date" placeholder="From" {...register('duration_from')} disabled={loading} />
            <Input type="date" placeholder="To" {...register('duration_to')} disabled={loading} />
          </div>
          <div>
            <input type="file" accept="image/*" {...register('image')} ref={fileInputRef} disabled={loading} />
            {preview && <img src={preview} alt="Preview" className="h-20 w-32 object-cover rounded mt-2" />}
            {progress > 0 && <div className="text-xs mt-1">Uploading: {progress}%</div>}
          </div>
          <div>
            <Input placeholder="Video Link (optional)" {...register('video_link')} disabled={loading} />
            {errors.video_link && <div className="text-destructive text-sm">{errors.video_link.message}</div>}
          </div>
          {error && <div className="text-destructive text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        </form>
      </div>
    </div>
  );
} 