import React, { useState, useEffect } from 'react';

interface SlideshowProps {
  images: string[];
  displayService: string;
  displayLocation: string;
}

export default function Slideshow({ images, displayService }: SlideshowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index if the URL/images change so we don't get out-of-bounds errors
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  // Slideshow Timer
  useEffect(() => {
    if (images.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Changes image every 4 seconds
    
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group">
      
      {/* Slideshow Images */}
      {images.map((img, index) => (
        <img 
          key={img}
          src={img} 
          alt={`RKM ${displayService} Portfolio ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Slideshow Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImageIndex ? "bg-[#A6892C] scale-150" : "bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}