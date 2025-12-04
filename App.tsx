import React, { useState, useEffect, useRef } from 'react';
import { Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

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

const LogoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3200 3200" className={className} fill="currentColor">
    <path d="M1671.79 1880.79c-9.69-13.24-21.85-26.4-30.37-40.01-57.74-92.22-15.88-219.75 70.48-278.48 29.58-20.11 59.68-36.49 90.93-53.75 46.18-25.17 92.15-50.73 137.91-76.66a7593 7593 0 0 0 171.35-101.81c32.08-19.34 64.12-39.22 96.86-57.35 9.35-5.18 34.11-18.72 44.7-16.56 21.16 4.3 22.63 28.25 22.64 45.41.05 95.29-2.48 190.61-3.36 285.9-.29 87.78 3.09 175.85 2.53 263.68-.19 30.37-.17 61.75-8.19 91.19-19.41 71.56-87.6 103.07-147.03 136.33l-119.15 67.26-191.32 111.6c-51.01 29.98-151.32 96.84-210.51 98.06-52.65 1.09-136.56-55.04-182.51-80.67-54.61-31.33-105.7-64.39-159.18-95.03l-157.24-88.14c-178.802-100.13-179.712-105.57-177.866-308.37l1.013-168.53-.502-192.46c-.339-48.99-2.983-102.3 3.511-150.61 5.308-39.48 30.84-76.98 62.854-99.75 49.5-34.67 105.26-63.31 157.98-93 85.53-48.28 170.73-97.147 255.61-146.585l383.65-225.924c98.82-59.188 196.24-120.792 298.42-174.009 55.86-29.096 121.96-57.877 186.07-57.635 103.8 1.484 202.49 63.68 291.22 112.462 103.18 56.724 212.59 113.427 301.59 190.443 64.78 56.057 87.78 151.111 91.07 233.228 2.99 74.52 1.34 150.54.15 225.16-2.4 116.41-3.72 232.84-3.94 349.27-.34 103.32.57 206.63 2.71 309.93 2.1 86.04 6.18 174.89 3.53 260.79-1.28 41.67-8.5 105.6-20.05 144.92-15.12 51.5-52.71 103.4-94.82 136.67-76.89 60.77-167 108-252.28 155.87-88.85 49.86-179.85 98.62-268.02 149.15a10492 10492 0 0 0-263.59 155.14c-91.38 55.48-182.9 112.64-277.51 162.08-86.63 45.27-169.98 72.83-266.45 41.16-107.98-35.46-197.43-97.58-294.95-154.38-108.06-65.17-212.86-128.23-322.356-191.17-80.468-46-161.335-91.29-242.59-135.89-92.485-50.2-187.436-101.41-273.901-161.57-42.428-29.52-77.498-65.66-101.453-111.79-25.52-49.14-34.236-118.83-37.291-174.47-3.897-70.96-1.844-150.5.229-221.79a8532 8532 0 0 0 4.702-236.08c.527-99.24.215-198.49-.936-297.74-1.875-67.13-3.322-134.29-4.344-201.44-1.735-87.77-5.812-238.259 20.262-319.338a287.24 287.24 0 0 1 93.501-136.396c33.659-27.536 76.796-54.431 114.04-76.996a4263 4263 0 0 1 173.208-98.498 21142 21142 0 0 0 268.061-149.6 22860 22860 0 0 0 293.188-174.208c72.31-43.588 140.58-84.526 215.13-124.099 170.61-90.567 268.09-53.505 424.51 35.467a7171 7171 0 0 1 158.03 93.035c23.91 14.368 50.71 31.504 74.75 44.999-.17.853-.97 2.771-1.31 3.67-6.34-.242-19.76-6.374-26.8-9.234-22.79-9.253-85.93-12.745-106.19 2.013-66.53 20.352-135.81 62.647-195.49 98.441l-139.94 84.037-444.33 263.213c-134.39 78.454-273.163 146.968-404.6 231.268-131.318 84.226-116.31 207.156-114.734 343.596l2.147 218.09c.313 81.74-.124 163.48-1.31 245.21-.993 80.78-9.159 229.5 14.116 303.35 12.849 40.76 37.668 72.83 70.447 99.79 50.428 41.48 111.394 72.68 168.17 104.61l240.734 134.53c64.33 36.55 127.47 76.73 191.64 113.77 44.53 25.71 87.4 54.53 133.77 77.27 69.64 34.55 125.27 57.44 202.12 31.19 65.02-22.21 116.91-56.82 175.39-90.72 72.54-42.05 144.16-87.67 216.49-129.26l229.93-129.36c55.35-30.9 113.52-62.35 165.27-98.75 32.69-23 57.56-45.19 75.47-81.33 16.13-32.56 21.69-57.37 24.54-93.64 5.25-66.65 3.2-132.92 2.25-199.64l-2.42-246.17c.27-78.39.96-156.78 2.07-235.16 1.18-78.78 7.77-173.24-15.08-249-17.53-58.16-71.69-107.94-125.1-133.078-64.56-30.2-116.77-42.71-184.79-17.356-66.43 24.761-126.07 61.194-186.34 97.634-61.11 37.31-122.56 74.07-184.34 110.27a18928 18928 0 0 1-222.04 125.61c-66.77 36.95-132.86 72.45-195.32 116.93-76.37 52.52-119.43 165.42-86.89 253.78 31.82 86.41 137.67 133.07 214.05 172.94 28.5 14.87 60.39 33.46 89.19 46.75 4.8 2.22 9.65 4.33 14.55 6.32" />
  </svg>
)

