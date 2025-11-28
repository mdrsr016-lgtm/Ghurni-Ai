import React, { useState } from 'react';
import { Plus, Search, Home, Folder, Clock, Settings, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`
        hidden md:flex
        bg-white h-full border-r border-gray-200 flex-col py-6 shadow-sm z-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isExpanded ? 'w-72 px-5' : 'w-20 px-0 items-center'} 
      `}
    >
      {/* Logo & Toggle Section */}
      <div className={`flex items-center mb-8 shrink-0 ${isExpanded ? 'justify-between w-full' : 'flex-col gap-4'}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 overflow-hidden group">
          <div className="w-10 h-10 flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3200 3200" className="w-full h-full fill-current text-gray-900">
              <path d="M1671.79 1880.79c-9.69-13.24-21.85-26.4-30.37-40.01-57.74-92.22-15.88-219.75 70.48-278.48 29.58-20.11 59.68-36.49 90.93-53.75 46.18-25.17 92.15-50.73 137.91-76.66a7593 7593 0 0 0 171.35-101.81c32.08-19.34 64.12-39.22 96.86-57.35 9.35-5.18 34.11-18.72 44.7-16.56 21.16 4.3 22.63 28.25 22.64 45.41.05 95.29-2.48 190.61-3.36 285.9-.29 87.78 3.09 175.85 2.53 263.68-.19 30.37-.17 61.75-8.19 91.19-19.41 71.56-87.6 103.07-147.03 136.33l-119.15 67.26-191.32 111.6c-51.01 29.98-151.32 96.84-210.51 98.06-52.65 1.09-136.56-55.04-182.51-80.67-54.61-31.33-105.7-64.39-159.18-95.03l-157.24-88.14c-178.802-100.13-179.712-105.57-177.866-308.37l1.013-168.53-.502-192.46c-.339-48.99-2.983-102.3 3.511-150.61 5.308-39.48 30.84-76.98 62.854-99.75 49.5-34.67 105.26-63.31 157.98-93 85.53-48.28 170.73-97.147 255.61-146.585l383.65-225.924c98.82-59.188 196.24-120.792 298.42-174.009 55.86-29.096 121.96-57.877 186.07-57.635 103.8 1.484 202.49 63.68 291.22 112.462 103.18 56.724 212.59 113.427 301.59 190.443 64.78 56.057 87.78 151.111 91.07 233.228 2.99 74.52 1.34 150.54.15 225.16-2.4 116.41-3.72 232.84-3.94 349.27-.34 103.32.57 206.63 2.71 309.93 2.1 86.04 6.18 174.89 3.53 260.79-1.28 41.67-8.5 105.6-20.05 144.92-15.12 51.5-52.71 103.4-94.82 136.67-76.89 60.77-167 108-252.28 155.87-88.85 49.86-179.85 98.62-268.02 149.15a10492 10492 0 0 0-263.59 155.14c-91.38 55.48-182.9 112.64-277.51 162.08-86.63 45.27-169.98 72.83-266.45 41.16-107.98-35.46-197.43-97.58-294.95-154.38-108.06-65.17-212.86-128.23-322.356-191.17-80.468-46-161.335-91.29-242.59-135.89-92.485-50.2-187.436-101.41-273.901-161.57-42.428-29.52-77.498-65.66-101.453-111.79-25.52-49.14-34.236-118.83-37.291-174.47-3.897-70.96-1.844-150.5.229-221.79a8532 8532 0 0 0 4.702-236.08c.527-99.24.215-198.49-.936-297.74-1.875-67.13-3.322-134.29-4.344-201.44-1.735-87.77-5.812-238.259 20.262-319.338a287.24 287.24 0 0 1 93.501-136.396c33.659-27.536 76.796-54.431 114.04-76.996a4263 4263 0 0 1 173.208-98.498 21142 21142 0 0 0 268.061-149.6 22860 22860 0 0 0 293.188-174.208c72.31-43.588 140.58-84.526 215.13-124.099 170.61-90.567 268.09-53.505 424.51 35.467a7171 7171 0 0 1 158.03 93.035c23.91 14.368 50.71 31.504 74.75 44.999-.17.853-.97 2.771-1.31 3.67-6.34-.242-19.76-6.374-26.8-9.234-22.79-9.253-85.93-12.745-106.19 2.013-66.53 20.352-135.81 62.647-195.49 98.441l-139.94 84.037-444.33 263.213c-134.39 78.454-273.163 146.968-404.6 231.268-131.318 84.226-116.31 207.156-114.734 343.596l2.147 218.09c.313 81.74-.124 163.48-1.31 245.21-.993 80.78-9.159 229.5 14.116 303.35 12.849 40.76 37.668 72.83 70.447 99.79 50.428 41.48 111.394 72.68 168.17 104.61l240.734 134.53c64.33 36.55 127.47 76.73 191.64 113.77 44.53 25.71 87.4 54.53 133.77 77.27 69.64 34.55 125.27 57.44 202.12 31.19 65.02-22.21 116.91-56.82 175.39-90.72 72.54-42.05 144.16-87.67 216.49-129.26l229.93-129.36c55.35-30.9 113.52-62.35 165.27-98.75 32.69-23 57.56-45.19 75.47-81.33 16.13-32.56 21.69-57.37 24.54-93.64 5.25-66.65 3.2-132.92 2.25-199.64l-2.42-246.17c.27-78.39.96-156.78 2.07-235.16 1.18-78.78 7.77-173.24-15.08-249-17.53-58.16-71.69-107.94-125.1-133.078-64.56-30.2-116.77-42.71-184.79-17.356-66.43 24.761-126.07 61.194-186.34 97.634-61.11 37.31-122.56 74.07-184.34 110.27a18928 18928 0 0 1-222.04 125.61c-66.77 36.95-132.86 72.45-195.32 116.93-76.37 52.52-119.43 165.42-86.89 253.78 31.82 86.41 137.67 133.07 214.05 172.94 28.5 14.87 60.39 33.46 89.19 46.75 4.8 2.22 9.65 4.33 14.55 6.32"/>
            </svg>
          </div>
          <span className={`font-bold text-lg tracking-tight text-gray-900 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4 pointer-events-none'}`}>
             Ghurni Ai
          </span>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors
            ${!isExpanded ? 'mt-0' : ''}
          `}
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Main Nav (Scrollable) */}
      <div className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col gap-6 w-full pb-6">
            {/* New Chat Action */}
            <button 
                className={`
                    flex items-center gap-3 p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-300
                    ${isExpanded ? 'mx-0 justify-start' : 'mx-3 justify-center'}
                `}
                title={!isExpanded ? "New Chat" : ""}
            >
            <Plus size={20} className="shrink-0" />
            <span 
                className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'}`}
            >
                New Chat
            </span>
            </button>
            
            <div className="flex flex-col gap-2 mt-2 w-full">
                {/* Nav Items */}
                {[
                { icon: Search, label: 'Search', active: false },
                { icon: Home, label: 'Home', active: true },
                { icon: Folder, label: 'Projects', active: false },
                { icon: Clock, label: 'History', active: false },
                ].map((item) => (
                <button 
                    key={item.label}
                    className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative group
                    ${item.active ? 'text-gray-900 bg-purple-50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}
                    ${isExpanded ? 'mx-0 justify-start' : 'mx-3 justify-center'}
                    `} 
                    title={!isExpanded ? item.label : ""}
                >
                    <item.icon size={20} className={`shrink-0 ${item.active ? 'text-purple-600' : ''}`} />
                    
                    <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'} ${item.active ? 'text-purple-900' : ''}`}>
                        {item.label}
                    </span>

                    {!isExpanded && item.active && (
                    <span className="absolute right-2 top-2 w-2 h-2 bg-purple-500 rounded-full animate-scale-in"></span>
                    )}
                    {isExpanded && item.active && (
                    <span className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full animate-scale-in"></span>
                    )}
                </button>
                ))}
            </div>
          </div>
      </div>

      {/* Footer Nav */}
      <div className="mt-auto flex flex-col gap-2 w-full shrink-0 pt-4 border-t border-gray-50">
        <button 
          className={`flex items-center gap-3 p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 ${isExpanded ? 'mx-0 justify-start' : 'mx-3 justify-center'} group`} 
          title={!isExpanded ? "Settings" : ""}
        >
             <Settings size={20} className="shrink-0 group-hover:rotate-45 transition-transform duration-500" />
             <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'}`}>
                Settings
             </span>
        </button>

        <button 
          onClick={onLogout}
          className={`flex items-center gap-3 p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 ${isExpanded ? 'mx-0 justify-start' : 'mx-3 justify-center'}`}
          title={!isExpanded ? "Logout" : ""}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'}`}>
            Logout
          </span>
        </button>
        
        <div className={`flex items-center gap-3 mt-4 border-t border-gray-100 pt-4 transition-all duration-500 ${isExpanded ? 'mx-0 justify-start' : 'mx-3 justify-center border-none'}`}>
           <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer shrink-0 hover:scale-105 transition-transform duration-300">
               <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
           </div>
           
           <div className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'w-auto opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'}`}>
               <span className="text-sm font-bold text-gray-900">John Doe</span>
               <span className="text-xs text-gray-500">Pro Member</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;