/**
 * Home.tsx - Authenticated User Home Page
 * 
 * RESPONSIBILITY: Displays the main application interface for logged-in users.
 * - Shows glassmorphic header with navigation
 * - Displays feed, sidebar, and content
 * - Provides logout functionality via Header component
 * 
 * DOES NOT:
 * - Manage session state (handled by App.tsx)
 * - Handle routing (handled by App.tsx)
 * - Show login forms (handled by Auth.tsx)
 * 
 * This component only renders when App.tsx confirms a valid session exists.
 */
import React from "react";
import { supabase } from "../lib/supabase";
import { useWallpaper } from "../lib/hooks";
import Header from "../components/Header";
import { LogoIcon } from "../components/Icons";
import {
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  Video,
  Image as ImageIcon,
  Smile,
  Users,
  Bookmark,
  Calendar,
  Clock,
  ChevronDown,
  Search,
  User,
  Store,
  X,
  Home as HomeIcon,
  Bell,
  PlusCircle,
  Tv,
  Pencil,
  Library,
  Grid3x3,
  Folder,
  FolderPlus,
  MoreVertical,
  Sparkles,
  Building2,
  Brain,
  Music,
  FileText,
  ArrowUp
} from "lucide-react";

interface HomeProps {
  userEmail: string | undefined;
}

