import React, { useState, useEffect } from 'react';

// Curated high-quality travel images from Unsplash
const LANDSCAPE_IMAGES = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop", // Swiss Alps
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop", // Mountain Morning
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop", // Misty Forest
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop", // Yosemite
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop", // Blue Lake
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop", // Tropical
];

const PORTRAIT_IMAGES = [
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1000&auto=format&fit=crop", // Ancient Temple
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop", // Luxury Resort
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop", // Hiking
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop", // Ocean Beach
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000&auto=format&fit=crop", // Venice Canal
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000&auto=format&fit=crop", // Dubai
];

const App: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 1. Detect Screen Size (Desktop vs Mobile/Tablet)
  useEffect(() => {
    const checkMobile = () => {
      // Treating tablets (<1024px) and phones as mobile for portrait images
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Select Random Image ONLY on load or when orientation changes
  useEffect(() => {
    const images = isMobile ? PORTRAIT_IMAGES : LANDSCAPE_IMAGES;
    const randomIndex = Math.floor(Math.random() * images.length);
    
    setCurrentImageIndex(randomIndex);
    setImageLoaded(false); // Briefly fade out (or start hidden) until loaded
  }, [isMobile]); 

  const currentImages = isMobile ? PORTRAIT_IMAGES : LANDSCAPE_IMAGES;
  // Safety check to prevent out-of-bounds access if arrays differ in length during resize
  const safeIndex = currentImageIndex < currentImages.length ? currentImageIndex : 0;
  const currentSrc = currentImages[safeIndex];

  return (
    <main className="relative w-full min-h-screen overflow-hidden text-white">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* 1. Base Gradient (Fallback) - Always rendered behind */}
        <div className="mesh-gradient-bg absolute inset-0 w-full h-full" />

        {/* 2. Image Overlay */}
        <div className={`absolute inset-0 w-full h-full bg-black/40 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
           <img 
            key={currentSrc} // Key change forces re-render if src changes
            src={currentSrc}
            alt="Travel Destination"
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)} // If error, keep opacity 0 (shows gradient)
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        </div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Placeholder for future UI */}
      </div>

    </main>
  );
};

export default App;