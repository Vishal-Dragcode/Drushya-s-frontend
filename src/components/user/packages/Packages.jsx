import React, { useState } from 'react';
import ServiceCard from '../../../ui/common/ServiceCard';

const allPackages = [
  // Portraits
  { id: 'maternity', title: 'Maternity', category: 'Portrait Package', imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', description: 'Celebrate the glow of motherhood with elegant, timeless portraiture.' },
  { id: 'newborn', title: 'Newborn', category: 'Portrait Package', imgSrc: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop', description: 'Gentle, safe, and beautiful sessions to capture their earliest days.' },
  { id: 'kids', title: 'Kids', category: 'Portrait Package', imgSrc: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop', description: 'Energetic and candid portraits of your child\'s unique personality.' },
  { id: 'family', title: 'Family', category: 'Portrait Package', imgSrc: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop', description: 'Heartwarming sessions capturing the love and connection of your family.' },
  
  // Weddings
  { id: 'wedding', title: 'Wedding Ceremony', category: 'Wedding Package', imgSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', description: 'Cinematic coverage of your special day, capturing every emotion.' },
  { id: 'prewedding', title: 'Pre-wedding Shoots', category: 'Wedding Package', imgSrc: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', description: 'Romantic and cinematic shoots at breathtaking locations.' },
  { id: 'engagement', title: 'Engagements', category: 'Wedding Package', imgSrc: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop', description: 'Discrete and emotional coverage of your perfect proposal.' },
  { id: 'reception', title: 'Receptions & Parties', category: 'Wedding Package', imgSrc: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop', description: 'Capturing all the fun, laughter, and details of your celebration.' },
  
  // Corporate
  { id: 'events', title: 'Corporate Events', category: 'Corporate Package', imgSrc: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop', description: 'Professional coverage for your galas, conferences, and seminars.' },
  { id: 'branding', title: 'Brand Identity', category: 'Corporate Package', imgSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop', description: 'Compelling visual narratives that communicate your values.' },
  { id: 'promotions', title: 'Promotional Campaigns', category: 'Corporate Package', imgSrc: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop', description: 'High-impact visuals designed for your marketing channels.' },
  { id: 'headshots', title: 'Professional Headshots', category: 'Corporate Package', imgSrc: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop', description: 'High-end corporate headshots for your leadership team.' },
  
  // Commercial
  { id: 'advertisements', title: 'Advertisements', category: 'Commercial Package', imgSrc: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop', description: 'High-impact imagery for billboards and digital ads.' },
  { id: 'product', title: 'Product Shoots', category: 'Commercial Package', imgSrc: 'https://images.unsplash.com/photo-1444653389962-8149286c578a?q=80&w=800&auto=format&fit=crop', description: 'Sleek studio and lifestyle photography to highlight your offerings.' },
  { id: 'musicvideos', title: 'Music Videos', category: 'Commercial Package', imgSrc: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop', description: 'Full-scale cinematography to create visually stunning music videos.' },
  { id: 'fashion', title: 'Fashion Editorials', category: 'Commercial Package', imgSrc: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=800&auto=format&fit=crop', description: 'Avant-garde shoots and lookbooks that define style.' }
];

const filters = [
  { label: 'All Packages', value: 'All' },
  { label: 'Portraits', value: 'Portrait' },
  { label: 'Weddings', value: 'Wedding' },
  { label: 'Corporate', value: 'Corporate' },
  { label: 'Commercial', value: 'Commercial' }
];

const Packages = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPackages = activeFilter === 'All' 
    ? allPackages 
    : allPackages.filter(pkg => pkg.category.includes(activeFilter));
  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-black">
        <img
          src="/images/home_banner1.jpg"
          alt="Packages Background"
          className="absolute inset-0 w-full h-[60vh] md:h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-24">
          <h1 className="text-4xl md:text-5xl text-white tracking-wide mb-6 font-medium">
            Pricing & Packages
          </h1>
          <div className="w-24 h-0.5 bg-yellow-400"></div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
        <div className="text-center mb-12">
          <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-2">Our Offerings</h4>
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Discover Your Perfect Package</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">Browse our complete collection of photography and cinematography packages, designed to meet your every need.</p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            <span className="text-gray-600 font-semibold uppercase tracking-widest text-sm">Filter Packages by Category</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.value 
                  ? 'bg-yellow-400 text-black shadow-lg scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-yellow-400 hover:text-yellow-600 shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {filteredPackages.map((pkg) => (
            <ServiceCard 
              key={pkg.id}
              title={pkg.title}
              subtitle={pkg.category}
              description={pkg.description}
              imgSrc={pkg.imgSrc}
              link={`/packages/${pkg.id}`}
              buttonText="View Pricing"
              secondaryButtonText="Gallery"
              secondaryLink={`/gallery/${pkg.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
