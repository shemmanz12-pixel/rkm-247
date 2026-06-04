import { Helmet } from 'react-helmet-async';

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>FAQs | RKM Plumbing</title>
        <meta name="description" content="Frequently asked questions about RKM Plumbing & Heating services in Coalville and Leicestershire. Get answers to common plumbing queries." />
        <link rel="canonical" href="https://rkm247.co.uk/faq/" />
      </Helmet>
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">FAQs</h1>

        <div className="mt-6 space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-semibold">Do you offer emergency callouts?</h2>
            <p className="mt-2">
              Yes — we provide emergency plumbing support (subject to availability). Call us and
              we’ll advise the quickest response time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Do you charge a call out fee?</h2>
            <p className="mt-2">
              We advertise no call out charge. We’ll always explain any costs clearly before work starts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">What areas do you cover?</h2>
            <p className="mt-2">
              We cover Coalville and surrounding towns and villages. See our locations page for the full list.
            </p>
            <a className="mt-2 inline-block underline" href="/locations">
              Browse service areas
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
