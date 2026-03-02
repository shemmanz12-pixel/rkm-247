import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const FAQPage = () => (
  <div className="flex flex-col min-h-screen">
    <Helmet><title>FAQ | RKM Plumbing</title></Helmet>
    <Header />
    <main className="pt-32 lg:pt-40">
      <div className="container mx-auto px-4 text-center py-10">
        <h1 className="text-4xl font-black">FREQUENTLY ASKED <span className="text-[#A6892C]">QUESTIONS</span></h1>
      </div>
      <FAQ />
    </main>
    <Footer />
  </div>
);
export default FAQPage;