const Home: React.FC<HomeProps> = ({ userEmail }) => {
  const { currentSrc, isLoading, setIsLoading } = useWallpaper();
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeBottomNav, setActiveBottomNav] = React.useState('home');

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="relative w-full min-h-[100dvh] bg-[#0f0f10] text-white font-sans selection:bg-rose-500/30 overflow-x-hidden">
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="mesh-gradient-bg absolute inset-0 w-full h-full opacity-40" />
        {currentSrc && (
          <div
            className={`absolute inset-0 w-full h-full bg-black/60 transition-all duration-[2000ms] ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={currentSrc}
              alt="Background"
              className="w-full h-full object-cover opacity-30 blur-3xl"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        )}
      </div>

      {/* --- HEADER --- */}
      <Header 
        onLogout={handleLogout} 
        isSidebarExpanded={isSidebarExpanded}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-[280px] bg-[#0f0f10]/95 backdrop-blur-xl border-r border-white/10 flex flex-col animate-slide-in-left">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600/80 to-indigo-600/80 rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                  <LogoIcon className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl text-white">Ghurni Ai</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search Ghurni Ai"
                  className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-3 overflow-y-auto">
              <div className="space-y-1">
                <MobileNavItem icon={<Users className="w-6 h-6" />} label="Friends" iconColor="text-blue-400" active />
                <MobileNavItem icon={<Clock className="w-6 h-6" />} label="Memories" iconColor="text-blue-400" />
                <MobileNavItem icon={<Bookmark className="w-6 h-6" />} label="Saved" iconColor="text-purple-400" />
                <MobileNavItem icon={<Users className="w-6 h-6" />} label="Groups" iconColor="text-blue-400" />
                <MobileNavItem icon={<Video className="w-6 h-6" />} label="Video" iconColor="text-red-400" />
                <MobileNavItem icon={<Store className="w-6 h-6" />} label="Marketplace" iconColor="text-blue-400" />
                <MobileNavItem icon={<Calendar className="w-6 h-6" />} label="Events" iconColor="text-red-400" />
              </div>
            </nav>

            {/* Mobile User Section */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full" />
                <div className="flex-1">
                  <div className="font-medium text-white">{userEmail?.split('@')[0]}</div>
                  <div className="text-xs text-white/50">{userEmail}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 pt-20 flex max-w-[1920px] mx-auto min-h-screen">
        
        {/* CHATGPT-STYLE GLASSMORPHIC SIDEBAR (Desktop) */}
        <aside 
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
          className="hidden md:flex flex-col w-[72px] hover:w-[260px] bg-black/20 backdrop-blur-xl border-r border-white/10 fixed left-0 top-0 h-screen z-20 transition-all duration-200 ease-out group shadow-lg shadow-black/20"
        >
          {/* Top Section - Logo */}
          <div className="px-3 pt-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                <LogoIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Ghurni Ai
              </span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-2 pt-2 overflow-y-auto scrollbar-hide flex flex-col">
            {/* Top Actions */}
            <div className="space-y-0.5 mb-4">
              <SidebarNavItem 
                icon={<Pencil className="w-4 h-4" />} 
                label="New chat" 
              />
              <SidebarNavItem 
                icon={<Search className="w-4 h-4" />} 
                label="Search chats" 
              />
              <SidebarNavItem 
                icon={<Library className="w-4 h-4" />} 
                label="Library" 
              />
            </div>

            {/* GPTs Section */}
            <div className="mb-4">
              <div className="px-3 py-1.5 mb-1">
                <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  GPTs
                </span>
              </div>
              <div className="space-y-0.5">
                <SidebarNavItem 
                  icon={<Grid3x3 className="w-4 h-4" />} 
                  label="Explore" 
                />
                <SidebarNavItem 
                  icon={<Sparkles className="w-4 h-4 text-purple-400" />} 
                  label="AI Prompt Generator" 
                />
                <SidebarNavItem 
                  icon={<Building2 className="w-4 h-4 text-gray-400" />} 
                  label="Software Architect GPT" 
                />
                <SidebarNavItem 
                  icon={<div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-[10px] font-bold">C</div>} 
                  label="Canva" 
                />
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-4">
              <div className="px-3 py-1.5 mb-1">
                <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Projects
                </span>
              </div>
              <div className="space-y-0.5">
                <SidebarNavItem 
                  icon={<FolderPlus className="w-4 h-4" />} 
                  label="New project" 
                />
                <SidebarNavItem 
                  icon={<Folder className="w-4 h-4" />} 
                  label="Name gen" 
                />
                <SidebarNavItem 
                  icon={<Store className="w-4 h-4" />} 
                  label="Business" 
                />
                <SidebarNavItem 
                  icon={<Music className="w-4 h-4" />} 
                  label="Naration" 
                />
                <SidebarNavItem 
                  icon={<FileText className="w-4 h-4" />} 
                  label="Short Videos" 
                />
                <SidebarNavItem 
                  icon={<Brain className="w-4 h-4" />} 
                  label="Content + Audience Resear..." 
                />
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm transition-all group/item">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <MoreVertical className="w-4 h-4 text-white/50 group-hover/item:text-white/80 transition-colors" />
                  </div>
                  <span className="font-medium text-sm text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">See more</span>
                </button>
              </div>
            </div>

            {/* Your chats Section */}
            <div className="flex-1">
              <div className="px-3 py-1.5 mb-1">
                <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Your chats
                </span>
              </div>
              <div className="space-y-0.5">
                <ChatItem label="Color palette selection guide" />
                <ChatItem label="New chat" />
                <ChatItem label="Responsive breakpoints guide" />
                <ChatItem label="Tourism platform UI design" />
              </div>
            </div>
          </nav>

          {/* Bottom User Section */}
          <div className="px-2 pb-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm transition-all group/user">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <span className="text-xs font-medium text-white">
                  {userEmail?.split('@')[0]?.substring(0, 2).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="text-sm font-medium text-white truncate">
                  {userEmail?.split('@')[0] || 'User'}
                </div>
                <div className="text-xs text-white/60">Free</div>
              </div>
              <button className="px-3 py-1.5 bg-white/15 backdrop-blur-sm hover:bg-white/20 border border-white/10 rounded text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1">
                <ArrowUp className="w-3 h-3" />
                Upgrade
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 w-full md:ml-[72px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 pb-20 sm:pb-24 md:pb-8 pt-16 sm:pt-20 transition-all duration-200">
          {/* CENTER FEED */}
          <div className="max-w-full sm:max-w-[600px] md:max-w-[680px] lg:max-w-[720px] xl:max-w-[800px] mx-auto flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6" role="feed" aria-label="News Feed">
            
            {/* Create Post Card - with staggered animation */}
            <div className="glass-panel p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl flex flex-col gap-3 sm:gap-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 animate-feed-item">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full shrink-0" />
                <button 
                  className="flex-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full px-3 sm:px-4 md:px-5 flex items-center cursor-pointer min-h-[36px] sm:min-h-[40px] md:min-h-[44px] text-left"
                  aria-label="Create a post"
                >
                  <span className="text-white/60 text-xs sm:text-sm md:text-base">What's on your mind, {userEmail?.split('@')[0]}?</span>
                </button>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex flex-wrap sm:flex-nowrap justify-between gap-1.5 sm:gap-2 md:gap-3 px-1 sm:px-2">
                <ActionItem icon={<Video className="text-red-500" size={16} />} label="Live Video" />
                <ActionItem icon={<ImageIcon className="text-green-500" size={16} />} label="Photo/Video" />
                <ActionItem icon={<Smile className="text-yellow-500" size={16} />} label="Feeling" />
              </div>
            </div>

            {/* Stories Section - with staggered animations and gradient rings */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory animate-feed-item animate-delay-100" role="region" aria-label="Stories">
               {/* Add Story */}
               <div className="w-20 h-32 sm:w-24 sm:h-40 md:w-28 md:h-48 lg:w-32 lg:h-52 shrink-0 bg-white/5 rounded-lg sm:rounded-xl relative overflow-hidden cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300 group snap-start shadow-lg shadow-black/10 animate-story">
                  <img 
                    src={currentSrc || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                    className="w-full h-20 sm:h-28 md:h-32 lg:h-36 object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Your story" 
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 w-full h-10 sm:h-12 md:h-16 bg-gradient-to-t from-zinc-900 to-zinc-800 flex flex-col items-center justify-center relative">
                     <button 
                       className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full border-[2px] sm:border-[3px] md:border-4 border-zinc-800 flex items-center justify-center absolute -top-2.5 sm:-top-3 md:-top-4 text-white text-base sm:text-lg md:text-xl font-bold shadow-lg hover:scale-110 transition-transform"
                       aria-label="Create story"
                     >
                        +
                     </button>
                     <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold mt-1.5 sm:mt-2 md:mt-3">Create Story</span>
                  </div>
               </div>
               {/* Stories with gradient rings */}
               {[1,2,3,4].map((i, index) => (
                  <div 
                    key={i} 
                    className="w-20 h-32 sm:w-24 sm:h-40 md:w-28 md:h-48 lg:w-32 lg:h-52 shrink-0 bg-black/40 rounded-lg sm:rounded-xl relative overflow-hidden cursor-pointer hover:brightness-110 hover:scale-[1.02] transition-all duration-300 border border-white/5 snap-start shadow-lg shadow-black/10 animate-story"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                     <img 
                       src={`https://picsum.photos/300/500?random=${i}`} 
                       className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" 
                       alt={`Story ${i}`} 
                       loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                     {/* Gradient Ring Avatar */}
                     <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full p-[2px] gradient-ring shadow-lg">
                        <img 
                          src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                          className="w-full h-full rounded-full object-cover border-2 border-zinc-900" 
                          alt={`Friend ${i}`} 
                        />
                     </div>
                     <span className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 text-[9px] sm:text-[10px] md:text-xs font-semibold drop-shadow-lg">Friend {i}</span>
                  </div>
               ))}
            </div>

            {/* Feed Post 1 - with staggered animation */}
            <div className="animate-feed-item animate-delay-200">
              <PostCard 
                author="Ghurni Ai Team"
                time="2 hours ago"
                content="Welcome to the new Glassmorphic generic layout! We've updated the UI to feel more modern and immersive. Let us know what you think in the comments below! 🚀 #Design #UI #React"
                image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                verified
              />
            </div>

             {/* Feed Post 2 - with staggered animation */}
             <div className="animate-feed-item animate-delay-300">
              <PostCard 
                author="Nature Lover"
                time="5 hours ago"
                content="Just exploring the beautiful mountains. The view from up here is absolutely breathtaking. Can't wait to go back next weekend!"
                image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2600&auto=format&fit=crop"
              />
             </div>

          </div>
        </div>

      </div>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f10]/95 backdrop-blur-xl border-t border-white/10 safe-area-pb">
        <div className="flex items-center justify-around h-16 px-2">
          <BottomNavItem 
            icon={<HomeIcon className="w-6 h-6" />} 
            label="Home" 
            active={activeBottomNav === 'home'}
            onClick={() => setActiveBottomNav('home')}
          />
          <BottomNavItem 
            icon={<Users className="w-6 h-6" />} 
            label="Friends"
            active={activeBottomNav === 'friends'}
            onClick={() => setActiveBottomNav('friends')}
          />
          <BottomNavItem 
            icon={<PlusCircle className="w-7 h-7" />} 
            label="Create"
            isCenter
            onClick={() => {}}
          />
          <BottomNavItem 
            icon={<Tv className="w-6 h-6" />} 
            label="Watch"
            active={activeBottomNav === 'watch'}
            onClick={() => setActiveBottomNav('watch')}
          />
          <BottomNavItem 
            icon={<Bell className="w-6 h-6" />} 
            label="Alerts"
            active={activeBottomNav === 'alerts'}
            onClick={() => setActiveBottomNav('alerts')}
            badge={3}
          />
        </div>
      </nav>
    </main>
  );
};

