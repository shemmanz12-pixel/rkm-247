import { Helmet } from 'react-helmet-async';

export default function AreasPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Areas We Cover | RKM Plumbing</title>
        <meta name="description" content="Discover all the areas covered by RKM Plumbing & Heating. Serving Coalville, Ashby-de-la-Zouch, and surrounding Leicestershire towns." />
        <link rel="canonical" href="https://rkm247.co.uk/areas/" />
      </Helmet>
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">Areas We Cover</h1>
        <p className="mt-4 text-gray-700">
          We provide 24/7 plumbing and heating services across Coalville and the surrounding areas.
          Visit the Locations page for a full list of towns and villages we serve.
        </p>

        <div className="mt-6">
          <a className="underline" href="/locations">
            Browse service areas
          </a>
        </div>
      </main>
    </div>
  );
}
