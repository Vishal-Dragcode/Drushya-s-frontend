import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import Reviews from './Reviews';
import PromoBanner from '../about/PromoBanner';
import PhotographyShowcase from './PhotographyShowcase';
import FeatureShowcase from './FeatureShowcase';
import WorkspaceShowcase from './WorkspaceShowcase';
import ServiceCard from '../../../ui/common/ServiceCard';
import { servicesData } from '../services/Services';
import { allPackages } from '../packages/Packages';
import Button from '../../../ui/common/Button';

const HomeBanner = () => {
  const defaultBanners = [
    {
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
      alt: 'Photography Banner 1',
      title: 'Capture The Moment',
      subtitle: 'Professional photography services for your most precious memories.'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop',
      alt: 'Photography Banner 2',
      title: 'Timeless Elegance',
      subtitle: 'Creating visual stories that last a lifetime.'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=2000&auto=format&fit=crop',
      alt: 'Photography Banner 3',
      title: 'Creative Vision',
      subtitle: 'Seeing the world through a different lens.'
    }
  ];

  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('drushya_home_banners');
    if (saved) {
      const parsed = JSON.parse(saved);
      const active = parsed.filter(b => b.status === 'Active');
      if (active.length > 0) {
        setBannerImages(active.map(b => ({
          ...b,
          thumbnail: b.thumbnail || b.imageSrc || ''
        })));
        return;
      }
    }
    setBannerImages(defaultBanners);
  }, []);

  const bannerTemplate = (item) => {
    return (
      <div className="relative w-full h-screen">
        <img
          src={item.thumbnail}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Banner Content Overlay (Optional: You can customize this per image if needed) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pt-20 bg-black/30 pointer-events-none" data-aos="zoom-in" data-aos-duration="1000">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-widest uppercase text-yellow-400 drop-shadow-2xl">
            {item.title || 'Capture The Moment'}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl font-light drop-shadow-lg text-gray-100">
            {item.subtitle || 'Professional photography services for your most precious memories.'}
          </p>
        </div>
      </div>
    );
  };

  const featuredPackages = allPackages.filter(p => ['family', 'wedding', 'events', 'product'].includes(p.id));

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

      <PhotographyShowcase />

      {/* Featured Services Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-16">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-2">Our Expertise</h4>
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Photography Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">We offer a wide range of professional photography services tailored to your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch mb-10" data-aos="fade-up" data-aos-delay="100">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              thumbnail={service.thumbnail}
              link={service.link}
              buttonText={service.buttonText || "View More"}
            />
          ))}
        </div>
        <div className="text-center">
          <Button to="/services" variant="outline" className="px-8 py-3 text-sm font-semibold">
            View All Services
          </Button>
        </div>
      </div>

      <FeatureShowcase />

      {/* Featured Packages Section */}
      <div className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-2">Popular Options</h4>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Featured Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">Choose from our most loved packages designed to deliver exceptional value.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch mb-10" data-aos="fade-up" data-aos-delay="100">
            {featuredPackages.map((pkg) => (
              <ServiceCard
                key={pkg.id}
                title={pkg.title}
                subtitle={pkg.category}
                description={pkg.description}
                thumbnail={pkg.thumbnail}
                link={`/packages/${pkg.id}`}
                buttonText="View Pricing"
                secondaryButtonText="Gallery"
                secondaryLink={`/gallery/${pkg.id}`}
              />
            ))}
          </div>
          <div className="text-center">
            <Button to="/packages" variant="primary" className="px-8 py-3 text-sm font-semibold">
              Explore All Packages
            </Button>
          </div>
        </div>
      </div>

      <WorkspaceShowcase />
      <Reviews />
      <PromoBanner />
    </div>
  );
};

export default HomeBanner;
