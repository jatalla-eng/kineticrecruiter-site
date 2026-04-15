import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'KineticRecruiter | AI-Powered ATS for Recruitment Agencies',
    template: '%s',
  },
  description: 'AI-powered applicant tracking system built for recruitment agencies. Semantic search, match scoring with full transparency, and AI career highlights. No add-on fees.',
  metadataBase: new URL('https://kineticrecruiter.com'),
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
  },
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KineticRecruiter',
  url: 'https://kineticrecruiter.com',
  logo: 'https://kineticrecruiter.com/images/logo.png',
  description: 'AI-powered applicant tracking system built for recruitment agencies.',
  sameAs: [
    'https://linkedin.com/company/kineticrecruiter',
    'https://twitter.com/kineticrecruiter',
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'KineticRecruiter',
  url: 'https://kineticrecruiter.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://kineticrecruiter.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, webSiteSchema]) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
