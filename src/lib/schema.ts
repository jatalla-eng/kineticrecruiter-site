export function softwareApplicationSchema(opts: {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'ApplicantTrackingSystem',
    operatingSystem: 'Web',
    description: opts.description,
    url: opts.url,
    ...(opts.featureList ? { featureList: opts.featureList } : {}),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '29',
      highPrice: '99',
      offerCount: '3',
    },
    provider: {
      '@type': 'Organization',
      name: 'KineticRecruiter',
      url: 'https://kineticrecruiter.com',
    },
  };
}
