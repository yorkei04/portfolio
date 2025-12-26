import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kei - Full-Stack Developer & Game Developer',
  description:
    'Interested in software, electronic, and control engineering',
  keywords: [
    'Kei',
    'Software | Electronic | Control Engineer',
    'React',
    'Laravel',
    'Unity',
    'Computer Vision',
    'AI/ML',
    'TypeScript',
  ],
  authors: [{ name: 'Kei' }],
  creator: 'Kei',
  openGraph: {
    title: 'Kei - Software | Electronic | Control Engineer',
    description:
      'Interested in software development, electronic engineering, and control engineering.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kei Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kei - Full-Stack Developer & Game Developer',
    description:
      'Interested in software development, electronic engineering, and control engineering.',
    creator: '@zkwokleung',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
