import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeInjector from '@/lib/theme-injector';
import { getBrandConfig } from '@/lib/config-loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gym Landing Page System',
  description: 'Modular landing page system for gyms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brandConfig = getBrandConfig();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeInjector config={brandConfig} />
        {children}
      </body>
    </html>
  );
}
