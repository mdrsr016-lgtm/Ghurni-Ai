import React from 'react';

const Card = ({ title, highlight, description, gradient, delay }) => {
  return (
    <div 
      className="relative group p-[1px] rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] animate-fade-up hover:shadow-2xl hover:shadow-purple-500/20"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl pointer-events-none group-hover:from-white/20 group-hover:via-purple-500/10 transition-colors duration-500" />
      
      {/* Internal Shine */}
      <div className="absolute inset-0 shine-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative bg-[#ffffff05] rounded-3xl p-6 h-full flex flex-col items-start gap-4 border border-white/5 group-hover:border-white/10 transition-colors">
        {/* Icon / Image Placeholder */}
        <div className={`w-20 h-20 rounded-2xl mb-2 flex items-center justify-center shadow-lg ${gradient} group-hover:scale-110 transition-transform duration-500`}>
           {/* Placeholder for now, can be an image later */}
           <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-md shadow-inner" />
        </div>
        
        <div className="flex flex-col gap-1 z-10">
          <h3 className="text-xl text-white/90 font-medium">
            {title} <span className="font-serif italic text-purple-200" style={{ fontFamily: 'var(--font-serif)' }}>{highlight}</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>

        <button className="mt-auto px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium flex items-center gap-2 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 group-hover:text-white">
          Explore <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
