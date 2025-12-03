import React, { useState, useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';

// --- CONFIGURATION ---
const ANIMATION_DURATION = 2000;

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

// --- ICONS ---
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
       <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.84c0-2.435 1.488-3.768 3.655-3.768 1.038 0 1.933.077 2.193.111v2.542h-1.505c-1.181 0-1.41.561-1.41 1.385v1.57h2.82l-.367 3.667h-2.453v7.98H9.101z" />
   </svg>
);

// --- HOOKS ---
function useWallpaper() {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initWallpaper = () => {
      const isMobile = window.innerWidth < 1024;
      const images = isMobile ? PORTRAIT_IMAGES : LANDSCAPE_IMAGES;
      const storageKey = isMobile ? 'ghurni_bg_history_portrait' : 'ghurni_bg_history_landscape';

      let seenIndices: number[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        seenIndices = stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.warn("Failed to parse wallpaper history", e);
      }

      let availableIndices = images.map((_, i) => i).filter(i => !seenIndices.includes(i));
      if (availableIndices.length === 0) {
        availableIndices = images.map((_, i) => i);
        seenIndices = [];
      }

      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setCurrentSrc(images[randomIndex]);
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

// --- COMPONENTS ---
const SocialButton = ({ icon, label, className, onClick }: { icon: React.ReactNode, label: string, className?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`group relative flex items-center justify-center w-full px-6 py-4 rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden ${className}`}
  >
    <div className="absolute left-6 flex items-center justify-center z-10">
      {icon}
    </div>
    <span className="relative z-10 text-white font-medium tracking-wide text-sm sm:text-base">
      {label}
    </span>
    {/* Shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0" />
  </button>
);

const App: React.FC = () => {
  const { currentSrc, isLoading, setIsLoading } = useWallpaper();

  return (
    <main className="relative w-full min-h-screen overflow-hidden text-white font-sans selection:bg-rose-500/30">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="mesh-gradient-bg absolute inset-0 w-full h-full" />
        
        {/* Image Overlay */}
        {currentSrc && (
          <div 
            className={`absolute inset-0 w-full h-full bg-black/40 transition-all duration-[2500ms] ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
              isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          >
             <img 
              src={currentSrc}
              alt="Destination"
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
             {/* Gradient Overlay for Readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          </div>
        )}
      </div>

      {/* --- CONTENT LAYER --- */}
      {/* 
          Responsiveness Logic:
          - Default (Mobile/Tablet): flex-col, justify-end (bottom), items-center
          - lg (Desktop): flex-row, justify-end (right), items-center
      */}
      <div className="relative z-10 flex flex-col w-full min-h-screen p-6 lg:p-24 transition-all duration-500 justify-end items-center lg:flex-row lg:justify-end lg:items-center">
        
        {/* Login Card */}
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center animate-card-entry mb-8 lg:mb-0 lg:mr-10">
          
          {/* Header */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase border rounded-full bg-white/5 border-white/10 text-white/60">
              Welcome Back
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">
            Ghurni AI
          </h1>
          <p className="text-white/60 font-light text-lg mb-8 sm:mb-10 max-w-xs mx-auto leading-relaxed">
            Your intelligent companion for the perfect journey.
          </p>

          {/* Buttons */}
          <div className="w-full space-y-4 animate-fade-in-up animate-delay-100">
            <SocialButton 
              icon={<GoogleIcon />} 
              label="Continue with Google"
              className="bg-white/5 hover:bg-white/10 border-white/10"
              onClick={() => console.log('Google login')}
            />
            
            <SocialButton 
              icon={<FacebookIcon />} 
              label="Continue with Facebook"
              className="bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border-[#1877F2]/20"
              onClick={() => console.log('Facebook login')}
            />
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 w-full border-t border-white/5 animate-fade-in-up animate-delay-200">
             <p className="text-xs text-white/40 mb-4">
               Don't have an account? 
               <button className="ml-1 text-white hover:text-rose-400 transition-colors font-medium">Sign Up</button>
             </p>
             <div className="flex items-center justify-center space-x-4 text-[10px] text-white/30 uppercase tracking-widest">
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <span>•</span>
               <a href="#" className="hover:text-white transition-colors">Terms</a>
             </div>
          </div>

        </div>
        
        {/* Bottom secured badge */}
        {/* Desktop: Bottom Left | Mobile: Bottom Center (relative due to flex-col) */}
        <div className="absolute bottom-6 w-full flex justify-center lg:justify-start lg:left-10 lg:w-auto animate-fade-in-up animate-delay-200 pointer-events-none">
          <div className="flex items-center space-x-2 text-white/30 text-xs backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 bg-black/10">
            <Lock className="w-3 h-3" />
            <span>Secured by Ghurni ID</span>
          </div>
        </div>

      </div>
    </main>
  );
};

export default App;