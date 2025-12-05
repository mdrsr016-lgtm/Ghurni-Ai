import React from "react";
import { Search, Home, Users, Tv, Store, Bell, MessageCircle, User } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="fixed top-0 w-full h-16 bg-black/40 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4 sm:px-6 4k:h-24 4k:px-10 transition-all duration-300">
      {/* LEFT: Search */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Icon (Visible only on small screens) */}
        <div className="md:hidden w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
          <Search className="w-5 h-5 text-white/70" />
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search Ghurni Ai"
            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all w-64 4k:w-96 4k:py-4 4k:pl-12 4k:text-xl"
          />
        </div>
      </div>

      {/* MIDDLE: Navigation (Facebook Style) */}
      <div className="hidden tab:flex items-center gap-1 4k:gap-4 h-full relative">
        <NavIcon icon={<Home />} active />
        <NavIcon icon={<Users />} />
        <NavIcon icon={<Tv />} />
        <NavIcon icon={<Store />} />
      </div>

      {/* RIGHT: Actions & Profile */}
      <div className="flex items-center gap-2 4k:gap-4">
        {/* Action Buttons */}
        <IconButton icon={<MessageCircle />} />
        <IconButton icon={<Bell />} />
        
        {/* Profile Dropdown Trigger (simulated) */}
        <div 
          onClick={onLogout}
          className="relative group cursor-pointer"
          title="Sign Out"
        >
          <div className="w-10 h-10 4k:w-14 4k:h-14 bg-white/10 rounded-full overflow-hidden border border-white/20 group-hover:border-red-400/50 transition-all flex items-center justify-center">
             <User className="w-6 h-6 4k:w-8 4k:h-8 text-white/80 group-hover:text-red-300" />
          </div>
          {/* Status Indicator */}
          <div className="absolute bottom-0 right-0 w-3 h-3 4k:w-4 4k:h-4 bg-green-500 rounded-full border-2 border-[#1c1c1e] 4k:border-[#2c2c2e]" />
        </div>
      </div>
    </header>
  );
};

const NavIcon = ({ icon, active }: { icon: React.ReactNode; active?: boolean }) => (
  <div
    className={`
      h-full px-8 4k:px-12 flex items-center justify-center cursor-pointer relative group
      ${active ? "text-violet-400" : "text-white/60 hover:bg-white/5 rounded-xl"}
    `}
  >
    <div className={`transform transition-transform duration-200 group-hover:scale-110 4k:scale-125 4k:[&>svg]:w-8 4k:[&>svg]:h-8`}>
      {icon}
    </div>
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-1 bg-violet-500 rounded-t-full shadow-[0_-2px_10px_rgba(139,92,246,0.5)]" />
    )}
  </div>
);

const IconButton = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 4k:w-14 4k:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/5 4k:[&>svg]:w-7 4k:[&>svg]:h-7 text-white">
    {icon}
  </div>
);

export default Header;
