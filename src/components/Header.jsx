import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Compass, Map as MapIcon, Bot, MessageSquare, Bell, User, Settings, HelpCircle, Moon, MessageSquareWarning, LogOut, ChevronRight, RefreshCcw, Users } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

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
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
             <img src="/logo.svg" alt="Ghurni AI" className="w-8 h-8" />
             <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-turf-green-600 to-emerald-600 dark:from-turf-green-400 dark:to-emerald-400 hidden md:block font-caviler">
               Ghurnibook
             </span>
          </div>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-zinc-800/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-turf-green-500/50 w-64 transition-all"
            />
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 justify-center absolute left-1/2 transform -translate-x-1/2">
           <NavTab icon={Home} label="Home" active />
           <NavTab icon={Compass} label="Explore" />
           <NavTab icon={MapIcon} label="Map" />
           <NavTab icon={Bot} label="Ghurni AI" />
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
           <IconButton icon={MessageSquare} tooltip="Messenger" />
           <IconButton icon={Bell} tooltip="Notifications" />
           <div ref={profileRef} className="relative">
             <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="group relative w-8 h-8 rounded-full bg-gradient-to-tr from-turf-green-500 to-emerald-500 p-0.5 cursor-pointer hover:scale-105 transition-transform"
             >
                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                   <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                   {/* <img src="user-avatar.jpg" alt="Profile" /> */}
                </div>
                {!isProfileOpen && <Tooltip text="Account" />} 
             </div>
             
             {isProfileOpen && <ProfileMenu onLogout={handleLogout} />}
           </div>
        </div>
      </div>
    </header>
  );
};

const NavTab = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 group
      ${active 
        ? 'bg-turf-green-50 dark:bg-turf-green-500/10 text-turf-green-600 dark:text-turf-green-400' 
        : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-zinc-800'
      }
  `}>
    <Icon className={`w-5 h-5 ${active ? 'fill-current' : 'group-hover:text-turf-green-600 dark:group-hover:text-turf-green-400'}`} />
    <span className={`font-medium text-sm ${active ? 'font-semibold' : ''}`}>{label}</span>
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-turf-green-500 rounded-t-full mt-1 hidden"></div>
    )}
  </div>
);

const IconButton = ({ icon: Icon, tooltip }) => (
  <button className="group relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 transition-colors">
    <Icon className="w-5 h-5" />
    {tooltip && <Tooltip text={tooltip} />}
  </button>
);

const Tooltip = ({ text }) => (
  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-turf-green-600/90 dark:bg-turf-green-500/90 backdrop-blur-md text-white text-[10px] md:text-xs px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg shadow-turf-green-500/20 font-semibold tracking-wide border border-white/20 dark:border-white/10">
    {text}
  </div>
);

const ProfileMenu = ({ onLogout }) => {
  return (
    <div className="absolute top-12 right-0 w-[360px] bg-[#242526] text-gray-100 rounded-xl shadow-2xl p-4 z-[100] border border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
      
      {/* Current Profile */}
      <div className="shadow-[0_2px_12px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden mb-4">
          <div className="bg-[#242526] p-2 space-y-2">
            
            {/* Active User */}
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#3A3B3C] cursor-pointer transition-colors bg-[#3A3B3C]/50 shadow-inner">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600">
                   <img src="/user-avatar.jpg" className="w-full h-full object-cover opacity-0" alt="" /> {/* Placeholder */}
                   <User className="w-6 h-6 text-gray-300 absolute" />
                </div>
                <span className="font-semibold text-[17px] tracking-wide">Rashid Shahriyar</span>
            </div>
          </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-1">
        <MenuItem icon={Settings} label="Settings & privacy" hasSubmenu />
        <MenuItem icon={HelpCircle} label="Help & support" hasSubmenu />
        <MenuItem icon={Moon} label="Display & accessibility" hasSubmenu />
        <MenuItem icon={MessageSquareWarning} label="Give feedback" subtext="CTRL B" />
        <MenuItem icon={LogOut} label="Log out" onClick={onLogout} />
      </div>

      {/* Footer */}
      <div className="mt-4 px-2 text-[13px] text-gray-500 font-normal leading-relaxed">
          <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Advertising</a> · <a href="#" className="hover:underline">Ad Choices</a> · <a href="#" className="hover:underline">Cookies</a> · <span className="hover:underline cursor-pointer">More</span>
          <div className="mt-1">
              Ghurnibook © 2025
          </div>
      </div>

    </div>
  );
};

const MenuItem = ({ icon: Icon, label, subtext, hasSubmenu, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#3A3B3C] cursor-pointer transition-colors group"
  >
     <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#3A3B3C] group-hover:bg-[#4E4F50] flex items-center justify-center transition-colors">
           <Icon size={20} className="text-gray-200" />
        </div>
        <div className="flex flex-col">
           <span className="font-medium text-[15px] text-gray-200">{label}</span>
           {subtext && <span className="text-xs text-gray-400">{subtext}</span>}
        </div>
     </div>
     {hasSubmenu && <ChevronRight size={24} className="text-gray-400" />}
  </div>
);

export default Header;
