import React, { useState } from 'react';
import { Banknote, Calendar, Users, Plane, ArrowUp } from 'lucide-react';

const BottomBar = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('plan');

  return (
    <div className={`fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 w-[95%] md:w-full max-w-2xl px-0 md:px-4 z-40 animate-fade-up ${className}`} style={{ animationDelay: '0.5s' }}>
      <div className="bg-[#0a0a16]/80 backdrop-blur-2xl border border-white/15 rounded-[1.5rem] md:rounded-[2rem] p-1 shadow-2xl overflow-hidden ring-1 ring-white/5 transition-all hover:border-purple-500/20 hover:shadow-purple-900/10">
        
        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 mb-1 relative overflow-x-auto no-scrollbar">
           <TabButton active={activeTab === 'dest'} onClick={() => setActiveTab('dest')}>DESTINATIONS</TabButton>
           <TabButton active={activeTab === 'plan'} onClick={() => setActiveTab('plan')}>PLAN</TabButton>
           <TabButton active={activeTab === 'surprise'} onClick={() => setActiveTab('surprise')}>SURPRISE ME</TabButton>
        </div>

        {/* Input Area */}
        <div className="bg-[#1a1a2e]/50 rounded-[1.2rem] md:rounded-[1.5rem] p-3 md:p-4 border border-white/5 flex flex-col gap-3 md:gap-4 focus-within:ring-1 focus-within:ring-purple-500/30 transition-all">
           <input 
             type="text" 
             placeholder="Describe your dream vacation..." 
             className="bg-transparent border-none outline-none text-white/90 placeholder-zinc-500 text-base md:text-lg w-full"
           />
           
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto mask-fade-right">
                 <ConfigChip icon={<Banknote size={14} />} label="Budget" />
                 <ConfigChip icon={<Calendar size={14} />} label="Dates" />
                 <ConfigChip icon={<Users size={14} />} label="Group" />
                 <ConfigChip icon={<Plane size={14} />} label="Flight" />
              </div>

              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-all text-white active:scale-95 shrink-0 ml-2">
                 <ArrowUp size={18} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ children, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all ${active ? 'bg-white/10 text-white shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
  >
    {children}
  </button>
);

const ConfigChip = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 text-zinc-400 hover:text-zinc-200 hover:bg-black/40 transition-colors border border-white/5 text-xs font-medium">
    {icon}
    <span>{label}</span>
  </button>
);

export default BottomBar;
