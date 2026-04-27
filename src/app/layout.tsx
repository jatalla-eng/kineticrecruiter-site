import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { GTMRouteListener } from '@/components/analytics/GTMRouteListener';

const inter = Inter({ subsets: ['latin'] });

// GA4 is now loaded via GTM (container GTM-TD2ZCRRV). The GA4 Configuration tag
// inside GTM uses Measurement ID G-3TJGZ1PEJ4. Do NOT add a separate gtag.js
// loader here — that would double-count page_view events.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || 'GTM-TD2ZCRRV';
const GSC_TOKEN = process.env.GOOGLE_SITE_VERIFICATION;
const BING_TOKEN = process.env.BING_SITE_VERIFICATION;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'wdcxcgphrx';

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
        {/* Google Tag Manager (noscript fallback) */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height={0}
              width={0}
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, webSiteSchema]) }}
        />
        {GTM_ID && (
          <>
            <Script id="gtm-init" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            {/*
              Click-event instrumentation — pushes to dataLayer (NOT gtag).
              GTM picks these up via Custom Event triggers and forwards to GA4
              + ad pixels. Replaces the previous direct gtag('event', ...) calls.
            */}
            <Script id="datalayer-click-events" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              document.addEventListener('click', function(e) {
                var a = e.target.closest('a');
                if (!a || !a.href) return;
                if (a.href.indexOf('app.kineticrecruiter.com/register') !== -1) {
                  window.dataLayer.push({
                    event: 'start_trial_click',
                    link_location: a.getAttribute('data-cta') || 'page',
                    page_path: location.pathname
                  });
                } else if (a.href.indexOf('/contact') !== -1 && a.hostname === location.hostname) {
                  window.dataLayer.push({
                    event: 'demo_request_click',
                    page_path: location.pathname
                  });
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
        <GTMRouteListener />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
