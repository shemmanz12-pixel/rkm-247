import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import AreasCovered from '../components/AreasCovered';
import Footer from '../components/Footer';

const AreasPage = () => (
  <div className="flex flex-col min-h-screen">
    <Helmet><title>Areas We Cover | RKM Plumbing</title></Helmet>
    <Header />
    <main className="pt-32 lg:pt-40">
      <AreasCovered />
    </main>
    <Footer />
  </div>
);
export default AreasPage;