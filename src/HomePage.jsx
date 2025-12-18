const HomePage = () => {
  return (
    <div className="w-full">
       <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Left Sidebar */}
             <div className="hidden md:block space-y-6">
                <div className="glass-card rounded-3xl p-6 min-h-64">
                   <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Shortcuts</h3>
                   <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 group cursor-pointer hover:translate-x-1 transition-all">
                           <div className="w-8 h-8 rounded-lg bg-turf-green-500/10 flex items-center justify-center">
                              <div className="w-4 h-4 bg-turf-green-500/40 rounded-sm"></div>
                           </div>
                           <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-turf-green-600 dark:group-hover:text-turf-green-400">Shortcut Item {i}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Main Feed */}
             <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="glass-card rounded-3xl p-8">
                   <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-turf-green-600 to-emerald-600 dark:from-turf-green-400 dark:to-emerald-400">
                     Welcome back, Rashid
                   </h2>
                   <p className="text-gray-600 dark:text-zinc-400 text-lg">Start exploring the world around you with Ghurnibook.</p>
                </div>
                
                {/* Post Placeholder */}
                {[1, 2].map((i) => (
                   <div key={i} className="glass-card rounded-3xl p-6 overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-turf-green-500 to-emerald-500 p-0.5">
                              <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center">
                                 <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse"></div>
                              </div>
                           </div>
                           <div>
                              <div className="w-32 h-4 bg-gray-200/50 dark:bg-zinc-800/50 rounded-full mb-2"></div>
                              <div className="w-20 h-3 bg-gray-100/50 dark:bg-zinc-900/50 rounded-full"></div>
                           </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-900/50 flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                           <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                           <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                           <div className="w-1 h-1 rounded-full bg-gray-400 mx-0.5"></div>
                        </div>
                      </div>
                      
                      <div className="w-full h-80 bg-gray-100/50 dark:bg-zinc-900/30 rounded-2xl mb-6 relative overflow-hidden group/img">
                         <div className="absolute inset-0 bg-gradient-to-br from-turf-green-500/5 to-emerald-500/5"></div>
                         <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium text-sm">Post Content Placeholder</div>
                      </div>
                      
                      <div className="flex items-center justify-between px-2">
                        <div className="flex gap-6">
                           <div className="flex items-center gap-2 cursor-pointer group/action">
                              <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900/40 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                 <div className="w-5 h-5 border-2 border-gray-400 dark:border-zinc-600 rounded-full"></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-500 dark:text-zinc-500">24</span>
                           </div>
                           <div className="flex items-center gap-2 cursor-pointer group/action">
                              <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900/40 flex items-center justify-center hover:bg-turf-green-50 dark:hover:bg-turf-green-500/10 transition-colors">
                                 <div className="w-5 h-5 border-2 border-gray-400 dark:border-zinc-600 rounded-full"></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-500 dark:text-zinc-500">12</span>
                           </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900/40 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer">
                           <div className="w-5 h-5 border-2 border-gray-400 dark:border-zinc-600 rounded-full"></div>
                        </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default HomePage;
