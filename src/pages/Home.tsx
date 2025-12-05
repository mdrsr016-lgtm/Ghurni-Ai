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
  Store
} from "lucide-react";

interface HomeProps {
  userEmail: string | undefined;
}

const Home: React.FC<HomeProps> = ({ userEmail }) => {
  const { currentSrc, isLoading, setIsLoading } = useWallpaper();
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(false);

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
      <Header onLogout={handleLogout} isSidebarExpanded={isSidebarExpanded} />

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 pt-20 flex max-w-[1920px] mx-auto min-h-screen">
        
        {/* MODERN COLLAPSIBLE SIDEBAR */}
        <aside 
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
          className="hidden md:flex flex-col w-[72px] hover:w-[280px] lg:hover:w-[320px] bg-black/40 backdrop-blur-xl border-r border-white/5 fixed left-0 top-0 h-screen pt-20 z-20 transition-all duration-300 ease-in-out group"
        >
          {/* Logo Section */}
          <div className="px-3 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              {/* Logo Icon - Always visible */}
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600/80 to-indigo-600/80 rounded-xl flex items-center justify-center shadow-lg border border-white/20 shrink-0">
                <LogoIcon className="w-6 h-6 text-white" />
              </div>
              {/* Logo Text - Only visible when expanded */}
              <span className="font-bold text-xl text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ghurni Ai
              </span>
            </div>
          </div>

          {/* Search Section */}
          <div className="px-3 py-6 space-y-4">
            {/* Search Bar - Only visible when expanded */}
            <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/60 transition-colors" />
              <input
                type="text"
                placeholder="Search Ghurni Ai"
                className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 overflow-y-auto scrollbar-hide">
            <div className="space-y-1">
              <SidebarNavItem 
                icon={<Users className="w-6 h-6" />} 
                label="Friends" 
                iconColor="text-blue-400"
              />
              <SidebarNavItem 
                icon={<Clock className="w-6 h-6" />} 
                label="Memories" 
                iconColor="text-blue-400"
              />
              <SidebarNavItem 
                icon={<Bookmark className="w-6 h-6" />} 
                label="Saved" 
                iconColor="text-purple-400"
              />
              <SidebarNavItem 
                icon={<Users className="w-6 h-6" />} 
                label="Groups" 
                iconColor="text-blue-400"
              />
              <SidebarNavItem 
                icon={<Video className="w-6 h-6" />} 
                label="Video" 
                iconColor="text-red-400"
              />
              <SidebarNavItem 
                icon={<Store className="w-6 h-6" />} 
                label="Marketplace" 
                iconColor="text-blue-400"
              />
              <SidebarNavItem 
                icon={<Calendar className="w-6 h-6" />} 
                label="Events" 
                iconColor="text-red-400"
              />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 my-4" />

            {/* See More */}
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-all">
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors shrink-0">
                <ChevronDown className="w-5 h-5 text-white/60" />
              </div>
              <span className="font-medium text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">See more</span>
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 md:ml-[72px] px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300">
          {/* CENTER FEED */}
          <div className="max-w-full sm:max-w-[600px] md:max-w-[680px] mx-auto flex flex-col gap-3 sm:gap-4 md:gap-6 pb-16 sm:pb-20 md:pb-24" role="feed" aria-label="News Feed">
            
            {/* Create Post Card */}
            <div className="glass-panel p-3 sm:p-4 rounded-2xl flex flex-col gap-3 sm:gap-4 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full shrink-0" />
                <button 
                  className="flex-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full px-3 sm:px-4 flex items-center cursor-pointer min-h-[40px] sm:min-h-[44px] text-left"
                  aria-label="Create a post"
                >
                  <span className="text-white/60 text-xs sm:text-sm">What's on your mind, {userEmail?.split('@')[0]}?</span>
                </button>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex flex-wrap sm:flex-nowrap justify-between gap-1 sm:gap-2 px-1 sm:px-2">
                <ActionItem icon={<Video className="text-red-500" size={18} />} label="Live Video" />
                <ActionItem icon={<ImageIcon className="text-green-500" size={18} />} label="Photo/Video" />
                <ActionItem icon={<Smile className="text-yellow-500" size={18} />} label="Feeling" />
              </div>
            </div>

            {/* Stories (Simplified) */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory" role="region" aria-label="Stories">
               {/* Add Story */}
               <div className="w-24 h-40 sm:w-28 sm:h-48 md:w-32 md:h-52 shrink-0 bg-white/5 rounded-xl relative overflow-hidden cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300 group snap-start shadow-lg shadow-black/10">
                  <img 
                    src={currentSrc || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} 
                    className="w-full h-28 sm:h-32 md:h-36 object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Your story" 
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 w-full h-12 sm:h-16 bg-gradient-to-t from-zinc-900 to-zinc-800 flex flex-col items-center justify-center relative">
                     <button 
                       className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full border-3 sm:border-4 border-zinc-800 flex items-center justify-center absolute -top-3 sm:-top-4 text-white text-lg sm:text-xl font-bold shadow-lg hover:bg-blue-600 transition-colors"
                       aria-label="Create story"
                     >
                        +
                     </button>
                     <span className="text-[10px] sm:text-xs font-bold mt-2 sm:mt-3">Create Story</span>
                  </div>
               </div>
               {/* Mock Stories */}
               {[1,2,3,4].map(i => (
                  <div key={i} className="w-24 h-40 sm:w-28 sm:h-48 md:w-32 md:h-52 shrink-0 bg-black/40 rounded-xl relative overflow-hidden cursor-pointer hover:brightness-110 hover:scale-[1.02] transition-all duration-300 border border-white/5 snap-start shadow-lg shadow-black/10">
                     <img 
                       src={`https://source.unsplash.com/random/300x500?sig=${i}`} 
                       className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" 
                       alt={`Story ${i}`} 
                       loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                     <div className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-3 sm:border-4 border-blue-500 overflow-hidden shadow-lg">
                        <img src={`https://source.unsplash.com/random/100x100?face&sig=${i}`} className="w-full h-full object-cover" alt={`User ${i}`} />
                     </div>
                     <span className="absolute bottom-2 left-2 text-[10px] sm:text-xs font-bold drop-shadow-md">User {i}</span>
                  </div>
               ))}
            </div>

            {/* Feed Post 1 */}
            <PostCard 
              author="Ghurni Ai Team"
              time="2 hours ago"
              content="Welcome to the new Glassmorphic generic layout! We've updated the UI to feel more modern and immersive. Let us know what you think in the comments below! 🚀 #Design #UI #React"
              image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            />

             {/* Feed Post 2 */}
             <PostCard 
              author="Nature Lover"
              time="5 hours ago"
              content="Just exploring the beautiful mountains. The view from up here is absolutely breathtaking. Can't wait to go back next weekend!"
              image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2600&auto=format&fit=crop"
            />

          </div>
        </div>

      </div>
    </main>
  );
};

