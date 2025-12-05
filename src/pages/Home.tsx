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
          {/* Logo & Search */}
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
          <div className="max-w-[680px] mx-auto flex flex-col gap-4 sm:gap-6 pb-20">
            
            {/* Create Post Card */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full shrink-0" />
                <div className="flex-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full px-4 flex items-center cursor-pointer">
                  <span className="text-white/60 text-sm">What's on your mind, {userEmail?.split('@')[0]}?</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex justify-between px-2">
                <ActionItem icon={<Video className="text-red-500" size={20} />} label="Live Video" />
                <ActionItem icon={<ImageIcon className="text-green-500" size={20} />} label="Photo/Video" />
                <ActionItem icon={<Smile className="text-yellow-500" size={20} />} label="Feeling/Activity" />
              </div>
            </div>

            {/* Stories (Simplified) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {/* Add Story */}
               <div className="w-28 h-48 sm:w-32 sm:h-52 shrink-0 bg-white/5 rounded-xl relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group">
                  <img src={currentSrc || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500" alt="Me" />
                  <div className="absolute bottom-0 w-full h-16 bg-zinc-800 flex flex-col items-center justify-center relative">
                     <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-zinc-800 flex items-center justify-center absolute -top-4 text-white">
                        +
                     </div>
                     <span className="text-xs font-bold mt-3">Create Story</span>
                  </div>
               </div>
               {/* Mock Stories */}
               {[1,2,3,4].map(i => (
                  <div key={i} className="w-28 h-48 sm:w-32 sm:h-52 shrink-0 bg-black/40 rounded-xl relative overflow-hidden cursor-pointer hover:brightness-110 transition-all border border-white/5">
                     <img src={`https://source.unsplash.com/random/300x500?sig=${i}`} className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700" alt="Story" />
                     <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-4 border-blue-500 overflow-hidden">
                        <img src={`https://source.unsplash.com/random/100x100?face&sig=${i}`} className="w-full h-full object-cover" />
                     </div>
                     <span className="absolute bottom-2 left-2 text-xs font-bold drop-shadow-md">User {i}</span>
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
  <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
    {icon}
    <span className="text-white/60 font-medium text-sm hidden sm:block">{label}</span>
  </div>
);

const PostCard = ({ author, time, content, image }: { author: string, time: string, content: string, image?: string }) => (
  <div className="glass-panel rounded-2xl w-full flex flex-col animate-fade-in-up">
    {/* Header */}
    <div className="p-4 flex justify-between items-start">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-white/10 rounded-full overflow-hidden">
           <User className="w-full h-full p-2 text-white/50" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white hover:underline cursor-pointer">{author}</span>
          <div className="flex items-center gap-1 text-xs text-white/50">
            <span>{time}</span>
            <span>•</span>
            <Users size={12} />
          </div>
        </div>
      </div>
      <MoreHorizontal className="text-white/40 cursor-pointer hover:text-white" />
    </div>

    {/* Content */}
    <div className="px-4 pb-3">
      <p className="text-white/90 leading-relaxed font-light text-sm sm:text-base">{content}</p>
    </div>

    {/* Image */}
    {image && (
      <div className="w-full aspect-video bg-black/20 overflow-hidden cursor-pointer">
        <img src={image} alt="Post Content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
    )}

    {/* Stats */}
    <div className="px-4 py-2 flex justify-between items-center text-xs text-white/50 border-b border-white/5 text-sm">
       <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center p-1"><ThumbsUp size={10} className="text-white" fill="white" /></div>
          <span>2.4K</span>
       </div>
       <div className="flex gap-3">
          <span className="hover:underline cursor-pointer">458 Comments</span>
          <span className="hover:underline cursor-pointer">128 Shares</span>
       </div>
    </div>

    {/* Actions */}
    <div className="p-2 px-4 flex justify-between gap-1">
      <PostAction icon={<ThumbsUp size={20} />} label="Like" />
      <PostAction icon={<MessageSquare size={20} />} label="Comment" />
      <PostAction icon={<Share2 size={20} />} label="Share" />
    </div>
  </div>
);

const PostAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-all text-white/60 hover:text-white active:scale-95">
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </div>
);

export default Home;
