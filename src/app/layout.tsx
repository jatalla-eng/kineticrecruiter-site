import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-3TJGZ1PEJ4';
const GSC_TOKEN = process.env.GOOGLE_SITE_VERIFICATION;
const BING_TOKEN = process.env.BING_SITE_VERIFICATION;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export const metadata: Metadata = {
  title: {
    default: 'KineticRecruiter | AI-Powered ATS for Recruitment Agencies',
    template: '%s',
  },
  description: 'AI-powered applicant tracking system built for recruitment agencies. Semantic search, match scoring with full transparency, and AI career highlights. No add-on fees.',
  metadataBase: new URL('https://kineticrecruiter.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
  },
  verification: {
    ...(GSC_TOKEN ? { google: GSC_TOKEN } : {}),
    ...(BING_TOKEN ? { other: { 'msvalidate.01': BING_TOKEN } } : {}),
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
    <html lang="en-US">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, webSiteSchema]) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
            </Script>
            <Script id="ga4-conversions" strategy="afterInteractive">
              {`document.addEventListener('click', function(e) {
                var a = e.target.closest('a');
                if (!a || !a.href) return;
                if (a.href.indexOf('app.kineticrecruiter.com/register') !== -1) {
                  gtag('event', 'start_trial_click', { event_category: 'conversion', link_location: a.getAttribute('data-cta') || 'page', page_path: location.pathname });
                } else if (a.href.indexOf('/contact') !== -1 && a.hostname === location.hostname) {
                  gtag('event', 'demo_request_click', { event_category: 'conversion', page_path: location.pathname });
                }
              });`}
            </Script>
          </>
        )}
        {CLARITY_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        )}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
