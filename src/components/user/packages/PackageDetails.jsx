import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../../../ui/common/Button';

const categoryData = {
  portrait: {
    tier: "Standard Tier",
    badge: "Portrait Session",
    benefits: ["High-Resolution Images", "Professional Retouching", "Creative Direction", "Fast Turnaround Time", "Multiple Locations", "Wardrobe Guidance", "Online Digital Gallery", "Print Release Rights"],
    requirements: ["Booking at least 2 weeks in advance", "Initial consultation call (Phone or Zoom)", "Deposit payment to secure your date", "A positive attitude and willingness to relax", "Any specific prop requests discussed beforehand"],
    curriculum: [
      { title: "Phase 1: Pre-shoot Consultation", content: ["Understanding your vision and specific requirements", "Selecting the perfect location and lighting style", "Wardrobe styling and aesthetic advice", "Setting the timeline and deliverables"] },
      { title: "Phase 2: The Photoshoot Session", content: ["Guided posing and capturing natural candids", "Multiple outfit changes and backdrop adjustments", "Creative lighting setups for dynamic shots", "Ensuring a relaxed, fun environment"] },
      { title: "Phase 3: Post-processing & Editing", content: ["Culling and selecting the best images", "Advanced color grading and correction", "Blemish removal and natural skin retouching", "Final artistic touches and cropping"] },
      { title: "Phase 4: Delivery & Review", content: ["Secure online gallery delivery", "Selecting photos for print or albums", "Reviewing wall art designs and layouts", "Final handover of all digital assets"] }
    ],
    price: "19,999.00",
    originalPrice: "29,999.00",
    includes: ["40 High-Res Edited Photos", "2 Hours of Coverage", "1 Outfit Change", "Password-protected Gallery", "Print Release Certificate", "Lifetime Gallery Access"]
  },
  wedding: {
    tier: "Premium Tier",
    badge: "Wedding Collection",
    benefits: ["Two Lead Photographers", "Cinematic Videography", "Drone Coverage (Subject to permits)", "Premium Photo Album", "High-End Retouching", "Same-Day Teaser Video", "Online Digital Gallery", "Full Print Rights"],
    requirements: ["Booking 3-6 months in advance", "Detailed timeline discussion", "50% Deposit to secure the date", "List of must-have family portraits", "Meal provision for the media team"],
    curriculum: [
      { title: "Phase 1: Pre-Wedding Planning", content: ["Venue walkthrough and lighting assessment", "Timeline scheduling and shot list creation", "Understanding family dynamics and VIP guests", "Finalizing stylistic preferences"] },
      { title: "Phase 2: The Big Day", content: ["Getting ready coverage for both partners", "Ceremony multi-angle capture and audio", "Creative couples portraits and family formals", "Reception, speeches, and dancing coverage"] },
      { title: "Phase 3: Cinematic Editing", content: ["Advanced color grading for film aesthetics", "Audio mixing and emotional storytelling for video", "Extensive culling and curation of thousands of photos", "Skin retouching for close-ups"] },
      { title: "Phase 4: Grand Delivery", content: ["Custom USB presentation box delivery", "Premium leather-bound layflat album design", "Full online gallery for family sharing", "Highlight film and full documentary video"] }
    ],
    price: "1,49,999.00",
    originalPrice: "1,99,999.00",
    includes: ["600+ High-Res Edited Photos", "Cinematic Highlight Film (5-7 mins)", "Full Ceremony Documentary Video", "Pre-wedding Shoot Included", "Premium Layflat Album (40 pages)", "Lifetime Gallery Access"]
  },
  corporate: {
    tier: "Business Tier",
    badge: "Corporate Solution",
    benefits: ["Fast 48-Hour Turnaround", "Commercial Usage Rights", "Multi-Camera Setup", "Professional Lighting Kit", "On-site Image Selection", "Teleprompter Available", "Corporate Branding Alignment", "High-Resolution Delivery"],
    requirements: ["Clear creative brief provided beforehand", "Location access, badges & filming permits", "Advance booking required with PO", "Brand guidelines document shared", "Point of contact available on-site"],
    curriculum: [
      { title: "Phase 1: Brand Alignment", content: ["Understanding corporate goals and messaging", "Reviewing brand guidelines and aesthetic", "Location scouting at your offices or venue", "Logistics and schedule planning"] },
      { title: "Phase 2: Execution", content: ["Efficient setup & breakdown of equipment", "Minimal disruption to daily workflow", "Professional direction for executives", "Capturing B-roll and candid interactions"] },
      { title: "Phase 3: Commercial Editing", content: ["Crisp, clean color grading to match brand", "Logo integrations and lower-thirds if required", "Formatting for various social media dimensions", "Audio mastering for interviews"] },
      { title: "Phase 4: Rapid Delivery", content: ["Same-day sneak peeks for press releases", "Full gallery and videos within 48-72 hours", "Direct high-speed cloud transfer", "Invoicing and wrap-up"] }
    ],
    price: "49,999.00",
    originalPrice: "69,999.00",
    includes: ["Unlimited Photos Taken", "Half-Day Coverage (4 Hours)", "Commercial Release License", "Next-Day Delivery Option", "Professional Mobile Lighting", "Cloud Storage Direct Transfer"]
  },
  commercial: {
    tier: "Enterprise Tier",
    badge: "Commercial Production",
    benefits: ["High-End Commercial Retouching", "Creative Art Direction", "Styling & Props Sourcing", "Studio or Location Choice", "Full Buyout Rights Available", "Format Optimization (Print/Web)", "Moodboard Creation", "Tethered Live Shooting"],
    requirements: ["Detailed shot list and creative deck", "Moodboard and concept approval", "Product delivery to studio ahead of time", "50% Advance payment to commence pre-production", "Clear understanding of usage requirements"],
    curriculum: [
      { title: "Phase 1: Concept & Pre-Production", content: ["Moodboard creation and storyboarding", "Prop sourcing, set design, and talent casting", "Studio booking and lighting design planning", "Pre-production meeting (PPM) with client"] },
      { title: "Phase 2: Production Day", content: ["Tethered shooting for live client review", "Meticulous lighting and micro-adjustments", "Collaborative art direction on set", "Ensuring all variations and angles are captured"] },
      { title: "Phase 3: High-End Retouching", content: ["Flawless composite editing and focus stacking", "Precise color matching to physical products", "Dust, scratch, and anomaly removal", "Adding shadows or reflections digitally"] },
      { title: "Phase 4: Final Handover", content: ["Web & Print ready optimized files", "Layered PSDs provided (optional)", "Full commercial licensing and buyout agreement", "Archiving project files for future adaptations"] }
    ],
    price: "89,999.00",
    originalPrice: "1,19,999.00",
    includes: ["High-End Retouched Hero Images", "Full Day Studio/Location Shoot", "Creative Art & Styling Direction", "Full Commercial Usage Rights", "Optimized for E-Commerce & Print", "Tethered Live Preview on Set"]
  }
};

