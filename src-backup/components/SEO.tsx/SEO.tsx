import React from 'react';
import { Helmet } from 'react-helmet-async';

// We pass townName and slug as props to make it 100% dynamic
interface SEOProps {
  townName: string;
  slug: string; // e.g., 'ashby-de-la-zouch'
}

const SEO: React.FC<SEOProps> = ({ townName, slug }) => {
  const rootDomain = "https://rkm247.co.uk";
  const canonical = `${rootDomain}/local-plumber/${slug}/`; // Forced trailing slash to match Netlify

  const title = `Plumber ${townName} | Local & Emergency Plumbing 24/7`;
  const description = `Reliable plumber in ${townName}. RKM provides expert local plumbing, heating repairs, and fast 24/7 emergency response. Trusted and local to ${townName}.`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "PlumbingService", 
    "name": `RKM Plumbing & Heating ${townName}`,
    "image": "https://rkm247.co.uk/logo-square.webp",
    "@id": `${canonical}#business`,
    "url": canonical,
    "telephone": "+441530654062",
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hodgetts St",
      "addressLocality": townName, // Now dynamic!
      "addressRegion": "Leicestershire",
      "postalCode": "LE67 2JH",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.7196,
      "longitude": -1.3655
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 52.7196,
        "longitude": -1.3655
      },
      "geoRadius": 32186 // Updated to 20 miles to match your site text
    },
    "hasMap": "https://share.google/vCD4kQc8elUleD1EE",
    "sameAs": [
      "https://www.checkatrade.com/trades/rkmplumbingheatingservicesltd",
      "https://www.yell.com/biz/rkm-plumbing-and-heating-services-ltd-coalville-11012663/",
      "https://www.freeindex.co.uk/profile(rkm-plumbing-heating-services-ltd)_856491.htm"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} data-rh="true" />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;