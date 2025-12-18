import Header from './components/Header';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
       {/* Use a simplified background or the same one but maybe less intense for the main content area? 
           For now, let's just stick to a clean background for the home page content or reuse the verify subtle parts of NatureAnimatedBackground if possible, 
           but the user asked for a home page so standard layout is implied. 
           However, I'll wrap it to keep the theme consistent if needed, but usually dashboard pages have their own background.
       */}
       <Header />
       
       <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Left Sidebar (Placeholder) */}
             <div className="hidden md:block space-y-6">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-white/5 h-64">
                   <h3 className="font-bold text-lg mb-4">Shortcuts</h3>
                   {/* ... */}
                </div>
             </div>

             {/* Main Feed (Placeholder) */}
             <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-white/5">
                   <h2 className="text-2xl font-bold mb-2">Welcome to Ghurnibook</h2>
                   <p className="text-gray-500 dark:text-gray-400">Start exploring the world around you.</p>
                </div>
                
                 {/* Post Placeholder */}
                 {[1, 2].map((i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-white/5 h-96">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800"></div>
                          <div>
                             <div className="w-32 h-4 bg-gray-200 dark:bg-zinc-800 rounded mb-1"></div>
                             <div className="w-20 h-3 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                          </div>
                       </div>
                       <div className="w-full h-64 bg-gray-100 dark:bg-zinc-800 rounded-xl mb-4"></div>
                       <div className="flex gap-4">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
                          <div className="w-8 h-8 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
                       </div>
                    </div>
                 ))}
             </div>
          </div>
       </main>
    </div>
  );
};

export default HomePage;
