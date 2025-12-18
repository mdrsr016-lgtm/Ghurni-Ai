import React, { useState, useEffect } from 'react';
import './NatureAnimatedBackground.css';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';
import FAQModal from './FAQModal';

const lightGradients = [
    'linear-gradient(135deg, #f7fdf7 0%, #eefbf1 33%, #dff6e5 66%, #ccedda 100%)',
    'linear-gradient(135deg, #eefbf1 0%, #dff6e5 25%, #ccedda 50%, #b8e2c7 75%, #a4d8b4 100%)',
    'linear-gradient(135deg, #dff6e5 0%, #ccedda 25%, #b8e2c7 50%, #a4d8b4 75%, #90cfa2 100%)',
    'linear-gradient(135deg, #ccedda 0%, #b8e2c7 25%, #a4d8b4 50%, #90cfa2 75%, #7cc58f 100%)',
    'linear-gradient(135deg, #b8e2c7 0%, #a4d8b4 25%, #90cfa2 50%, #7cc58f 75%, #88c998 100%)',
    'linear-gradient(135deg, #a4d8b4 0%, #90cfa2 25%, #7cc58f 50%, #88c998 75%, #e0f2f1 100%)',
    'linear-gradient(135deg, #90cfa2 0%, #7cc58f 25%, #88c998 50%, #e0f2f1 75%, #eefbf1 100%)',
    'linear-gradient(135deg, #7cc58f 0%, #88c998 25%, #e0f2f1 50%, #eefbf1 75%, #f7fdf7 100%)'
];

const darkGradients = [
    'linear-gradient(135deg, #020704 0%, #040905 33%, #060c07 66%, #081009 100%)',
    'linear-gradient(135deg, #040905 0%, #060c07 25%, #081009 50%, #0a130b 75%, #0c160e 100%)',
    'linear-gradient(135deg, #060c07 0%, #081009 25%, #0a130b 50%, #0c160e 75%, #0e1911 100%)',
    'linear-gradient(135deg, #081009 0%, #0a130b 25%, #0c160e 50%, #0e1911 75%, #101c13 100%)',
    'linear-gradient(135deg, #0a130b 0%, #0c160e 25%, #0e1911 50%, #101c13 75%, #0d1712 100%)',
    'linear-gradient(135deg, #0c160e 0%, #0e1911 25%, #101c13 50%, #0d1712 75%, #060b06 100%)',
    'linear-gradient(135deg, #0e1911 0%, #101c13 25%, #0d1712 50%, #060b06 75%, #040905 100%)',
    'linear-gradient(135deg, #101c13 0%, #0d1712 25%, #060b06 50%, #040905 75%, #020704 100%)'
];

export default function NatureAnimatedBackground({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [isFaqOpen, setIsFaqOpen] = useState(false);
    const { language } = useLanguage();
    const t = translations[language];
    
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const isLight = theme === 'light';
    const gradients = isLight ? lightGradients : darkGradients;

    // Computed Styles based on theme
    const containerStyle = {
        background: isLight ? '#f7fdf7' : '#000',
    };
    
    // Gradient layers styles need to be dynamic for background image
    const getLayerStyle = (index) => ({
        background: gradients[index],
        filter: isLight ? 'saturate(1) brightness(1.1)' : 'saturate(1.1) brightness(1.05)',
    });

    const gradientContainerStyle = {
        filter: isLight ? 'blur(80px)' : 'blur(120px)',
    };

    // h1Style and pStyle removed to use CSS defaults for consistency
    
    const accentLineStyle = {
        background: isLight 
            ? 'linear-gradient(90deg, transparent, #66BB6A, transparent)' 
            : 'linear-gradient(90deg, transparent, #1B5E20, transparent)',
    };

    const themeToggleStyle = {
        background: isLight ? 'rgba(200, 230, 201, 0.8)' : 'rgba(23, 42, 37, 0.4)',
        borderColor: isLight ? 'rgba(165, 214, 167, 0.5)' : 'rgba(76, 175, 80, 0.1)',
    };

    // Orb styles
    const orb1Style = {
        background: isLight 
            ? 'radial-gradient(circle at 30% 30%, rgba(76, 175, 80, 0.7), rgba(240, 248, 240, 0.1))'
            : 'radial-gradient(circle at 30% 30%, rgba(27, 47, 42, 0.4), rgba(0, 4, 1, 0.05))',
    };
    const orb2Style = {
        background: isLight
            ? 'radial-gradient(circle at 30% 30%, rgba(129, 199, 132, 0.7), rgba(240, 248, 240, 0.1))'
            : 'radial-gradient(circle at 30% 30%, rgba(20, 35, 30, 0.35), rgba(0, 4, 1, 0.05))',
    };
    const orb3Style = {
        background: isLight
            ? 'radial-gradient(circle at 30% 30%, rgba(165, 214, 167, 0.6), rgba(240, 248, 240, 0.1))'
            : 'radial-gradient(circle at 30% 30%, rgba(15, 29, 24, 0.3), rgba(0, 4, 1, 0.05))',
    };

    return (
        <div className="nature-bg-container flex flex-col md:justify-center md:items-center" style={containerStyle}>
             <div className="gradient-container" style={gradientContainerStyle}>
                {gradients.map((_, index) => (
                    <div 
                        key={index} 
                        className={`gradient-layer gradient-layer-${index + 1}`}
                        style={getLayerStyle(index)}
                    ></div>
                ))}
            </div>

            <div className="orb-wrapper">
                <div className="floating-orb orb-1" style={orb1Style}></div>
                <div className="floating-orb orb-2" style={orb2Style}></div>
                <div className="floating-orb orb-3" style={orb3Style}></div>
            </div>

            {/* Mobile Hero Image */}
            <div 
                className="absolute top-0 left-0 w-full h-[55vh] md:hidden z-[5]"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
                }}
            >
                <img 
                    src="/nature-sidebar.png" 
                    alt="Nature Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-[14%] sm:bottom-[16%] left-6 right-6 sm:left-8 sm:right-8 z-20 text-white">
                    <div className="w-6 sm:w-8 h-0.5 bg-turf-green-500 mb-2 sm:mb-4 rounded-full"></div>
                    <p className="text-sm sm:text-lg font-light italic leading-relaxed opacity-90">{t.quote}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold mt-2 sm:mt-3 tracking-widest uppercase opacity-75">{t.quoteAuthor}</p>
                </div>
            </div>

            <div className="relative z-10 w-full flex justify-center items-start md:items-center px-0 md:px-4 pt-[50vh] md:pt-0 pb-0 md:pb-0">
            {children || (
                <>
                    <div className="content">
                        <h1>Nature's Harmony</h1>
                        <p>Experience the seamless flow of professional design, anchored in deep, fluid gradients that constantly adapt to the environment.</p>
                    </div>
                    <div className="accent-line" style={accentLineStyle}></div>
                </>
            )}
            </div>
            
            <ThemeToggle theme={theme} toggleTheme={setTheme} onFaqClick={() => setIsFaqOpen(true)} />
            <FAQModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
        </div>
    );
}

// Add children to prop validation if needed, for now just destructuring
// But I need to update the function signature
