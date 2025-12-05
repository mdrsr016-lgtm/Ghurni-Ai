import React from "react";
import { Search, Home, Users, Tv, Store, Bell, MessageCircle, User, Menu, LogOut, Settings, HelpCircle, ChevronDown } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
  isSidebarExpanded: boolean;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isSidebarExpanded, onMobileMenuToggle, isMobileMenuOpen }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 w-full h-16 bg-black/40 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4 sm:px-6 4k:h-24 4k:px-10 transition-all duration-300 ${
      isSidebarExpanded 
        ? 'md:left-[280px] lg:left-[320px] md:w-[calc(100%-280px)] lg:w-[calc(100%-320px)]' 
        : 'md:left-[72px] md:w-[calc(100%-72px)]'
    }`}>
      {/* LEFT: Mobile Menu Button + Search */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={onMobileMenuToggle}
          className="md:hidden w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="w-5 h-5 text-white/70" />
        </button>

        {/* Mobile Search Icon (Visible only on small screens) */}
        <div className="md:hidden w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
          <Search className="w-5 h-5 text-white/70" />
        </div>

        {/* Desktop Search Bar - Hidden when sidebar is expanded (to avoid duplicate) */}
        <div className={`hidden md:flex items-center relative transition-opacity duration-300 ${isSidebarExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
        {/* Action Buttons with notification badges */}
        <IconButton icon={<MessageCircle />} badge={3} tooltip="Messages" />
        <IconButton icon={<Bell />} badge={5} tooltip="Notifications" />
        
        {/* Profile Dropdown */}
        <div 
          ref={profileMenuRef}
          className="relative"
        >
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="relative group cursor-pointer flex items-center gap-1"
            aria-label="Profile menu"
            aria-expanded={isProfileMenuOpen}
          >
            <div className="w-10 h-10 4k:w-14 4k:h-14 bg-white/10 rounded-full overflow-hidden border border-white/20 group-hover:border-violet-400/50 transition-all flex items-center justify-center">
               <User className="w-6 h-6 4k:w-8 4k:h-8 text-white/80 group-hover:text-violet-300" />
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-0 right-0 w-3 h-3 4k:w-4 4k:h-4 bg-green-500 rounded-full border-2 border-[#1c1c1e] 4k:border-[#2c2c2e]" />
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-200 hidden sm:block ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-[#1a1a1c]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-black/50 animate-fade-in-scale overflow-hidden">
              {/* Profile Section */}
              <div className="p-3 border-b border-white/10">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Your Profile</div>
                    <div className="text-xs text-white/50">View your profile</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <ProfileMenuItem icon={<Settings className="w-5 h-5" />} label="Settings & Privacy" />
                <ProfileMenuItem icon={<HelpCircle className="w-5 h-5" />} label="Help & Support" />
              </div>

              {/* Logout */}
              <div className="p-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 bg-red-500/20 rounded-full flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
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

const IconButton = ({ icon, badge, tooltip }: { icon: React.ReactNode; badge?: number; tooltip?: string }) => (
  <div className="relative group">
    <div className="w-10 h-10 4k:w-14 4k:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/5 4k:[&>svg]:w-7 4k:[&>svg]:h-7 text-white">
      {icon}
    </div>
    {/* Notification Badge */}
    {badge && badge > 0 && (
      <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center px-1">
        <span className="text-[10px] font-bold text-white">{badge > 9 ? '9+' : badge}</span>
      </div>
    )}
    {/* Tooltip */}
    {tooltip && (
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/90 text-black text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {tooltip}
      </div>
    )}
  </div>
);

const ProfileMenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
    <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white/70">
      {icon}
    </div>
    <span className="font-medium text-white/90">{label}</span>
  </div>
);

export default Header;
