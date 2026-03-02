// React import not required with the new jsx transform when not referencing React directly
import Header from '../components/Header';
import Services from '../components/Services';
import Footer from '../components/Footer';

const ServicesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 lg:pt-40">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-black mb-10">OUR <span className="text-[#A6892C]">SERVICES</span></h1>
          <Services />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;