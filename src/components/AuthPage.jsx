import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Github, Facebook, Linkedin, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

// Shared Spring Transition for professional smoothness (Card Sliding)
const transitionSpring = {
  type: "spring",
  stiffness: 85,
  damping: 20, // Increased damping for less bounce, more glide
  mass: 1
};

// Reverted to "Old Type" (Solid, Gray/Purple)
const SocialButton = ({ icon: Icon, href = "#" }) => (
  <a 
    href={href}
    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all duration-700 transform hover:scale-110" // Increased duration
  >
    <Icon size={18} />
  </a>
);

const InputField = ({ icon: Icon, type, placeholder, isDarkMode }) => (
  <div className="relative w-full mb-4">
    <div className={clsx(
      "absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-700", // Smooth color transition
      isDarkMode ? "text-gray-300" : "text-gray-600"
    )}>
      <Icon size={16} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className={clsx(
        "w-full rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-all duration-700 backdrop-blur-sm shadow-inner", // Smooth background transition
        isDarkMode 
          ? "bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:ring-purple-400/50" 
          : "bg-white/40 border border-white/40 text-gray-900 placeholder-gray-600 focus:ring-purple-500/30"
      )}
    />
  </div>
);

// Brand Logo Component
const BrandLogo = ({ isDarkMode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <img 
        src="/logo.svg" 
        alt="Ghurni Ai Logo" 
        className={clsx(
          "w-full h-full object-contain transition-all duration-700",
          !isDarkMode && "invert brightness-0" // Turn white logo to black in Light Mode
        )}
      />
    </div>
    <span className={clsx(
        "text-xl font-bold tracking-tight transition-colors duration-700 font-caviler", 
        isDarkMode ? "text-white" : "text-gray-900"
    )}>
      Ghurni Ai
    </span>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 }, // Less scale/y change for subtlety
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Cubic Bezier for "premium" ease
      staggerChildren: 0.08,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3 // Wait for card to appear
    }
  }
};


