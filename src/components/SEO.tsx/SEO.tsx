import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  townName?: string; // display name
  slug?: string; // URL slug e.g. 'ashby-de-la-zouch'
}

const ROOT = 'https://rkm247.co.uk';

function toSlug(s?: string) {
  if (!s) return '';
  return s
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function ensureTrailingSlash(p: string) {
  if (!p) return '/';
  return p.endsWith('/') ? p : p + '/';
}

const SEO: React.FC<SEOProps> = ({ townName = 'Coalville', slug }) => {
  const slugified = slug ? toSlug(slug) : toSlug(townName);
  const canonicalPath = slugified ? `/local-plumber/${slugified}/` : '/';
  const canonical = `${ROOT}${ensureTrailingSlash(canonicalPath)}`.replace('//', '/').replace('https:/', 'https://');

  const title = townName ? `Plumber ${townName} | Local & Emergency Plumbing 24/7` : 'RKM Plumbing & Heating Services';
  const description = townName
    ? `Reliable plumber in ${townName}. RKM provides expert local plumbing, heating repairs, and fast 24/7 emergency response.`
    : 'RKM Plumbing & Heating Services — Local plumbing, heating and emergency repairs.';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PlumbingService',
    name: `RKM Plumbing & Heating Services${townName ? ' - ' + townName : ''}`,
    '@id': `${canonical}#business`,
    url: canonical,
    telephone: '+441530654062',
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hodgetts St',
      addressLocality: townName,
      addressRegion: 'Leicestershire',
      postalCode: 'LE67',
      addressCountry: 'GB'
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* added data-rh to canonical so postbuild scripts keep the React canonical */}
      <link rel="canonical" href={canonical} data-rh="true" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
  {/* Backup JSON-LD marker in body so prerender can extract it if Helmet.script failed to serialize */}
  <script id="ssg-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Helmet>
  );
};

export default SEO;