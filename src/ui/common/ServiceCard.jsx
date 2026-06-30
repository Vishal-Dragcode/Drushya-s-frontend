import React from 'react';
import Button from './Button';

const ServiceCard = ({ title, subtitle, description, thumbnail, link, buttonText, secondaryButtonText, secondaryLink }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group border border-gray-100 h-full" data-aos="fade-up">
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
        <h3 className="absolute bottom-4 left-5 text-2xl font-semibold text-white tracking-wide">{title}</h3>
      </div>
      <div className="py-6 px-5 flex flex-col flex-grow">
        {subtitle && (
          <h4 className="text-xs font-semibold text-yellow-600 mb-3 uppercase tracking-widest">{subtitle}</h4>
        )}
        <p className="text-gray-600 font-light text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        <div className="mt-auto pt-4 flex space-x-2">
          <Button to={link || "/contact"} variant={secondaryButtonText ? "primary" : "outline"} className={`text-[13px] px-2 py-2.5 ${secondaryButtonText ? 'flex-1' : 'w-full'}`}>
            {buttonText || "View More"}
          </Button>
          {secondaryButtonText && (
            <Button to={secondaryLink || "/contact"} variant="outline" className="text-[13px] px-2 py-2.5 flex-1">
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
