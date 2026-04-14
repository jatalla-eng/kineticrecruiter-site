import { Metadata } from 'next';

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** Set true on the homepage to skip the "| KineticRecruiter" suffix */
  noSuffix?: boolean;
  /** Override default robots (index, follow) — e.g. for 404 page */
  robots?: string;
}

const BASE_URL = 'https://kineticrecruiter.com';

export function generatePageMetadata({
  title,
  description,
  path,
  image = '/images/og-default.jpg',
  type = 'website',
  noSuffix = false,
  robots,
}: PageMetaProps): Metadata {
  const fullTitle = noSuffix ? title : `${title} | KineticRecruiter`;
  const url = `${BASE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'KineticRecruiter',
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    ...(robots ? { robots } : {}),
  };
}
