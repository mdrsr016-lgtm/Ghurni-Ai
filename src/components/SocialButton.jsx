import React from 'react';

const SocialButton = ({ iconSrc, altText, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-center justify-center w-full h-10 md:h-12 gap-2 md:gap-3 
                 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm
                 border border-gray-200 dark:border-zinc-700 
                 rounded-xl transition-all duration-300 ease-out
                 hover:bg-white dark:hover:bg-zinc-700 
                 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/30
                 hover:-translate-y-0.5 active:scale-[0.98]
                 focus:outline-none focus:ring-2 focus:ring-turf-green-500/30"
      aria-label={`Sign in with ${altText}`}
    >
      <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110">
        <img 
          src={iconSrc} 
          alt={altText} 
          className={`w-full h-full object-contain ${altText === 'Facebook' ? 'scale-110' : ''}`} 
        />
      </div>
      <span className="text-xs md:hidden font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
};

export default SocialButton;
