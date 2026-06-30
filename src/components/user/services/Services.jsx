import React from 'react';
import ServiceCard from '../../../ui/common/ServiceCard';

export const servicesData = [
  {
    id: 'portraits',
    title: 'Portraits',
    subtitle: 'Maternity | Newborn | Kids | Family',
    description: "Capture the purest moments of your family's journey with our specialized portrait sessions. We create a comfortable environment for timeless and heartwarming photographs.",
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop',
    link: '/services/portraits',
    buttonText: 'View More'
  },
  {
    id: 'weddings',
    title: 'Weddings',
    subtitle: 'Weddings | Pre-weddings | Engagements',
    description: 'Your special day deserves to be immortalized beautifully. We blend candid emotions with cinematic flair to give you memories you will cherish for a lifetime.',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    link: '/services/weddings',
    buttonText: 'View More'
  },
  {
    id: 'corporate',
    title: 'Corporate',
    subtitle: 'Corporate | Branding | Promotions',
    description: 'Elevate your brand with our professional corporate photography. From headshots to extensive brand promotions, we deliver high-quality visuals for your business.',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
    link: '/services/corporate',
    buttonText: 'View More'
  },
  {
    id: 'commercial',
    title: 'Commercial',
    subtitle: 'Advertisements | Product Shoots | Music Videos',
    description: 'Stand out in the market with stunning commercial shoots. We provide comprehensive photography and videography for products, ads, and creative projects.',
    thumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    link: '/services/commercial',
    buttonText: 'View More'
  }
];

const Services = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2000&auto=format&fit=crop"
          alt="Services Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-24" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl text-white tracking-wide mb-6 font-medium">
            Our Services
          </h1>
          <div className="w-24 h-0.5 bg-yellow-400"></div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-2">What We Do</h4>
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Premium Photography Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">Choose from our range of specialized services tailored to capture your exact needs with precision and creativity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              thumbnail={service.thumbnail}
              link={service.link}
              buttonText={service.buttonText || "View More"}
              secondaryButtonText={service.secondaryButtonText}
              secondaryLink={service.secondaryLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
