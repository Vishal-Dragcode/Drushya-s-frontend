import React from 'react';
import { Carousel } from 'primereact/carousel';
import Reviews from './Reviews';
import PromoBanner from '../about/PromoBanner';
const HomeBanner = () => {
  const bannerImages = [
    {
      imageSrc: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
      alt: 'Photography Banner 1',
    },
    {
      imageSrc: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop',
      alt: 'Photography Banner 2',
    },
    {
      imageSrc: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=2000&auto=format&fit=crop',
      alt: 'Photography Banner 3',
    }
  ];

  const bannerTemplate = (item) => {
    return (
      <div className="relative w-full h-screen">
        <img
          src={item.imageSrc}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Banner Content Overlay (Optional: You can customize this per image if needed) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pt-20 bg-black/30 pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-widest uppercase text-yellow-400 drop-shadow-2xl">
            Capture The Moment
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl font-light drop-shadow-lg text-gray-100">
            Professional photography services for your most precious memories.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="relative w-full h-screen bg-black">
        <Carousel
          value={bannerImages}
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={4000}
          itemTemplate={bannerTemplate}
          className="hero-carousel"
          showNavigators={false}
        />
      </div>
      <Reviews />
      <PromoBanner />
    </div>
  );
};

export default HomeBanner;
