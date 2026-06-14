// src/ssg-routes.ts
import { towns } from './townConfig'; // Make sure this path points to your single master towns file

// Standard core static pages
const coreRoutes = [
  '/',
  '/about',
  '/services',
  '/reviews',
  '/faq',
  '/locations' // This is the main grid page you were looking at!
];

// Dynamically generate all 5 landing variations for every village in your dictionary
const dynamicTownRoutes: string[] = [];

Object.keys(towns).forEach((slug) => {
  dynamicTownRoutes.push(`/local-plumber/${slug}/`);
  dynamicTownRoutes.push(`/emergency-plumber/${slug}/`);
  dynamicTownRoutes.push(`/heating-engineer/${slug}/`);
  dynamicTownRoutes.push(`/drain-unblocking/${slug}/`);
  dynamicTownRoutes.push(`/leak-detection/${slug}/`);
});

// Merge them together to fuel your Vite build script and Sitemap builder automatically
const ssgRoutes = [...coreRoutes, ...dynamicTownRoutes];

export default ssgRoutes;