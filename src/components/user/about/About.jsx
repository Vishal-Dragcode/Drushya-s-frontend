import React from 'react';
import PromoBanner from './PromoBanner';

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-24">
          <h1 className="text-4xl md:text-5xl text-white tracking-wide mb-6 font-medium">
            About Us
          </h1>
          <div className="w-24 h-0.5 bg-yellow-400"></div>
        </div>
      </div>

      {/* About Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Images Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <img 
              src="https://images.unsplash.com/photo-1554048612-b6a3dbeafeb8?q=80&w=800&auto=format&fit=crop" 
              alt="Photography Team" 
              className="rounded-2xl w-full h-64 object-cover shadow-lg transform translate-y-8"
            />
            <img 
              src="https://images.unsplash.com/photo-1621214013324-7f12e84c98df?q=80&w=800&auto=format&fit=crop" 
              alt="Behind the scenes" 
              className="rounded-2xl w-full h-64 object-cover shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 rounded-full w-24 h-24 flex items-center justify-center shadow-xl z-10">
              <div className="text-center">
                <span className="block font-bold text-2xl text-black leading-none">10+</span>
                <span className="text-xs text-black font-medium uppercase tracking-wider">Years</span>
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="flex flex-col justify-center">
            <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-2">Our Story</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Capturing life's most precious moments with passion and creativity.
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
              At Drushya's Production, we believe that every picture tells a story. Founded with a deep passion for visual storytelling, our studios in Pune and Ahilyanagar have been the starting point for thousands of beautifully captured memories.
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed font-light">
              We specialize in blending candid moments with timeless portraits. Whether it's a grand wedding, a corporate event, or a personal portrait session, our team of dedicated professionals ensures that your memories are preserved in their most authentic and beautiful form.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-1">500+</h3>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Weddings</p>
              </div>
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-1">2</h3>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Premium Studios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Promotional Banner */}
      <PromoBanner />
    </div>
  );
};

export default About;
