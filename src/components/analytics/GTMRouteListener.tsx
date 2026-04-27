'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Pushes a `page_view` event to the GTM dataLayer on every client-side
 * route change.
 *
 * Why: Next.js App Router does soft navigations (no full page reload), so
 * GTM's gtm.js only fires once on initial load. Without this listener,
 * pixels and analytics tags miss every SPA route change after the first
 * page view. We push to dataLayer so GTM Custom Event triggers can fan out
 * to GA4, Meta, TikTok, etc.
 *
 * Note: GA4's "Enhanced measurement" also auto-tracks SPA history changes,
 * so the GA4 Configuration tag inside GTM will already see SPA pageviews.
 * This listener is for ad pixels (Meta/TikTok/LinkedIn) which need an
 * explicit dataLayer event to refire on route change.
 */
export function GTMRouteListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