const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* 
          SMOOTH BACKGROUND SYSTEM: CROSS-FADE 
      */}
      <div className="absolute inset-0 z-0">
         <div className="gradient-bg gradient-light absolute inset-0" />
         <motion.div 
            className="gradient-bg gradient-dark absolute inset-0"
            initial={false}
            animate={{ opacity: isDarkMode ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }} 
         />
      </div>

      {/* Theme Toggle */}
      <motion.button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className={clsx(
          "absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl shadow-lg z-50 hover:scale-110 transition-all duration-700 border transform",
          isDarkMode ? "bg-black/20 border-white/10" : "bg-white/20 border-white/40"
        )}
      >
        {isDarkMode ? <Sun size={24} className="text-yellow-400 transition-colors duration-700" /> : <Moon size={24} className="text-gray-800 transition-colors duration-700" />}
      </motion.button>

      {/* Main Glass Card Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={clsx(
        "relative rounded-[30px] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden w-full max-w-[900px] min-h-[600px] flex z-10 transition-colors duration-1000 border backdrop-blur-xl", 
        isDarkMode 
          ? "bg-black/30 border-white/10"   // Dark Mode: Smoked Glass
          : "bg-white/30 border-white/40"   // Light Mode: Frosted Ice
      )}>
        
        {/* Sign Up Form Panel */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center"
          initial={false}
          animate={{ 
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 5 : 1,
            opacity: isSignUp ? 1 : 0
          }}
          transition={transitionSpring}
        >
          <motion.form 
            variants={formVariants} 
            className="w-full flex flex-col items-center h-full justify-center" 
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div variants={itemVariants}><BrandLogo isDarkMode={isDarkMode} /></motion.div>
            <motion.h1 variants={itemVariants} className={clsx("font-bold text-3xl mb-6 tracking-tight drop-shadow-sm transition-colors duration-700", isDarkMode ? "text-white" : "text-gray-900")}>
              Create Account
            </motion.h1>
            <motion.div variants={itemVariants} className="flex space-x-4 mb-6">
              {/* Old Type Social Buttons */}
              <SocialButton icon={Github} />
              <SocialButton icon={Facebook} />
              <SocialButton icon={Linkedin} />
            </motion.div>
            <motion.span variants={itemVariants} className={clsx("text-sm mb-6 font-medium transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-700")}>
              or use your email for registration
            </motion.span>
            
            <motion.div variants={itemVariants} className="w-full"><InputField icon={User} type="text" placeholder="Name" isDarkMode={isDarkMode} /></motion.div>
            <motion.div variants={itemVariants} className="w-full"><InputField icon={Mail} type="email" placeholder="Email" isDarkMode={isDarkMode} /></motion.div>
            <motion.div variants={itemVariants} className="w-full"><InputField icon={Lock} type="password" placeholder="Password" isDarkMode={isDarkMode} /></motion.div>
            
            {/* Old Type Main Button */}
            <motion.button variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs shadow-lg hover:bg-purple-700 active:scale-95 transition-transform mt-4">
              Sign Up
            </motion.button>
            <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center">
                <span className={clsx("text-sm mb-2 transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Already have an account?
                </span>
                {/* Old Type Toggle Button */}
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(false)} 
                  className="border border-purple-600 text-purple-600 font-bold py-2 px-8 rounded-full uppercase tracking-wider text-xs hover:bg-purple-50 transition"
                >
                  Sign In
                </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Sign In Form Panel */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center"
          initial={false}
          animate={{ 
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 1 : 5,
            opacity: isSignUp ? 0 : 1
          }}
          transition={transitionSpring}
        >
          <motion.form 
            variants={formVariants}
            className="w-full flex flex-col items-center h-full justify-center" 
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.div variants={itemVariants}><BrandLogo isDarkMode={isDarkMode} /></motion.div>
            <motion.h1 variants={itemVariants} className={clsx("font-bold text-3xl mb-6 tracking-tight drop-shadow-sm transition-colors duration-700", isDarkMode ? "text-white" : "text-gray-900")}>
              Sign in
            </motion.h1>
            <motion.div variants={itemVariants} className="flex space-x-4 mb-6">
              <SocialButton icon={Github} />
              <SocialButton icon={Facebook} />
              <SocialButton icon={Linkedin} />
            </motion.div>
            <motion.span variants={itemVariants} className={clsx("text-sm mb-6 font-medium transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-700")}>
              or use your account
            </motion.span>
            
            <motion.div variants={itemVariants} className="w-full"><InputField icon={Mail} type="email" placeholder="Email" isDarkMode={isDarkMode} /></motion.div>
            <motion.div variants={itemVariants} className="w-full"><InputField icon={Lock} type="password" placeholder="Password" isDarkMode={isDarkMode} /></motion.div>
            
            <motion.a variants={itemVariants} href="#" className={clsx("text-sm mb-8 mt-2 transition-colors duration-700 hover:underline font-medium", isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900")}>
              Forgot your password?
            </motion.a>
            
            {/* Old Type Main Button */}
            <motion.button variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs shadow-lg hover:bg-purple-700 active:scale-95 transition-transform">
              Sign In
            </motion.button>
            <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center">
                <span className={clsx("text-sm mb-2 transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  New here?
                </span>
                {/* Old Type Toggle Button */}
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(true)} 
                  className="border border-purple-600 text-purple-600 font-bold py-2 px-8 rounded-full uppercase tracking-wider text-xs hover:bg-purple-50 transition"
                >
                  Create Account
                </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Overlay Container (Desktop Only) */}
        <motion.div 
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[100] hidden md:block"
          initial={false}
          animate={{ 
            x: isSignUp ? "-100%" : "0%" 
          }}
          transition={transitionSpring}
        >
          {/* Inner Image Container */}
          <motion.div 
             className="relative -left-full h-full w-[200%]"
             initial={false}
             animate={{ 
               x: isSignUp ? "50%" : "0%"
             }}
             transition={transitionSpring} 
             style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2675&auto=format&fit=crop')",
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}
          />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AuthPage;
