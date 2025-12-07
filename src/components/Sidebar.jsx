import React, { useState } from 'react';
import { Map, Compass, Plane, Hotel, Calendar, HelpCircle, Plus, Folder, MessageSquare, MoreHorizontal, LogOut } from 'lucide-react';
import UseAnimations from 'react-useanimations';
import settings from 'react-useanimations/lib/settings';
import activity from 'react-useanimations/lib/activity';
import searchToX from 'react-useanimations/lib/searchToX';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar (Auto-Expand) */}
      <div className={`hidden md:flex fixed left-0 top-0 h-screen ${isOpen ? 'w-64' : 'w-[70px]'} border-r border-white/5 bg-[#030014]/95 backdrop-blur-xl flex-col z-50 transition-all duration-300 ease-in-out overflow-hidden peer`}>
         
         {/* Top Actions */}
         <div className="p-4 flex flex-col gap-4">
            
            {/* App Logo */}
            <div className="flex items-center gap-3 px-2 mb-2 whitespace-nowrap cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
               <div className="w-8 h-8 min-w-[32px] rounded-full bg-white/10 flex items-center justify-center">
                  <img src="/logo.svg" alt="Ghurni" className="w-5 h-5 opacity-90" />
               </div>
               <span className={`text-xl italic font-normal tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: 'var(--font-serif)' }}>Ghurni Ai</span>
            </div>

            <div className="flex items-center justify-between px-2 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group/btn whitespace-nowrap overflow-hidden">
               <div className="flex items-center gap-3">
                  <div className="min-w-[18px]">
                     <UseAnimations animation={activity} size={24} strokeColor="#a78bfa" />
                  </div>
                  <span className={`font-semibold text-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>New Plan</span>
               </div>
               <Plus size={18} className={`text-zinc-400 group-hover/btn:text-white transition-colors ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all text-sm whitespace-nowrap overflow-hidden">
               <div className="min-w-[18px]">
                  <UseAnimations animation={searchToX} size={24} strokeColor="currentColor" />
               </div>
               <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Search plans...</span>
            </button>
         </div>

         {/* Scrollable Content */}
         <div className={`flex-1 overflow-y-auto no-scrollbar px-3 py-2 flex flex-col gap-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Plan Boards (Projects) */}
            <div className="flex flex-col gap-1">
               <h3 className="px-3 text-xs font-semibold text-zinc-500 mb-1">Plan Boards</h3>
               <SidebarItem icon={<Folder size={16} />} label="Summer 2025" />
               <SidebarItem icon={<Folder size={16} />} label="Honeymoon Ideas" />
               <SidebarItem icon={<Folder size={16} />} label="Business Plan" />
               <SidebarItem icon={<Folder size={16} />} label="Europe Tour" />
               
               <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-purple-400/80 hover:bg-white/5 hover:text-purple-300 transition-all text-sm w-full text-left group mt-1">
                  <Plus size={16} className="min-w-[16px] animate-pulse" />
                  <span className={`truncate transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>New Board</span>
               </button>
            </div>

            {/* Recent Plans (Chats) */}
            <div className="flex flex-col gap-1">
               <h3 className="px-3 text-xs font-semibold text-zinc-500 mb-1">Recent Plans</h3>
               <SidebarItem icon={<MessageSquare size={16} />} label="Flights to Tokyo" />
               <SidebarItem icon={<MessageSquare size={16} />} label="Best hotels in Paris" />
               <SidebarItem icon={<MessageSquare size={16} />} label="Safari costs" />
               <SidebarItem icon={<MessageSquare size={16} />} label="Visa requirements" />
            </div>
         </div>

         {/* Footer (Profile) */}
         <div className="p-4 border-t border-white/5 whitespace-nowrap overflow-hidden">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
               <div className="w-8 h-8 min-w-[32px] rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                  RS
               </div>
               <div className={`flex-1 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-sm font-medium truncate">Rashid Shahriar</p>
                  <p className="text-xs text-zinc-500 truncate">Free Plan</p>
               </div>
               <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  <UseAnimations animation={settings} size={20} strokeColor="#71717a" />
               </div>
            </div>
         </div>
      </div>

      {/* Mobile Bottom Nav (Unchanged functionality, just styled) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full border-t border-white/5 bg-[#030014]/95 backdrop-blur-xl flex flex-row items-center justify-between py-4 px-6 z-50">
          <NavItem icon={<Map size={22} />} active />
          <NavItem icon={<Compass size={22} />} />
          <NavItem icon={<Plane size={22} />} />
          <NavItem icon={<Hotel size={22} />} />
          <NavItem icon={<Calendar size={22} />} />
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label }) => (
   <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all text-sm w-full text-left group">
      <span className="group-hover:text-purple-400 transition-colors bg-transparent min-w-[16px]">{icon}</span>
      <span className="truncate">{label}</span>
   </button>
);

const NavItem = ({ icon, active }) => (
  <button className={`p-3 rounded-xl transition-all duration-200 hover:bg-white/10 ${active ? 'text-white bg-white/5' : 'text-zinc-500 hover:text-zinc-300'}`}>
    {icon}
  </button>
);

export default Sidebar;

