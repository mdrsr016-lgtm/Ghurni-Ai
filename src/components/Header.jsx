import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Home, Compass, Map as MapIcon, Bot, MessageSquare, Bell, User, Settings, HelpCircle, Moon, MessageSquareWarning, LogOut, ChevronRight, RefreshCcw, Users } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const profileRefDesktop = useRef(null);
  const profileRefMobile = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideDesktop = profileRefDesktop.current && !profileRefDesktop.current.contains(event.target);
      const isOutsideMobile = profileRefMobile.current && !profileRefMobile.current.contains(event.target);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setIsProfileOpen(false);
      }

      // Blur tooltip triggers if clicking outside
      if (!event.target.closest('.tooltip-trigger')) {
        if (document.activeElement?.classList.contains('tooltip-trigger')) {
          document.activeElement.blur();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // scrolling down
          setIsVisible(false);
        } else {
          // scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-all duration-300 ${isVisible ? 'translate-y-0' : 'md:-translate-y-full -translate-y-16'}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
             <img src="/logo.svg" alt="Ghurni AI" className="w-8 h-8 hidden md:block" />
             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-turf-green-600 to-emerald-600 dark:from-turf-green-400 dark:to-emerald-400 block font-caviler">
               Ghurnibook
             </span>
          </div>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-turf-green-500/50 w-64 transition-all placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 justify-center absolute left-1/2 transform -translate-x-1/2">
           <NavTab icon={Home} label="Home" active={isActive('/home')} onClick={() => navigate('/home')} />
           <NavTab icon={Compass} label="Explore" active={isActive('/explore')} onClick={() => navigate('/explore')} />
           <NavTab icon={MapIcon} label="Map" active={isActive('/map')} onClick={() => navigate('/map')} />
           <NavTab icon={Bot} label="Ghurni AI" active={isActive('/ai')} onClick={() => navigate('/ai')} />
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-4">
           <IconButton icon={Search} className="md:hidden" />
           <IconButton icon={MessageSquare} tooltip="Messenger" />
           <IconButton icon={Bell} tooltip="Notifications" className="hidden md:flex" />
           <div ref={profileRefDesktop} className="relative hidden md:block">
             <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                tabIndex={0}
                className="group tooltip-trigger outline-none relative w-8 h-8 rounded-full bg-gradient-to-tr from-turf-green-500 to-emerald-500 p-0.5 cursor-pointer hover:scale-105 transition-transform"
             >
                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                   <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                   {/* <img src="user-avatar.jpg" alt="Profile" /> */}
                </div>
                {!isProfileOpen && <Tooltip text="Account" />} 
             </div>
             
              {isProfileOpen && <ProfileMenu onLogout={handleLogout} onClose={() => setIsProfileOpen(false)} />}
           </div>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className="md:hidden border-t border-gray-100 dark:border-white/5 flex items-center justify-around h-14 px-2 pb-1 bg-white/80 dark:bg-black/80 backdrop-blur-md">
         <MobileNavTab icon={Home} active={isActive('/home')} onClick={() => navigate('/home')} />
         <MobileNavTab icon={Compass} active={isActive('/explore')} onClick={() => navigate('/explore')} />
         <MobileNavTab icon={MapIcon} active={isActive('/map')} onClick={() => navigate('/map')} />
         <MobileNavTab icon={Bot} active={isActive('/ai')} onClick={() => navigate('/ai')} />
         <MobileNavTab icon={Bell} active={isActive('/notifications')} onClick={() => navigate('/notifications')} />
         <div 
            onClick={() => navigate('/menu')}
            className={`flex-1 flex items-center justify-center cursor-pointer group transition-all duration-300 relative
              ${isActive('/menu') ? 'text-turf-green-600 dark:text-turf-green-400' : 'text-gray-500'}
            `}
         >
            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive('/menu') ? 'bg-turf-green-50 dark:bg-turf-green-500/10' : 'group-hover:bg-gray-50 dark:group-hover:bg-white/5'}`}>
               <div className={`w-7 h-7 rounded-full bg-gradient-to-tr from-turf-green-500 to-emerald-500 p-0.5 overflow-hidden transition-all group-hover:scale-110 ${isActive('/menu') ? 'ring-2 ring-turf-green-500 ring-offset-2 dark:ring-offset-black' : ''}`}>
                  <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center">
                     <User className={`w-4 h-4 ${isActive('/menu') ? 'text-turf-green-600 dark:text-turf-green-400' : 'text-gray-700 dark:text-gray-300'}`} />
                  </div>
               </div>
            </div>
            {isActive('/menu') && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-turf-green-500 rounded-t-full"></div>
            )}
         </div>
      </div>
    </header>
  );
};

const NavTab = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 group
      ${active 
        ? 'glass-card bg-turf-green-50/50 dark:bg-turf-green-500/10 text-turf-green-600 dark:text-turf-green-400 ring-1 ring-turf-green-500/20' 
        : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-zinc-800/50'
      }
  `}>
    <Icon className={`w-5 h-5 ${active ? 'fill-current' : 'group-hover:text-turf-green-600 dark:group-hover:text-turf-green-400'}`} />
    <span className={`font-medium text-sm ${active ? 'font-semibold' : ''}`}>{label}</span>
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-turf-green-500 rounded-t-full mt-1 hidden"></div>
    )}
  </div>
);

