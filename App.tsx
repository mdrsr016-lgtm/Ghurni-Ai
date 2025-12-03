import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURATION ---
const ANIMATION_DURATION = 1500; // Slow, premium fade-in (ms)

// Desktop: 16:9 Aspect Ratio (4K Ultra HD)
const LANDSCAPE_IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=100&w=3840&h=2160&fit=crop", // Yosemite
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=100&w=3840&h=2160&fit=crop", // Green Mountains
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=100&w=3840&h=2160&fit=crop", // Blue Lake
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=100&w=3840&h=2160&fit=crop", // Alpine
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=100&w=3840&h=2160&fit=crop", // Tropical
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=100&w=3840&h=2160&fit=crop", // Waterfall
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=100&w=3840&h=2160&fit=crop", // Jungle
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=100&w=3840&h=2160&fit=crop", // Hiker
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=100&w=3840&h=2160&fit=crop", // Sunset
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=100&w=3840&h=2160&fit=crop", // Swiss Alps
];

// Mobile: 9:16 Aspect Ratio (QHD)
const PORTRAIT_IMAGES = [
  "https://images.unsplash.com/photo-1539650116455-251c938b241e?q=100&w=1440&h=2560&fit=crop", // Peru
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=100&w=1440&h=2560&fit=crop", // Bali
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=100&w=1440&h=2560&fit=crop", // Resort
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=100&w=1440&h=2560&fit=crop", // Ocean
  "https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?q=100&w=1440&h=2560&fit=crop", // Forest
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=100&w=1440&h=2560&fit=crop", // Santorini
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=100&w=1440&h=2560&fit=crop", // Cinque Terre
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=100&w=1440&h=2560&fit=crop", // Misty
  "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?q=100&w=1440&h=2560&fit=crop", // Maldives
  "https://images.unsplash.com/photo-1519046904884-53103b34b271?q=100&w=1440&h=2560&fit=crop", // Sand Texture
];

/**
 * Custom hook to manage wallpaper state logic.
 * Handles device detection, local storage history, and random selection.
 */
function useWallpaper() {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a ref to track if we've already initialized to strictly prevent double-runs
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initWallpaper = () => {
      // 1. Determine Device Type (Mobile < 1024px)
      const isMobile = window.innerWidth < 1024;
      const images = isMobile ? PORTRAIT_IMAGES : LANDSCAPE_IMAGES;
      const storageKey = isMobile ? 'ghurni_bg_history_portrait' : 'ghurni_bg_history_landscape';

      // 2. Fetch History
      let seenIndices: number[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        seenIndices = stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.warn("Failed to parse wallpaper history", e);
      }

      // 3. Calculate Available Images
      let availableIndices = images.map((_, i) => i).filter(i => !seenIndices.includes(i));

      // Reset history if all images have been seen
      if (availableIndices.length === 0) {
        availableIndices = images.map((_, i) => i);
        seenIndices = [];
      }

      // 4. Select Random Image
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      const selectedSrc = images[randomIndex];

      // 5. Update State & Storage
      // Start loading the new image immediately
      setCurrentSrc(selectedSrc);
      setIsLoading(true);

      try {
        localStorage.setItem(storageKey, JSON.stringify([...seenIndices, randomIndex]));
      } catch (e) {
        console.warn("Failed to save wallpaper history", e);
      }
    };

    initWallpaper();
  }, []);

  return { currentSrc, isLoading, setIsLoading };
}

const App: React.FC = () => {
  const { currentSrc, isLoading, setIsLoading } = useWallpaper();

  return (
    <main className="relative w-full min-h-screen overflow-hidden text-white font-sans selection:bg-rose-500/30">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Base Gradient (Fallback & Loading State) */}
        <div className="mesh-gradient-bg absolute inset-0 w-full h-full" />

        {/* 2. High-Res Image Overlay */}
        {currentSrc && (
          <div 
            className={`absolute inset-0 w-full h-full bg-black/20 transition-opacity ease-in-out`}
            style={{ 
              opacity: isLoading ? 0 : 1, 
              transitionDuration: `${ANIMATION_DURATION}ms` 
            }}
          >
             <img 
              src={currentSrc}
              alt="Destination"
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)} // Fail gracefully to gradient
            />
            {/* Professional Vignette & Darkening for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 backdrop-blur-[0px]" />
          </div>
        )}
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Placeholder for future UI - Currently waiting for instructions */}
      </div>

    </main>
  );
};

export default App;
