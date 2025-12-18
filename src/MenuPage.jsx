import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, HelpCircle, Moon, MessageSquareWarning, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const MenuPage = () => {
  const navigate = useNavigate();

  return (
      <div className="w-full">
        <div className="container mx-auto px-4 py-6 md:hidden">
          {/* Header Area */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10"
            >
              <ChevronLeft className="text-gray-900 dark:text-white" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Menu</h1>
          </div>

          {/* Profile Card */}
          <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl rounded-2xl p-4 border border-white/50 dark:border-white/10 shadow-xl mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-turf-green-500 to-emerald-500 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                   <User className="w-10 h-10 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rashid Shahriyar</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">See your profile</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
             <MenuSectionItem icon={Settings} label="Settings & privacy" />
             <MenuSectionItem icon={HelpCircle} label="Help & support" />
             <MenuSectionItem icon={Moon} label="Display & accessibility" />
             <MenuSectionItem icon={MessageSquareWarning} label="Give feedback" subtext="CTRL B" />
             <MenuSectionItem icon={LogOut} label="Log out" isDestructive />
          </div>

          {/* Footer stuff */}
          <div className="mt-8 text-center text-[13px] text-gray-500 font-medium space-y-2 opacity-70">
            <div className="flex justify-center gap-2">
               <span>Privacy</span> · <span>Terms</span> · <span>Advertising</span>
            </div>
            <div>Ghurnibook © 2025</div>
          </div>
        </div>

        {/* Desktop placeholder message just in case */}
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-500 h-64">
           Please use the mobile view or profile dropdown in header.
        </div>
      </div>
  );
};

const MenuSectionItem = ({ icon: Icon, label, subtext, isDestructive }) => (
  <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-white/10 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-500/10 text-red-500' : 'bg-turf-green-500/10 text-turf-green-600 dark:text-turf-green-400'}`}>
        <Icon size={22} />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold ${isDestructive ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{label}</span>
        {subtext && <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{subtext}</span>}
      </div>
    </div>
    <ChevronRight size={20} className="text-gray-400" />
  </div>
);

export default MenuPage;