const MobileNavTab = ({ icon: Icon, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-center flex-1 h-full relative cursor-pointer group transition-all duration-300
      ${active ? 'text-turf-green-600 dark:text-turf-green-400' : 'text-gray-500 dark:text-zinc-500'}
  `}>
    <div className={`p-2 rounded-xl transition-all duration-300 ${active ? 'bg-turf-green-50 dark:bg-turf-green-500/10' : 'group-hover:bg-gray-50 dark:group-hover:bg-white/5'}`}>
       <Icon className={`w-6 h-6 ${active ? 'fill-current' : 'group-hover:scale-110'}`} />
    </div>
    {active && (
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-turf-green-500 rounded-t-full"></div>
    )}
  </div>
);

const IconButton = ({ icon: Icon, tooltip, className = "" }) => (
  <button 
    className={`group tooltip-trigger outline-none relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 transition-colors ${className}`}
    tabIndex={0}
  >
    <Icon className="w-5 h-5" />
    {tooltip && <Tooltip text={tooltip} />}
  </button>
);

const Tooltip = ({ text }) => (
  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-0 translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 scale-90 group-hover:scale-100 group-focus-within:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[60] bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] ring-1 ring-black/5 dark:ring-white/5 flex flex-col items-center">
    {/* Beak/Arrow - Perfectly matched to global card style */}
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-t border-l border-white/50 dark:border-white/10"></div>
    <span className="relative z-10 text-gray-900 dark:text-zinc-100 font-bold tracking-tight text-[11px] md:text-xs">{text}</span>
  </div>
);

const ProfileMenu = ({ onLogout, onClose, isMobile }) => {
  return (
    <div className={`absolute ${isMobile ? 'bottom-16 right-0 left-0 mx-auto w-[95vw] max-w-[360px]' : 'top-12 right-0 w-[360px]'} bg-white/40 dark:bg-black/40 backdrop-blur-2xl text-gray-900 dark:text-zinc-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 z-[100] border border-white/50 dark:border-white/10 animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-top-2 duration-300 ring-1 ring-black/5 dark:ring-white/5`}>
      
      {/* Current Profile */}
      <div className="rounded-xl overflow-hidden mb-4">
          <div className="p-2 space-y-2">
            
            {/* Active User */}
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer transition-all bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 shadow-sm group/user">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-turf-green-500/20 to-emerald-500/20 flex items-center justify-center overflow-hidden border border-white/60 dark:border-white/10 relative transition-transform group-hover/user:scale-105">
                   <img src="/user-avatar.jpg" className="w-full h-full object-cover opacity-0" alt="" />
                   <User className="w-6 h-6 text-turf-green-600 dark:text-turf-green-400 absolute" />
                </div>
                <div className="flex flex-col">
                   <span className="font-bold text-[17px] tracking-tight">Rashid Shahriyar</span>
                   <span className="text-xs text-gray-500 dark:text-gray-400">See your profile</span>
                </div>
            </div>
          </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-1">
        <MenuItem icon={Settings} label="Settings & privacy" hasSubmenu onClick={onClose} />
        <MenuItem icon={HelpCircle} label="Help & support" hasSubmenu onClick={onClose} />
        <MenuItem icon={Moon} label="Display & accessibility" hasSubmenu onClick={onClose} />
        <MenuItem icon={MessageSquareWarning} label="Give feedback" subtext="CTRL B" onClick={onClose} />
        <MenuItem icon={LogOut} label="Log out" onClick={() => { onLogout(); onClose(); }} />
      </div>

      {/* Footer */}
      <div className="mt-4 px-2 text-[12px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Advertising</a> · <a href="#" className="hover:underline">Ad Choices</a> · <a href="#" className="hover:underline">Cookies</a> · <span className="hover:underline cursor-pointer">More</span>
          </div>
          <div className="mt-2 opacity-60 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-turf-green-500"></span>
              Ghurnibook © 2025
          </div>
      </div>

    </div>
  );
};

const MenuItem = ({ icon: Icon, label, subtext, hasSubmenu, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-2 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer transition-all group/item"
  >
     <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-800 group-hover/item:bg-turf-green-50 dark:group-hover/item:bg-turf-green-500/20 flex items-center justify-center transition-all border border-transparent group-hover/item:border-turf-green-200 dark:group-hover/item:border-turf-green-500/30">
           <Icon size={18} className="text-gray-700 dark:text-zinc-300 group-hover/item:text-turf-green-600 dark:group-hover/item:text-turf-green-400" />
        </div>
        <div className="flex flex-col">
           <span className="font-bold text-[15px] text-gray-800 dark:text-zinc-100 group-hover/item:text-turf-green-700 dark:group-hover/item:text-turf-green-400 transition-colors">{label}</span>
           {subtext && <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-semibold">{subtext}</span>}
        </div>
     </div>
     {hasSubmenu && <ChevronRight size={18} className="text-gray-400 dark:text-zinc-600 group-hover/item:translate-x-1 group-hover/item:text-turf-green-500 transition-all" />}
  </div>
);

export default Header;
