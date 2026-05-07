import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import Saint from '@/models/Saint';
import Pope from '@/models/Pope';
import LibraryBook from '@/models/LibraryBook';
import HolySite from '@/models/HolySite';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://corpus-christi.vercel.app';

  // Static routes
  const staticRoutes = [
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
    '/auth/register',
    '/library',
    '/mass-finder',
    '/pilgrimage'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    await connectDB();

    // Saints
    const saints = await Saint.find({}, 'slug updatedAt').lean();
    const saintRoutes = saints.map((s: any) => ({
      url: `${baseUrl}/saints/${s.slug}`,
      lastModified: s.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Popes
    const popes = await Pope.find({}, 'slug updatedAt').lean();
    const popeRoutes = popes.map((p: any) => ({
      url: `${baseUrl}/popes/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Library Books
    const books = await LibraryBook.find({}, 'slug updatedAt').lean();
    const bookRoutes = books.map((b: any) => ({
      url: `${baseUrl}/library/${b.slug}`,
      lastModified: b.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Holy Sites
    const sites = await HolySite.find({}, 'slug updatedAt').lean();
    const siteRoutes = sites.map((s: any) => ({
      url: `${baseUrl}/pilgrimage/${s.slug}`,
      lastModified: s.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    dynamicRoutes = [...saintRoutes, ...popeRoutes, ...bookRoutes, ...siteRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
