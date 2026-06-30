import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaYoutube, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path) => {
    return isActive(path)
      ? "text-yellow-400 font-medium transition-colors"
      : "text-white font-medium hover:text-yellow-400 transition-colors";
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 transition-all duration-300 ${isScrolled ? 'bg-[#303030] shadow-md py-4' : 'bg-transparent py-6'}`}>
      {/* Logo */}
      <div className="flex flex-col items-start justify-center cursor-pointer">
        <Link to="/" className="text-yellow-400 font-bold text-2xl tracking-widest leading-none flex items-center uppercase">
          DRUSHYA'S
        </Link>
        <span className="text-yellow-400 text-[0.6rem] tracking-[0.3em] font-light mt-1 ml-1 uppercase">PRODUCTION</span>
      </div>

      {/* Center Navigation - Desktop */}
      <nav className="hidden lg:flex items-center space-x-10 text-lg">
        <Link to="/" className={getLinkClass('/')}>Home</Link>
        <Link to="/about" className={getLinkClass('/about')}>About</Link>

        {/* Services Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <Link to="/services" className={`flex items-center space-x-1 focus:outline-none ${isActive('/services') || isServicesOpen ? "text-yellow-400" : "text-white"} hover:text-yellow-400 font-medium transition-colors cursor-pointer py-2`}>
            <span>Services</span>
            <FaChevronDown className={`text-sm transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
          </Link>
          
          {/* Dropdown Menu */}
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[340px] bg-[#303030] rounded-xl shadow-2xl border border-gray-700 overflow-hidden transition-all duration-300 origin-top ${isServicesOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}`}>
             <div className="flex flex-col p-2">
                <Link to="/services/portraits" className="text-white hover:text-yellow-400 hover:bg-black/30 px-4 py-3 rounded-lg transition-colors flex items-start text-sm">
                  <span className="mr-3 text-lg leading-none">📸</span> 
                  <span>Maternity | Newborn | Kids | Family Portraits</span>
                </Link>
                <Link to="/services/weddings" className="text-white hover:text-yellow-400 hover:bg-black/30 px-4 py-3 rounded-lg transition-colors flex items-start text-sm">
                  <span className="mr-3 text-lg leading-none">💍</span> 
                  <span>Weddings | Pre-weddings | Engagements</span>
                </Link>
                <Link to="/services/corporate" className="text-white hover:text-yellow-400 hover:bg-black/30 px-4 py-3 rounded-lg transition-colors flex items-start text-sm">
                  <span className="mr-3 text-lg leading-none">🏢</span> 
                  <span>Corporate | Branding | Promotions</span>
                </Link>
                <Link to="/services/commercial" className="text-white hover:text-yellow-400 hover:bg-black/30 px-4 py-3 rounded-lg transition-colors flex items-start text-sm">
                  <span className="mr-3 text-lg leading-none">🎥</span> 
                  <span>Advertisements | Product Shoots | Music Videos</span>
                </Link>
             </div>
          </div>
        </div>

        <Link to="/packages" className={getLinkClass('/packages')}>Packages</Link>
        <Link to="/workspace" className={getLinkClass('/workspace')}>Our Workspace</Link>
        <Link to="/contact" className={getLinkClass('/contact')}>Contact Us</Link>
      </nav>

      {/* Empty spacer to keep navigation centered on desktop */}
      <div className="hidden lg:flex w-32"></div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-white focus:outline-none hover:text-yellow-400 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 bg-[#1A1A1A] z-[-1] transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-28 pb-8 px-8 overflow-y-auto">
          <nav className="flex flex-col space-y-6 text-2xl font-light">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/')}>Home</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/about')}>About</Link>
            
            {/* Services Mobile Dropdown */}
            <div className="flex flex-col space-y-4">
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className={`flex items-center justify-between w-full focus:outline-none ${isActive('/services') || isServicesOpen ? "text-yellow-400 font-medium" : "text-white"} transition-colors`}>
                <span>Services</span>
                <FaChevronDown className={`text-xl transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`flex flex-col pl-6 space-y-4 border-l-2 border-gray-700 ml-2 overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <Link to="/services/portraits" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 text-lg">Portraits</Link>
                <Link to="/services/weddings" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 text-lg">Weddings</Link>
                <Link to="/services/corporate" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 text-lg">Corporate</Link>
                <Link to="/services/commercial" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 text-lg">Commercial</Link>
              </div>
            </div>

            <Link to="/packages" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/packages')}>Packages</Link>
            <Link to="/workspace" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/workspace')}>Our Workspace</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={getLinkClass('/contact')}>Contact Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
