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
      <Header onLogout={handleLogout} />

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 pt-20 px-4 sm:px-6 4k:pt-28 4k:px-12 flex justify-center gap-6 4k:gap-10 max-w-[1920px] mx-auto min-h-screen">
        
        {/* LEFT SIDEBAR (Navigation) - Hidden on Mobile */}
        <div className="hidden laptop:flex flex-col gap-2 w-[280px] 4k:w-[360px] sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide pb-4">
          <SidebarItem icon={<Users size={24} className="text-blue-400" />} label="Friends" />
          <SidebarItem icon={<Clock size={24} className="text-blue-400" />} label="Memories" />
          <SidebarItem icon={<Bookmark size={24} className="text-purple-400" />} label="Saved" />
          <SidebarItem icon={<Users size={24} className="text-blue-400" />} label="Groups" />
          <SidebarItem icon={<Video size={24} className="text-red-400" />} label="Video" />
          <SidebarItem icon={<Store size={24} className="text-blue-400" />} label="Marketplace" />
          <SidebarItem icon={<Calendar size={24} className="text-red-400" />} label="Events" />
          <div className="w-full h-px bg-white/10 my-2" />
          <SidebarItem icon={<ChevronDown size={24} className="bg-white/10 rounded-full p-1" />} label="See more" />
        </div>

        {/* CENTER FEED */}
        <div className="flex-1 max-w-[680px] 4k:max-w-[800px] flex flex-col gap-6 pb-20">
          
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
             <div className="w-28 h-48 4k:w-36 4k:h-60 shrink-0 bg-white/5 rounded-xl relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group">
                <img src={currentSrc || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" alt="Me" />
                <div className="absolute bottom-0 w-full h-16 bg-zinc-800 flex flex-col items-center justify-center relative">
                   <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-zinc-800 flex items-center justify-center absolute -top-4 text-white">
                      +
                   </div>
                   <span className="text-xs font-bold mt-3">Create Story</span>
                </div>
             </div>
             {/* Mock Stories */}
             {[1,2,3,4].map(i => (
                <div key={i} className="w-28 h-48 4k:w-36 4k:h-60 shrink-0 bg-black/40 rounded-xl relative overflow-hidden cursor-pointer hover:brightness-110 transition-all border border-white/5">
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

        {/* RIGHT SIDEBAR (Contacts/Sponsored) - Hidden on Tablet */}
        <div className="hidden desktop:flex flex-col gap-6 w-[280px] 4k:w-[360px] sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
          {/* Sponsored */}
          <div>
            <h3 className="text-white/60 font-medium mb-4 text-lg">Sponsored</h3>
            <div className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
               <div className="w-24 h-24 rounded-xl bg-white/10 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                  <span className="font-semibold">Premium Kicks</span>
                  <span className="text-xs text-white/50">store.nike.com</span>
               </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
          
          {/* Contacts */}
          <div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-white/60 font-medium text-lg">Contacts</h3>
                <div className="flex gap-2 text-white/40">
                   <Video size={16} />
                   <Search size={16} />
                   <MoreHorizontal size={16} />
                </div>
             </div>
             <div className="flex flex-col gap-2">
                {[1,2,3,4,5,6,7].map(i => (
                   <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
                      <div className="relative">
                         <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                            <img src={`https://source.unsplash.com/random/100x100?face&sig=${i+10}`} className="w-full h-full object-cover" />
                         </div>
                         <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f0f10]"/>
                      </div>
                      <span className="font-medium text-white/80 group-hover:text-white">Friend {i}</span>
                   </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </main>
  );
};

// --- Sub-components for Layout ---

const SidebarItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all active:scale-95">
    <div>{icon}</div>
    <span className="font-medium text-white/90">{label}</span>
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
