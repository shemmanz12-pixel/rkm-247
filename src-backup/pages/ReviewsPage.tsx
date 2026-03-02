import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';

const ReviewsPage = () => (
  <div className="flex flex-col min-h-screen">
    <Helmet><title>Reviews | RKM Plumbing</title></Helmet>
    <Header />
    <main className="pt-32 lg:pt-40">
      <div className="container mx-auto px-4 text-center py-10">
        <h1 className="text-4xl font-black">CUSTOMER <span className="text-[#A6892C]">REVIEWS</span></h1>
      </div>
      <Reviews />
    </main>
    <Footer />
  </div>
);
export default ReviewsPage;