// --- Sub-components for Layout ---

const SidebarNavItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm cursor-pointer transition-all group/item relative ${
    active ? 'bg-white/15 backdrop-blur-sm' : ''
  }`}>
    <div className={`w-8 h-8 flex items-center justify-center shrink-0 transition-colors ${
      active ? 'text-white' : 'text-white/70 group-hover/item:text-white'
    }`}>
      {icon}
    </div>
    <span className={`font-medium text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
      active ? 'text-white' : 'text-white/80'
    }`}>
      {label}
    </span>
    {active && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/80 rounded-r-full backdrop-blur-sm" />
    )}
  </button>
);

const ChatItem = ({ label }: { label: string }) => (
  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm cursor-pointer transition-all group/item">
    <div className="w-8 h-8 flex items-center justify-center shrink-0" />
    <span className="font-normal text-sm text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate text-left">
      {label}
    </span>
  </button>
);

const MobileNavItem = ({ icon, label, iconColor, active }: { icon: React.ReactNode, label: string, iconColor?: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all ${active ? 'bg-violet-500/20 border-l-4 border-violet-500' : ''}`}>
    <div className={`w-9 h-9 bg-white/10 rounded-full flex items-center justify-center ${iconColor || 'text-white/60'} transition-colors shrink-0`}>
      {icon}
    </div>
    <span className="font-medium text-white/90">{label}</span>
  </div>
);

