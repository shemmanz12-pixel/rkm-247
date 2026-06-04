import { Helmet } from 'react-helmet-async';

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Customer Reviews | RKM Plumbing</title>
        <meta name="description" content="Read real customer reviews for RKM Plumbing & Heating, serving Coalville and Leicestershire. See why customers trust us for their plumbing needs." />
        <link rel="canonical" href="https://rkm247.co.uk/reviews/" />
      </Helmet>
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">Customer Reviews</h1>

        <p className="mt-4 text-gray-700">
          We’re proud of the feedback we receive from customers across Coalville and surrounding
          areas. If you’ve used us before, we’d really appreciate a review.
        </p>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>• Fast response and clear communication</p>
          <p>• Tidy work and honest advice</p>
          <p>• Emergency and planned repairs</p>
        </div>

        <div className="mt-8 space-x-4">
          <a className="underline" href="https://www.google.com/maps?cid=8563941863799829844" target="_blank" rel="noreferrer">
            View Google reviews
          </a>
          <a className="underline" href="/locations">
            Areas we cover
          </a>
        </div>
      </main>
    </div>
  );
}