// --- HOOKS ---
function useWallpaper() {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initWallpaper = () => {
      // Improved logic: Use actual orientation for better Tablet support
      // Fallback to width check for desktops that might be resized
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isMobileWidth = window.innerWidth < 768;
      
      const shouldUsePortrait = isPortrait || isMobileWidth;
      
      const images = shouldUsePortrait ? PORTRAIT_IMAGES : LANDSCAPE_IMAGES;
      const storageKey = shouldUsePortrait ? 'ghurni_bg_history_portrait' : 'ghurni_bg_history_landscape';

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
    
    // Optional: Re-evaluate on significant resize (orientation change)
    // We stick to one wallpaper per session to avoid jarring swaps, but orientation change listeners could go here.
  }, []);

  return { currentSrc, isLoading, setIsLoading };
}

// --- COMPONENTS ---
const SocialButton = ({ icon, label, className, onClick }: { icon: React.ReactNode, label: string, className?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`group relative flex items-center justify-center w-full px-6 py-3 rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden ${className}`}
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden text-white font-sans selection:bg-rose-500/30">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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
          Breakpoints Architecture:
          1. Default / Mobile (< 768px): 
             - Block layout.
             - `overflow-y-auto` enabled for scroll-to-reveal.
          
          2. Tablet (md: 768px - xl: 1280px): 
             - Flex layout.
             - `justify-center items-center` (Centered Card).
             - `min-h-full` to ensure vertical centering.
          
          3. Desktop (xl: 1280px+): 
             - Flex layout.
             - `justify-end items-center` (Split Screen).
      */}
      <div className="relative z-10 w-full h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-y-auto md:overflow-hidden md:flex md:items-center md:justify-center xl:justify-end xl:p-16 transition-all duration-500 scroll-smooth">
          
          {/* 
             Mobile Spacer 
             - Pushes card down to ~50% of viewport initially.
             - Hidden on md+ (Tablet/Desktop).
             - Hidden on landscape mobile (height < 500px) to maximize space.
          */}
          <div className="w-full h-[50dvh] landscape:h-4 shrink-0 md:hidden pointer-events-none transition-all duration-300" aria-hidden="true" />

          {/* 
             Login Card Container 
             - Mobile: Full width, bottom-sheet style (rounded top only).
             - Tablet (md): Fixed max-width, fully rounded, centered.
             - Desktop (xl): Fixed max-width, right-aligned.
          */}
          <div className="
            w-full min-h-[50dvh] 
            md:w-full md:max-w-[28rem] md:min-h-0 md:h-auto 
            xl:max-w-[28rem] 2xl:max-w-[32rem]
            
            glass-panel 
            
            rounded-t-[2.5rem] rounded-b-none 
            md:rounded-3xl 
            
            p-6 sm:p-8 md:p-10 xl:p-10 
            
            flex flex-col items-center 
            animate-card-entry relative shrink-0 
            shadow-2xl 
            border-x-0 border-b-0 md:border 
            backdrop-blur-3xl 
            mb-0 
            
            /* Ensure it sits at bottom on mobile flow */
            md:mx-auto xl:mr-0
          ">
            
            {/* Card Header Row */}
            <div className="w-full flex justify-between items-center mb-6 sm:mb-8 z-20 shrink-0">
               {/* Brand */}
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-sm">
                     <LogoIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold tracking-wider text-white flex items-center gap-1">
                    Ghurni <span className="font-light opacity-90">Ai</span>
                  </span>
               </div>
               {/* Sign Up Button */}
               <button className="px-4 py-2 text-xs font-bold tracking-wide uppercase bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-white hover:text-white/90">
                   Sign Up
               </button>
            </div>
            
            {/* Main Content Container */}
            <div className="w-full flex flex-col items-center text-center shrink-0">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 flex items-center justify-center gap-3 text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">Welcome Back</span>
                <span className="hidden sm:inline">👋</span>
              </h1>
              <p className="text-white/60 font-light text-sm sm:text-base mb-6 sm:mb-8 max-w-xs mx-auto leading-relaxed">
                Plan your next adventure with intelligent insights.
              </p>

              {/* --- SIGN IN FORM --- */}
              <div className="w-full mb-6 space-y-4 animate-fade-in-up animate-delay-100">
                 {/* Email/Username Input */}
                 <div className="relative group w-full">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors duration-300">
                       <User className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all duration-300 text-base"
                      placeholder="Email or Username"
                    />
                 </div>
                 
                 {/* Password Input */}
                 <div className="relative group w-full">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors duration-300">
                       <Lock className="w-5 h-5" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all duration-300 text-base"
                      placeholder="Password"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-300 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                 </div>

                 {/* Forgot Password */}
                 <div className="flex justify-end w-full">
                   <button className="text-sm font-medium text-purple-300/80 hover:text-purple-300 transition-colors">
                     Forgot password?
                   </button>
                 </div>

                 {/* Premium Glass-Morphic Primary Button */}
                 <button className="group relative w-full py-3.5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40">
                   {/* Background Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                   
                   {/* Glass Sheen (Top Highlight) */}
                   <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-50 pointer-events-none" />
                   
                   {/* Content */}
                   <div className="relative flex items-center justify-center gap-2 text-white font-bold text-lg tracking-wide z-10">
                     <span className="opacity-80 group-hover:opacity-100 transition-opacity"><ArrowRight className="w-5 h-5" /></span>
                     <span className="drop-shadow-sm">Sign In</span>
                   </div>

                   {/* Animated Shine Sweep */}
                   <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                 </button>
              </div>

              {/* Divider */}
              <div className="w-full flex items-center gap-4 mb-6 animate-fade-in-up animate-delay-100 opacity-60">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Or continue with</span>
                  <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* Social Buttons */}
              <div className="w-full space-y-3 animate-fade-in-up animate-delay-200 mb-2">
                <SocialButton 
                  icon={<GoogleIcon />} 
                  label="Continue with Google"
                  className="bg-white/5 hover:bg-white/10 border-white/10 py-3.5"
                  onClick={() => console.log('Google login')}
                />
                
                <SocialButton 
                  icon={<FacebookIcon />} 
                  label="Continue with Facebook"
                  className="bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border-[#1877F2]/20 py-3.5"
                  onClick={() => console.log('Facebook login')}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 w-full border-t border-white/5 animate-fade-in-up animate-delay-200 shrink-0 flex flex-col items-center gap-4">
               {/* Privacy Links */}
               <div className="flex items-center justify-center space-x-4 text-[10px] text-white/30 uppercase tracking-widest">
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
                 <span>•</span>
                 <a href="#" className="hover:text-white transition-colors">Terms</a>
                 <span>•</span>
                 <a href="#" className="hover:text-white transition-colors">Help</a>
               </div>
               
               {/* Mobile/Tablet Badge - Visible inside card */}
               <div className="flex xl:hidden items-center space-x-2 text-white/30 text-[10px] backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 bg-black/10">
                  <Lock className="w-3 h-3" />
                  <span>Secured by Ghurni ID</span>
               </div>
            </div>

          </div>
          
          {/* Bottom secured badge (Desktop Only) */}
          <div className="hidden xl:flex w-full absolute bottom-8 left-12 w-auto animate-fade-in-up animate-delay-200 pointer-events-none z-0">
            <div className="flex items-center space-x-2 text-white/30 text-xs backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 bg-black/10">
              <Lock className="w-3 h-3" />
              <span>Secured by Ghurni ID</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default App;