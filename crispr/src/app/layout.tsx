import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | BioCurious CRISPR Project',
    default: 'CRISPR Community Project',
  },
  description: 'Open-source synthetic biology research and education, making CRISPR technology accessible to everyone.',
  keywords: ['CRISPR', 'synthetic biology', 'community science', 'BioCurious', 'gene editing', 'biotechnology'],
  authors: [{ name: 'BioCurious Community' }],
  creator: 'BioCurious',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'BioCurious CRISPR Project',
    description: 'Open-source synthetic biology research and education, making CRISPR technology accessible to everyone.',
    siteName: 'BioCurious CRISPR Project',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BioCurious CRISPR Project',
    description: 'Open-source synthetic biology research and education, making CRISPR technology accessible to everyone.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-dark-surface text-dark-primary">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}