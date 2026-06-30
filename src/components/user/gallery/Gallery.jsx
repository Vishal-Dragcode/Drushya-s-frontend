import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';

const defaultVideos = [
  'https://www.youtube.com/embed/LXb3EKWsInQ',
  'https://www.youtube.com/embed/aqz-KE-bpKQ',
  'https://www.youtube.com/embed/EngW7tCbLHU',
  'https://www.youtube.com/embed/W0LHTWG-UmQ'
];

const galleryData = {
  maternity: {
    title: 'Maternity Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
    ]
  },
  newborn: {
    title: 'Newborn Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602722053020-af31042989d5?q=80&w=800&auto=format&fit=crop',
    ]
  },
  kids: {
    title: 'Kids Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
    ]
  },
  family: {
    title: 'Family Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
    ]
  },
  wedding: {
    title: 'Wedding Ceremony Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
    ]
  },
  prewedding: {
    title: 'Pre-wedding Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1602722053020-af31042989d5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop',
    ]
  },
  engagement: {
    title: 'Engagement Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    ]
  },
  reception: {
    title: 'Reception Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
    ]
  },
  events: {
    title: 'Corporate Events Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602722053020-af31042989d5?q=80&w=800&auto=format&fit=crop',
    ]
  },
  branding: {
    title: 'Brand Identity Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
    ]
  },
  promotions: {
    title: 'Promotions Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
    ]
  },
  headshots: {
    title: 'Headshots Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
    ]
  },
  advertisements: {
    title: 'Advertisements Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1602722053020-af31042989d5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop',
    ]
  },
  product: {
    title: 'Products Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    ]
  },
  musicvideos: {
    title: 'Music Videos Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
    ]
  },
  fashion: {
    title: 'Fashion Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602722053020-af31042989d5?q=80&w=800&auto=format&fit=crop',
    ]
  },
  default: {
    title: 'Photography Gallery',
    bannerImages: [
      { thumbnail: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=2000&auto=format&fit=crop' },
      { thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop' },
    ],
    gridImages: [
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
    ]
  }
};

const Gallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('images');

  // Helper to generate 20 items per category by cycling the base items
  const generate20Items = (baseItems) => {
    return Array.from({ length: 20 }).map((_, i) => baseItems[i % baseItems.length]);
  };

  const data = galleryData[id] || galleryData.default;
  const gridImages20 = generate20Items(data.gridImages);
  const gridVideos20 = generate20Items(data.gridVideos || defaultVideos);

  const bannerTemplate = (item) => {
    return (
      <div className="relative w-full h-[70vh] md:h-[90vh]">
        <img
          src={item.thumbnail}
          alt="Gallery Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pt-16 bg-black/40 pointer-events-none" data-aos="zoom-in" data-aos-duration="1000">
          <h1 className="text-4xl md:text-5xl text-white tracking-wide mb-6 font-medium capitalize">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light">
            Explore our curated collection of moments and memories.
          </p>
          <div className="w-24 h-0.5 bg-yellow-400 mt-8"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Banner Section */}
      <div className="relative w-full h-[70vh] md:h-[90vh] bg-black overflow-hidden group">
        {viewMode === 'images' ? (
          <Carousel
            value={data.bannerImages}
            numVisible={1}
            numScroll={1}
            circular
            autoplayInterval={4000}
            itemTemplate={bannerTemplate}
            className="hero-carousel"
            showNavigators={false}
            showIndicators={data.bannerImages.length > 1}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`${gridVideos20[0]}?autoplay=1&rel=0`}
              title={`${data.title} Video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full object-cover"
            ></iframe>
          </div>
        )}

        {/* Video / Photo Toggle Overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex bg-white/20 backdrop-blur-md p-1.5 rounded-full border border-white/30 shadow-2xl">
          <button 
            onClick={() => setViewMode('images')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 tracking-wide ${viewMode === 'images' ? 'bg-white shadow text-gray-900' : 'text-white hover:text-gray-200 hover:bg-white/10'}`}
          >
            Photos
          </button>
          <button 
            onClick={() => setViewMode('videos')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 tracking-wide ${viewMode === 'videos' ? 'bg-white shadow text-gray-900' : 'text-white hover:text-gray-200 hover:bg-white/10'}`}
          >
            Watch Video
          </button>
        </div>
      </div>

      {/* Photo Grid Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        
        <div className="mb-8 flex justify-start">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
             Back to Portfolios
          </button>
        </div>

        {/* Masonry CSS Grid Layout - Always Photos */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {gridImages20.map((src, index) => (
            <div key={`img-${index}`} className="break-inside-avoid mb-6 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
              <img
                src={src}
                alt={`Gallery photo ${index + 1}`}
                className="w-full block h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
