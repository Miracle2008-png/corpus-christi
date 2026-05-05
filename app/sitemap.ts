import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://corpus-christi.vercel.app';

  // Add all static routes
  const routes = [
    '',
    '/saints',
    '/popes',
    '/sacraments',
    '/stations',
    '/rosary',
    '/readings',
    '/calendar',
    '/history',
    '/priesthood',
    '/miracles',
    '/mass',
    '/bible/passages',
    '/bible/stories',
    '/prayers',
    '/novenas',
    '/confession',
    '/marian',
    '/catechism',
    '/apologetics',
    '/saint-of-the-day',
    '/virtues',
    '/encyclicals',
    '/donate',
    '/auth/login',
    '/auth/register'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
