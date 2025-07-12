import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from '../lib/providers/react-query-provider';
import { ZustandProvider } from '../lib/providers/zustand-provider';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ZustandProvider>
            {children}
          </ZustandProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