const BottomNavItem = ({ 
  icon, 
  label, 
  active, 
  isCenter, 
  onClick,
  badge 
}: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  isCenter?: boolean,
  onClick: () => void,
  badge?: number 
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-xl transition-all relative ${
      isCenter 
        ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 -mt-6 w-14 h-14 rounded-full shadow-lg shadow-violet-500/30 hover:scale-110' 
        : active 
          ? 'text-violet-400' 
          : 'text-white/50 hover:text-white/80'
    }`}
  >
    {icon}
    {!isCenter && <span className="text-[10px] font-medium">{label}</span>}
    {badge && badge > 0 && (
      <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-red-500 rounded-full flex items-center justify-center px-1">
        <span className="text-[9px] font-bold text-white">{badge}</span>
      </div>
    )}
    {active && !isCenter && (
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full" />
    )}
  </button>
);

const ActionItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex items-center gap-1 sm:gap-1.5 md:gap-2 p-2 sm:p-2.5 md:p-3 hover:bg-white/5 active:bg-white/10 rounded-lg cursor-pointer flex-1 justify-center transition-all active:scale-95 min-h-[36px] sm:min-h-[40px] md:min-h-[44px] hover:scale-[1.02]" aria-label={label}>
    {icon}
    <span className="text-white/60 font-medium text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{label}</span>
  </button>
);

const PostCard = ({ author, time, content, image, verified }: { author: string, time: string, content: string, image?: string, verified?: boolean }) => (
  <article className="glass-panel rounded-xl sm:rounded-2xl w-full flex flex-col shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300" role="article" aria-label={`Post by ${author}`}>
    {/* Header */}
    <div className="p-3 sm:p-4 md:p-5 flex justify-between items-start">
      <div className="flex gap-2 sm:gap-3">
        {/* Gradient Ring Avatar */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full p-[2px] gradient-ring shrink-0">
          <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/50" />
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs sm:text-sm md:text-base text-white hover:underline cursor-pointer truncate">{author}</span>
            {verified && (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-white/50">
            <span>{time}</span>
            <span>•</span>
            <Users size={10} className="sm:w-3 sm:h-3" />
          </div>
        </div>
      </div>
      <button className="text-white/40 cursor-pointer hover:text-white hover:bg-white/10 p-1.5 sm:p-2 rounded-lg transition-all shrink-0" aria-label="More options">
        <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>

    {/* Content */}
    <div className="px-3 sm:px-4 md:px-5 pb-2 sm:pb-3 md:pb-4">
      <p className="text-white/90 leading-relaxed text-xs sm:text-sm md:text-base break-words">{content}</p>
    </div>

    {/* Image */}
    {image && (
      <div className="w-full aspect-video bg-black/20 overflow-hidden cursor-pointer">
        <img src={image} alt="Post Content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
      </div>
    )}

    {/* Stats */}
    <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-[10px] sm:text-xs text-white/50 border-b border-white/5">
       <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center p-0.5 sm:p-1 shrink-0">
            <ThumbsUp size={8} className="sm:w-2.5 sm:h-2.5 text-white" fill="white" />
          </div>
          <span className="text-xs sm:text-sm">2.4K</span>
       </div>
       <div className="flex gap-2 sm:gap-3 flex-wrap">
          <span className="hover:underline cursor-pointer text-xs sm:text-sm">458 Comments</span>
          <span className="hover:underline cursor-pointer text-xs sm:text-sm">128 Shares</span>
       </div>
    </div>

    {/* Actions */}
    <div className="p-2 sm:p-2.5 px-3 sm:px-4 md:px-5 flex justify-between gap-1 sm:gap-2">
      <PostAction icon={<ThumbsUp size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />} label="Like" />
      <PostAction icon={<MessageSquare size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />} label="Comment" />
      <PostAction icon={<Share2 size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />} label="Share" />
    </div>
  </article>
);

const PostAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 p-2 sm:p-2.5 md:p-3 hover:bg-white/10 active:bg-white/15 rounded-lg cursor-pointer transition-all text-white/60 hover:text-violet-400 active:scale-95 min-h-[36px] sm:min-h-[40px] md:min-h-[44px] group" aria-label={label}>
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium text-[10px] sm:text-xs md:text-sm">{label}</span>
  </button>
);

export default Home;
