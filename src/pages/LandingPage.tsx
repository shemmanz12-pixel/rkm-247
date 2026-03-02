import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TownData, towns as townsMap } from '../townConfig';

const defaultOffice = {
  name: 'Coalville',
  postcode: 'LE67',
  phone: '01530 654062'
};

export default function LandingPage() {
  // Accept both param names: some routes use `townName` and legacy `/plumber-in-:townSlug` uses `townSlug`
  const { townName, townSlug, serviceSlug } = useParams();
  const slug = (townName || townSlug || '').toLowerCase();

  const townsRecord = townsMap as Record<string, TownData>;
  const townFromMap = townsRecord[slug];
  const townFromName = Object.values(townsRecord).find((t) => (t.name || '').toLowerCase() === slug.replace(/-/g, ' '));

  const town: TownData | typeof defaultOffice = (townFromMap || townFromName) as any || defaultOffice;

  const displayName = town.name || defaultOffice.name;
  const displayPostcode = (town as any).postcode || defaultOffice.postcode;
  const displayPhone = (town as any).phone || defaultOffice.phone;

  const pageTitle = `Local Plumber in ${displayName} | RKM Plumbing`;
  const pageDesc = `Your trusted local plumber in ${displayName}. We serve the ${displayPostcode} area, offering emergency plumbing, drain unblocking, and boiler repairs.`;
  // Support both /local-plumber/:town and /plumber-in-:townSlug paths
  const location = useLocation();
  const pathname = location?.pathname || '';
  // If useParams doesn't provide a slug (server render mismatch), fall back to parsing the pathname
  const slugFromPath = pathname.includes('/plumber-in-') ? pathname.replace('/plumber-in-', '').replace(/\/$/, '') : slug;
  // If this is a top-level service route (e.g. "/local-plumber" or "/drain-unblocking"), use the .html canonical for the service
  const isTopLevelService = !!serviceSlug && !townName && !townSlug && pathname === `/${serviceSlug}`;
  let canonicalUrl = '';
  if (pathname.includes('/plumber-in-')) {
    canonicalUrl = `https://rkm247.co.uk/plumber-in-${slugFromPath}.html`;
  } else if (isTopLevelService) {
    canonicalUrl = `https://rkm247.co.uk/${serviceSlug}.html`;
  } else {
    canonicalUrl = `https://rkm247.co.uk/local-plumber/${slugFromPath}`;
  }

  // Minimal per-page JSON-LD so prerender can pick it up if Helmet.script is not serialized
  const fullSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${canonicalUrl}#business`,
        name: 'RKM Plumbing & Heating Services',
        url: canonicalUrl,
        telephone: '+441530654062',
        address: {
          '@type': 'PostalAddress',
          addressLocality: displayName,
          postalCode: displayPostcode
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://rkm247.co.uk/' },
          { '@type': 'ListItem', position: 2, name: `Local Plumber in ${displayName}`, item: canonicalUrl }
        ]
      }
    ]
  };


  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
  {/* Visible marker script so prerender can extract per-page JSON-LD when Helmet.script isn't serialized */}
  <script id="ssg-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }} />
      <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto', fontFamily: 'Inter, Arial, sans-serif' }}>
        <header style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 36, lineHeight: 1.1 }}>
            <span style={{ color: '#000' }}>Local Plumber Specialist</span>{' '}
            <span style={{ color: '#A6892C' }}>in {displayName}</span>
          </h1>
          <p style={{ color: '#374151', marginTop: 8 }}>{(town as any).localSpice || `Trusted local plumbers serving ${displayName} (${displayPostcode}).`}</p>
        </header>

        <main style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <section>
            <h2>Our Services in {displayName}</h2>
            <p>We provide emergency response, drain clearing, boiler repairs, and more across {displayName} ({displayPostcode}).</p>
            {/* ...rest of page content... */}
          </section>

          <aside style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e6edf3' }}>
            <div style={{ marginBottom: 12 }}>
              <h3>Contact Us</h3>
              <p style={{ margin: 0 }}><strong>Phone:</strong> <a href={`tel:${displayPhone.replace(/\s+/g,'')}`}>{displayPhone}</a></p>
              <p style={{ margin: 0 }}><strong>Area:</strong> {displayPostcode}</p>
            </div>

            <div>
              <h4>Service Area</h4>
              <p style={{ margin: 0 }}>{(town as any).landmark ? `Near ${(town as any).landmark}` : displayName}</p>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
