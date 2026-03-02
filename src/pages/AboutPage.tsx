// React import not required with the new jsx transform when not referencing React directly

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">About RKM Plumbing & Heating</h1>

        <p className="mt-4 text-gray-700">
          We’re a local plumbing and heating business based in the Coalville area, providing
          emergency callouts and planned repairs across North West Leicestershire.
        </p>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>• 24/7 emergency response (where available)</p>
          <p>• No call out charge (as advertised)</p>
          <p>• Honest advice, clear communication, and tidy workmanship</p>
        </div>

        <div className="mt-8">
          <a className="underline" href="/locations">
            See areas we cover
          </a>
        </div>
      </main>
    </div>
  );
}
