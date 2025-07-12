"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../../components/ui/button';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/seatrips', label: 'SeaTrips' },
  { href: '/admin/hotels', label: 'Hotels' },
  { href: '/admin/safaris', label: 'Safaris' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 hidden md:flex flex-col border-r bg-card">
        <div className="p-6 font-bold text-lg">Sky Egypt Admin</div>
        <nav className="flex-1 flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-3 py-2 font-medium transition-colors ${pathname?.startsWith(item.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between border-b px-6 bg-card">
          <div className="font-semibold text-lg">Admin Panel</div>
          <form action="/api/admin/logout" method="POST">
            <Button type="submit" variant="outline">Logout</Button>
          </form>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
} 