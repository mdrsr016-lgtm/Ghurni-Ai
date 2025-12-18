import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { HelpCircle } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme, onFaqClick }) {
  const isLight = theme === 'light';
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    toggleTheme(isLight ? 'dark' : 'light');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 xl:top-1/2 xl:right-auto xl:left-6 xl:-translate-y-1/2 z-50 flex flex-row xl:flex-col gap-3 sm:gap-4 items-center">
      
      {/* Language Dropdown Container */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsLangOpen(!isLangOpen)}
          className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full grid place-items-center cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all active:scale-95 text-black hover:bg-black/5 dark:hover:bg-white/5 ${isLangOpen ? 'ring-2 ring-white/50' : ''}`}
          aria-label="Language / Region"
        >
          {/* Globe Icon */}
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80"
              fill="currentColor"
          >
              <path d="M8 15H3.5A2.502 2.502 0 0 1 1 12.5v-9A2.502 2.502 0 0 1 3.5 1h9A2.502 2.502 0 0 1 15 3.5V8h-1V3.5A1.502 1.502 0 0 0 12.5 2h-9A1.502 1.502 0 0 0 2 3.5v9A1.502 1.502 0 0 0 3.5 14H8zm-.038-4.811a9.77 9.77 0 0 1-3.766 1.796l-.242-.97a8.816 8.816 0 0 0 3.282-1.532A9.264 9.264 0 0 1 4.888 5H4V4h3.279l-.544-.544.707-.707L8.692 4H12v1h-.914A9.836 9.836 0 0 1 9.78 8.152a3.853 3.853 0 0 0-1.82 2.037zm.032-1.383A8.167 8.167 0 0 0 10.058 5H5.922a8.18 8.18 0 0 0 2.072 3.806zM23 20.447v-8.894A2.525 2.525 0 0 0 20.484 9h-8.931A2.556 2.556 0 0 0 9 11.553v8.894A2.556 2.556 0 0 0 11.553 23h8.894A2.556 2.556 0 0 0 23 20.447zM20.484 10A1.517 1.517 0 0 1 22 11.516v8.968A1.517 1.517 0 0 1 20.484 22h-8.968A1.517 1.517 0 0 1 10 20.484v-8.968A1.517 1.517 0 0 1 11.516 10zm-2.086 8h-4.796l-1.159 2.23-.886-.46L16 11.215l4.443 8.555-.886.46zm-.52-1L16 13.385 14.122 17z"/>
              <path fill="none" d="M0 0h24v24H0z"/>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isLangOpen && (
          <div className="absolute top-full right-0 xl:top-0 xl:left-full xl:ml-4 mt-3 md:mt-4 xl:mt-0 w-40 p-2 rounded-2xl bg-white/20 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-xl flex flex-col gap-1 z-[60] origin-top-right xl:origin-top-left animate-in fade-in slide-in-from-top-2">
            <button 
              onClick={() => selectLanguage('English')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${language === 'English' ? 'bg-white/30 dark:bg-white/10 text-black dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/5'}`}
            >
              <span className="text-lg">🇺🇸</span>
              <span>English</span>
              {language === 'English' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-turf-green-500"></span>}
            </button>
            <button 
              onClick={() => selectLanguage('Bangla')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${language === 'Bangla' ? 'bg-white/30 dark:bg-white/10 text-black dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/5'}`}
            >
              <span className="text-lg">🇧🇩</span>
              <span>Bangla</span>
              {language === 'Bangla' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-turf-green-500"></span>}
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onFaqClick}
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full grid place-items-center cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-transform active:scale-95 text-black hover:bg-black/5 dark:hover:bg-white/5"
        aria-label="FAQ"
      >
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80" />
      </button>

      <button
        onClick={handleToggle}
        className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full grid place-items-center cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-transform active:scale-95"
        style={{  lineHeight: 1 }}
        aria-label="Toggle theme"
      >
        {/* Moon Icon */}
        <div 
            className="icon"
            style={{
                gridColumn: '1 / 1',
                gridRow: '1 / 1',
                transition: 'transform 500ms',
                transitionDelay: isLight ? '0ms' : '200ms', // Delay when appearing (becoming dark)
                transform: isLight ? 'rotate(360deg) scale(0)' : 'rotate(0deg) scale(1)', // Rotate out when light
                color: '#000000'
            }}
        >
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            <path d="M19 3v4" />
            <path d="M21 5h-4" />
            </svg>
        </div>

        {/* Sun Icon */}
        <div 
            className="icon"
            style={{
                gridColumn: '1 / 1',
                gridRow: '1 / 1',
                transition: 'transform 500ms',
                transitionDelay: isLight ? '200ms' : '0ms', // Delay when appearing (becoming light)
                transform: isLight ? 'scale(1) rotate(360deg)' : 'scale(0) rotate(0deg)',
                color: '#f59e0b'
            }}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 sm:w-8 sm:h-8"
            >
            <path
                d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
            ></path>
            </svg>
        </div>
      </button>
    </div>
  );
}
