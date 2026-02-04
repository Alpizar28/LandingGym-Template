import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeInjector from '@/lib/theme-injector';
import { BrandConfig } from '@/lib/config-loader';
import { client, BRAND_QUERY } from '@/lib/sanity';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gym Landing Page System',
  description: 'Modular landing page system for gyms',
};

// Default config if Sanity is empty
const defaultConfig: BrandConfig = {
  gymId: 'default',
  brandName: 'Gym Template',
  colors: {
    primary: '#3b82f6',
    secondary: '#1e293b',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#0f172a',
    muted: '#64748b'
  },
  typography: {
    heading: 'Inter',
    body: 'Inter',
    googleFonts: []
  },
  activeSections: [],
  extractedFrom: ''
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch brand data from Sanity
  const brandData = await client.fetch(BRAND_QUERY).catch(() => null);

  // Merge with default config
  const config: BrandConfig = brandData ? {
    ...defaultConfig,
    brandName: brandData.name || defaultConfig.brandName,
    colors: { ...defaultConfig.colors, ...brandData.colors },
    typography: { ...defaultConfig.typography, ...brandData.typography }
  } : defaultConfig;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeInjector config={config} />
        {children}
      </body>
    </html>
  );
}
