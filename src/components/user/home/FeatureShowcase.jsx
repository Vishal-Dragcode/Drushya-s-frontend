import React from 'react';
import Button from '../../../ui/common/Button';

const FeatureShowcase = () => {
  return (
    <div className="bg-gray-50 py-24 overflow-hidden ">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-1 lg:order-1" data-aos="fade-right">
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop" alt="Cinematography 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop" alt="Cinematography 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                   <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop" alt="Cinematography 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                   <img src="https://images.unsplash.com/photo-1444653389962-8149286c578a?q=80&w=600&auto=format&fit=crop" alt="Cinematography 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-300 rounded-full blur-[100px] opacity-30 z-0 pointer-events-none"></div>
          </div>

          <div className="flex flex-col justify-center order-2 lg:order-2" data-aos="fade-left">
            <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 flex items-center">
              <span className="w-12 h-0.5 bg-yellow-600 mr-4"></span>
              Cinematic Excellence
            </h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-8 leading-tight">
              Bringing your moments to life
            </h2>
            <div className="space-y-6 text-gray-600 font-light text-lg mb-10 leading-relaxed">
              <p>
                Beyond still photography, our cinematography team crafts visually stunning films that capture the motion, sound, and emotion of your special days.
              </p>
              <p>
                From wedding films and music videos to high-end commercial advertisements, we use state-of-the-art equipment and creative directing to deliver a cinematic experience that tells your story perfectly.
              </p>
            </div>
            
            <div>
              <Button to="/services/commercial" variant="primary" className="px-8 py-4 text-base shadow-lg shadow-yellow-400/30">
                Discover Cinematography
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
