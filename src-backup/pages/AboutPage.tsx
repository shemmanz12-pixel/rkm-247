import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import About from '../components/About'; 
import Footer from '../components/Footer';

const AboutPage = () => (
  <div className="flex flex-col min-h-screen">
    <Helmet><title>About Us | RKM Plumbing</title></Helmet>
    <Header />
    <main className="pt-32 lg:pt-40">
      <div className="container mx-auto px-4 text-center py-10">
        <h1 className="text-4xl font-black">ABOUT <span className="text-[#A6892C]">RKM</span></h1>
      </div>
      <About />
    </main>
    <Footer />
  </div>
);
export default AboutPage;