// --- Sub-components for Layout ---

const SidebarNavItem = ({ icon, label, iconColor }: { icon: React.ReactNode, label: string, iconColor?: string }) => (
  <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all group/item">
    <div className={`w-9 h-9 bg-white/10 rounded-full flex items-center justify-center ${iconColor || 'text-white/60'} group-hover/item:bg-white/20 transition-colors shrink-0`}>
      {icon}
    </div>
    <span className="font-medium text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{label}</span>
  </div>
);

const ActionItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 hover:bg-white/5 active:bg-white/10 rounded-lg cursor-pointer flex-1 justify-center transition-all active:scale-95 min-h-[40px] sm:min-h-[44px]" aria-label={label}>
    {icon}
    <span className="text-white/60 font-medium text-[10px] sm:text-xs md:text-sm whitespace-nowrap">{label}</span>
  </button>
);

const PostCard = ({ author, time, content, image }: { author: string, time: string, content: string, image?: string }) => (
  <article className="glass-panel rounded-2xl w-full flex flex-col animate-fade-in-up shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300" role="article" aria-label={`Post by ${author}`}>
    {/* Header */}
    <div className="p-3 sm:p-4 flex justify-between items-start">
      <div className="flex gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full overflow-hidden shrink-0">
           <User className="w-full h-full p-1.5 sm:p-2 text-white/50" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm sm:text-base text-white hover:underline cursor-pointer">{author}</span>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-white/50">
            <span>{time}</span>
            <span>•</span>
            <Users size={10} className="sm:w-3 sm:h-3" />
          </div>
        </div>
      </div>
      <button className="text-white/40 cursor-pointer hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all" aria-label="More options">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>

    {/* Content */}
    <div className="px-3 sm:px-4 pb-2 sm:pb-3">
      <p className="text-white/90 leading-relaxed font-light text-xs sm:text-sm md:text-base">{content}</p>
    </div>

    {/* Image */}
    {image && (
      <div className="w-full aspect-video bg-black/20 overflow-hidden cursor-pointer">
        <img src={image} alt="Post Content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
      </div>
    )}

    {/* Stats */}
    <div className="px-3 sm:px-4 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-[10px] sm:text-xs text-white/50 border-b border-white/5">
       <div className="flex items-center gap-1">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center p-0.5 sm:p-1">
            <ThumbsUp size={8} className="sm:w-2.5 sm:h-2.5 text-white" fill="white" />
          </div>
          <span className="text-xs sm:text-sm">2.4K</span>
       </div>
       <div className="flex gap-2 sm:gap-3">
          <span className="hover:underline cursor-pointer text-xs sm:text-sm">458 Comments</span>
          <span className="hover:underline cursor-pointer text-xs sm:text-sm">128 Shares</span>
       </div>
    </div>

    {/* Actions */}
    <div className="p-2 px-3 sm:px-4 flex justify-between gap-1">
      <PostAction icon={<ThumbsUp size={16} className="sm:w-5 sm:h-5" />} label="Like" />
      <PostAction icon={<MessageSquare size={16} className="sm:w-5 sm:h-5" />} label="Comment" />
      <PostAction icon={<Share2 size={16} className="sm:w-5 sm:h-5" />} label="Share" />
    </div>
  </article>
);

const PostAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 hover:bg-white/10 active:bg-white/15 rounded-lg cursor-pointer transition-all text-white/60 hover:text-white active:scale-95 min-h-[40px] sm:min-h-[44px]" aria-label={label}>
    {icon}
    <span className="font-medium text-xs sm:text-sm">{label}</span>
  </button>
);

export default Home;
