import React from 'react';
import { Shield, Clock, Award, CreditCard, CheckCircle } from 'lucide-react';

const TrustSection = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-gold-500" />,
      title: "60 Minute Response",
      description: "We aim to be with you in under an hour for all emergency calls."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-gold-500" />,
      title: "12 Month Guarantee",
      description: "We stand by our work. All repairs come with a solid 12-month guarantee."
    },
    {
      icon: <Award className="w-8 h-8 text-gold-500" />,
      title: "No Call Out Fee",
      description: "You only pay for the work we do. No hidden charges for attending."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-gold-500" />,
      title: "Card Payments",
      description: "We accept all major credit and debit cards for your convenience."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            Why Locals Trust <span className="text-gold-500">RKM</span>
          </h2>
          <p className="text-lg text-gray-600">
            We are a local, family-run business committed to honest pricing and rapid response times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;