const packageData = {
  maternity: { category: 'portrait', title: 'Maternity Package', description: 'Celebrate the glow of motherhood with elegant, timeless portraiture and capture these fleeting moments.', imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop' },
  newborn: { category: 'portrait', title: 'Newborn Package', description: 'Gentle, safe, and beautiful sessions to capture their earliest days with artistic setups.', imgSrc: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2000&auto=format&fit=crop' },
  kids: { category: 'portrait', title: 'Kids Package', description: 'Energetic and candid portraits of your child\'s unique personality in a fun environment.', imgSrc: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2000&auto=format&fit=crop' },
  family: { category: 'portrait', title: 'Family Package', description: 'Heartwarming sessions capturing the love and connection of your family together.', imgSrc: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format&fit=crop' },
  wedding: { category: 'wedding', title: 'Wedding Ceremony', description: 'Cinematic and comprehensive coverage of your special day, capturing every emotion.', imgSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop' },
  prewedding: { category: 'wedding', title: 'Pre-wedding Shoots', description: 'Romantic and cinematic shoots at breathtaking locations to celebrate your engagement.', imgSrc: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop' },
  engagement: { category: 'wedding', title: 'Engagements', description: 'Discrete and emotional coverage of your perfect proposal, ensuring natural reactions.', imgSrc: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop' },
  reception: { category: 'wedding', title: 'Receptions & Parties', description: 'Capturing all the fun, laughter, and beautiful details of your grand celebration.', imgSrc: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2000&auto=format&fit=crop' },
  events: { category: 'corporate', title: 'Corporate Events', description: 'Professional coverage for your galas, conferences, and seminars with quick delivery.', imgSrc: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2000&auto=format&fit=crop' },
  branding: { category: 'corporate', title: 'Brand Identity', description: 'Compelling visual narratives that communicate your values to your ideal clients.', imgSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop' },
  promotions: { category: 'corporate', title: 'Promotions', description: 'High-impact visuals designed specifically for your marketing channels and social media.', imgSrc: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop' },
  headshots: { category: 'corporate', title: 'Professional Headshots', description: 'High-end corporate headshots for your leadership team, taken at your office or our studio.', imgSrc: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop' },
  advertisements: { category: 'commercial', title: 'Advertisements', description: 'High-impact imagery carefully crafted for billboards, print, and digital ad campaigns.', imgSrc: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop' },
  product: { category: 'commercial', title: 'Product Shoots', description: 'Sleek studio and lifestyle photography to beautifully highlight your unique offerings.', imgSrc: 'https://images.unsplash.com/photo-1444653389962-8149286c578a?q=80&w=2000&auto=format&fit=crop' },
  musicvideos: { category: 'commercial', title: 'Music Videos', description: 'Full-scale cinematography to create visually stunning and engaging music videos.', imgSrc: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop' },
  fashion: { category: 'commercial', title: 'Fashion Editorials', description: 'Avant-garde shoots and lookbooks that define style and highlight your latest collection.', imgSrc: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?q=80&w=2000&auto=format&fit=crop' },
  default: { category: 'portrait', title: 'Premium Photography Package', description: 'Master your visual presence with our updated package. Enjoy core concepts, advanced techniques, and stunning responsive delivery.', imgSrc: '/images/home_banner1.jpg' }
};

const AccordionItem = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-3">
      <div 
        className="bg-gray-50 p-4 rounded-lg flex justify-between items-center cursor-pointer border border-gray-100 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-800 text-sm">{title}</span>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="18 15 12 9 6 15"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="6 9 12 15 18 9"/></svg>
        )}
      </div>
      {isOpen && (
        <div className="px-4 py-4 text-sm text-gray-600 border border-gray-100 rounded-b-lg border-t-0 -mt-2 bg-white pt-6">
          <ul className="space-y-2">
             {content.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-gray-400 mr-2 mt-1 text-[10px]">●</span>
                  {item}
                </li>
             ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = packageData[id] || packageData.default;
  const catData = categoryData[data.category] || categoryData.portrait;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans pb-20">
      
      {/* Hero Banner (Proper top side img) */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-black mb-12">
        <img
          src={data.imgSrc || "/images/home_banner1.jpg"}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/home_banner1.jpg';
          }}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pt-16 pointer-events-none">
          <h1 className="text-4xl md:text-5xl text-white tracking-wide mb-6 font-medium capitalize">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light">
            {data.description}
          </p>
          <div className="w-24 h-0.5 bg-yellow-400 mt-8"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:gap-16 lg:items-start">
        
        {/* Left Column - Main Content */}
        <div className="lg:w-[65%]">
          
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
             Go Back
          </button>

          {/* Tags */}
          <div className="flex items-center gap-4 mb-8 text-sm pt-2">
            <span className="flex items-center text-gray-700 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
              {catData.tier}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold text-xs tracking-wide">
              {catData.badge}
            </span>
          </div>

          {/* Benefits Box */}
          <div className="border border-gray-100 rounded-2xl p-6 md:p-8 mb-8 shadow-sm hover:shadow-md transition-shadow">
             <h3 className="text-lg font-bold mb-6 flex items-center justify-between text-gray-900">
               Our Package Benefits
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
               {catData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 mr-3 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    {benefit}
                  </div>
               ))}
             </div>
          </div>

          {/* Requirements Box - Highlighted */}
          <div className="border-2 border-blue-400 bg-blue-50/30 rounded-2xl p-6 md:p-8 mb-8 shadow-sm relative">
             <h3 className="text-lg font-bold mb-6 flex items-center justify-between text-gray-900">
               Requirements
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
             </h3>
             <ul className="space-y-3">
               {catData.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start text-xs text-gray-700 font-medium">
                    <span className="text-blue-400 mr-2 mt-[2px] text-[10px]">●</span>
                    {req}
                  </li>
               ))}
             </ul>
          </div>

          {/* Curriculum / Itinerary Accordion */}
          <div className="border border-gray-100 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
             <h3 className="text-lg font-bold mb-6 flex items-center justify-between text-gray-900">
               The Itinerary
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
             </h3>
             <div className="space-y-1">
               {catData.curriculum.map((module, idx) => (
                 <AccordionItem 
                   key={idx} 
                   title={module.title} 
                   content={module.content} 
                   defaultOpen={idx === 0} 
                 />
               ))}
             </div>
          </div>

        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="lg:w-[35%] sticky top-24 mt-12 lg:mt-0">
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
            {/* Decorative Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500"></div>
            
            <h3 className="text-2xl font-bold text-center mb-1 text-gray-900 mt-1">
              Ready to Book?
            </h3>
            <p className="text-center text-sm text-gray-500 mb-5 font-medium">Secure your preferred date and time.</p>
            
            <div className="text-center mb-5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-400 line-through text-sm font-semibold mb-1">INR {catData.originalPrice}</p>
              <p className="text-3xl font-bold text-gray-900 tracking-tight">INR {catData.price}</p>
              <p className="text-xs text-green-600 font-bold mt-1 uppercase tracking-wider">Limited Time Offer</p>
            </div>
            
            <Button 
              to="/contact" 
              variant="primary" 
              fullWidth 
              className="py-3 text-base font-bold uppercase tracking-widest shadow-xl shadow-yellow-400/20 mb-3"
            >
              Book Now
            </Button>
            
            <p className="text-center text-xs text-gray-500 mb-5 font-medium flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              100% Satisfaction Guarantee
            </p>
            
            <div className="pt-5 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">What's Included</h4>
              <ul className="space-y-3 text-sm text-gray-600 font-medium">
                {catData.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 group-hover:bg-yellow-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="leading-tight pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PackageDetails;
