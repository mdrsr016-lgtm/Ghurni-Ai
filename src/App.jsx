import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Card from './components/Card'
import BottomBar from './components/BottomBar'
import { Download } from 'lucide-react'

function App() {
  const cards = [
    {
      title: 'Relaxation',
      highlight: 'Maldives',
      description: 'Crystal clear waters, overwater bungalows, and golden sunsets for the ultimate escape.',
      gradient: 'bg-gradient-to-br from-orange-400 to-purple-600',
    },
    {
      title: 'Adventure',
      highlight: 'Himalayas',
      description: 'Snow-capped peaks, rugged trails, and breathtaking views for the thrill seeker.',
      gradient: 'bg-gradient-to-br from-blue-500 to-teal-400',
    },
    {
      title: 'Urban',
      highlight: 'Tokyo',
      description: 'Neon lights, bustling streets, and futuristic vibes in the heart of the metropolis.',
      gradient: 'bg-gradient-to-br from-fuchsia-500 to-cyan-500',
    }
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-white flex select-none overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-900/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <Sidebar />
      
      <main className="flex-1 md:ml-[70px] md:peer-hover:ml-64 relative min-h-screen flex flex-col z-10 pb-24 md:pb-0 transition-all duration-300">
         {/* Header */}
         <header className="flex items-center justify-between p-4 md:p-8 animate-fade-up">
            <div className="flex items-baseline gap-2">
               {/* Header Text Removed */}
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
               <div className="px-2 md:px-3 py-1 rounded-full bg-[#1e1b4b]/50 border border-[#4c1d95]/50 text-[10px] md:text-xs font-semibold text-[#a78bfa] backdrop-blur-md shadow-lg shadow-purple-900/20">
                  PRO
               </div>
               <button className="flex items-center gap-2 px-3 md:px-5 py-2 rounded-full bg-white text-black text-xs md:text-sm font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10">
                  <Download size={14} className="md:w-4 md:h-4" />
                  <span className="hidden md:inline">Export</span>
               </button>
            </div>
         </header>

         {/* Content Grid */}
         <div className="flex-1 flex items-center justify-center p-4 md:p-8 pb-32 md:pb-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
               {cards.map((card, idx) => (
                 <Card key={idx} {...card} delay={idx * 0.2} />
               ))}
            </div>
         </div>
      </main>

      <BottomBar className="transition-all duration-300 md:ml-[35px] md:peer-hover:ml-[128px]" />
    </div>
  )
}

export default App
