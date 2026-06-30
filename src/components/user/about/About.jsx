import React from 'react';
import PromoBanner from './PromoBanner';

const About = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-black">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
          alt="About Us Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-24" data-aos="fade-up">
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
          <div className="grid grid-cols-2 gap-4 relative" data-aos="fade-right">
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
          <div className="flex flex-col justify-center" data-aos="fade-left">
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
      
      {/* Our Values Section */}
      <div className="bg-white text-gray-900 py-20 mt-24  relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-2">Our Philosophy</h4>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why We Do What We Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">
              We are driven by a simple set of core values that shape every session, every edit, and every interaction with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:border-yellow-400 transition-all duration-300" data-aos="fade-up">
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Authentic Emotion</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We don't just pose; we direct. We create an environment where your true personality shines through in every frame.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:border-yellow-400 transition-all duration-300 transform md:-translate-y-4" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Uncompromising Quality</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                From our top-tier camera gear to our meticulous post-production editing, we never cut corners on delivering perfection.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl hover:border-yellow-400 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Client First</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Your vision is our blueprint. We listen, adapt, and go the extra mile to ensure your experience is as flawless as your photos.
              </p>
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
