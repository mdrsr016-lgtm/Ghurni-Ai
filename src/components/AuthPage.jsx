import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Github, Facebook, Linkedin, Moon, Sun, Twitter, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

// Shared Spring Transition for professional smoothness (Card Sliding)
const transitionSpring = {
  type: "spring",
  stiffness: 85,
  damping: 20, // Increased damping for less bounce, more glide
  mass: 1
};

// Google Logo SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
    </g>
  </svg>
);

// Professional Social Login Button ("Pill" Style)
const SocialLoginButton = ({ icon: Icon, label, onClick, isDarkMode, isGoogle = false }) => (
  <button 
    type="button"
    onClick={onClick}
    className={clsx(
      "w-full relative flex items-center justify-center gap-3 py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md font-medium text-sm group",
      isGoogle 
        ? (isDarkMode ? "bg-white text-gray-800 hover:bg-gray-50" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50")
        : (isDarkMode ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" : "bg-white/60 border border-white/40 text-gray-800 hover:bg-white/80")
    )}
  >
    <div className="absolute left-4">
      {isGoogle ? <GoogleIcon /> : <Icon size={20} className={clsx("transition-transform group-hover:scale-110", isGoogle ? "" : (isDarkMode ? "text-white" : "text-gray-700"))} />}
    </div>
    <span>{label}</span>
  </button>
);

// Small Circular Social Icon Button
const SocialIconButton = ({ icon: Icon, onClick, isDarkMode, isGoogle = false }) => (
  <button 
    type="button"
    onClick={onClick}
    className={clsx(
      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-sm",
      isDarkMode 
        ? "bg-white/10 border border-white/20 hover:bg-white/20" 
        : "bg-white border border-gray-200 hover:bg-gray-50"
    )}
  >
    {isGoogle ? <GoogleIcon /> : <Icon size={20} className={isDarkMode ? "text-white" : "text-gray-700"} />}
  </button>
);

const InputField = ({ icon: Icon, type, placeholder, isDarkMode }) => (
  <div className="relative w-full mb-4">
    <div className={clsx(
      "absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-300",
      isDarkMode ? "text-gray-400" : "text-gray-500"
    )}>
      <Icon size={18} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className={clsx(
        "w-full rounded-xl py-3.5 pl-12 pr-4 text-sm transition-all duration-300 outline-none",
        isDarkMode 
          ? "bg-white/5 border-2 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/10" 
          : "bg-white/80 border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white"
      )}
    />
  </div>
);

// Brand Logo Component
const BrandLogo = ({ isDarkMode }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <img 
        src="/logo.svg" 
        alt="Ghurni Ai Logo" 
        className="w-full h-full object-contain transition-all duration-700"
        style={{ filter: 'invert(13%) sepia(99%) saturate(4574%) hue-rotate(226deg) brightness(94%) contrast(115%)' }}
      />
    </div>
    <span className={clsx(
        "text-2xl font-bold tracking-wide transition-colors duration-700 font-caviler", 
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
          className="absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-8 text-center"
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
            <motion.span variants={itemVariants} className={clsx("text-base mb-1 font-medium tracking-wide transition-colors duration-700 font-caviler", isDarkMode ? "text-gray-200" : "text-gray-600")}>
              Welcome!
            </motion.span>
            <motion.h1 variants={itemVariants} className={clsx("font-bold text-2xl mb-4 tracking-tight drop-shadow-sm transition-colors duration-700", isDarkMode ? "text-white" : "text-gray-900")}>
              Create Account
            </motion.h1>
            <motion.div variants={itemVariants} className="flex flex-col gap-2 w-full mb-4 max-w-[280px]">
              <SocialLoginButton icon={GoogleIcon} label="Continue with Google" isGoogle isDarkMode={isDarkMode} />
              <SocialLoginButton icon={Facebook} label="Continue with Facebook" isDarkMode={isDarkMode} />
              <SocialLoginButton icon={Twitter} label="Continue with X" isDarkMode={isDarkMode} />
            </motion.div>
            <motion.span variants={itemVariants} className={clsx("text-xs mb-3 font-medium transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-700")}>
              or use your email for registration
            </motion.span>
            
            <div className="w-full max-w-sm space-y-0">
              <motion.div variants={itemVariants}><InputField icon={User} type="text" placeholder="Name" isDarkMode={isDarkMode} /></motion.div>
              <motion.div variants={itemVariants}><InputField icon={Mail} type="email" placeholder="Email" isDarkMode={isDarkMode} /></motion.div>
              <motion.div variants={itemVariants}><InputField icon={Lock} type="password" placeholder="Password" isDarkMode={isDarkMode} /></motion.div>
            </div>
            
            {/* Old Type Main Button */}
            <motion.button variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-purple-600 text-white font-bold py-2.5 px-8 rounded-full uppercase tracking-wider text-xs shadow-lg hover:bg-purple-700 active:scale-95 transition-transform mt-4">
              Sign Up
            </motion.button>
            <motion.div variants={itemVariants} className="mt-5 flex flex-col items-center">
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
          className="absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-8 text-center"
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
            className="w-full flex flex-col items-center h-full justify-center max-w-sm" 
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Logo + Text */}
            <motion.div variants={itemVariants}><BrandLogo isDarkMode={isDarkMode} /></motion.div>
            
            {/* Welcome Message */}
            <motion.p variants={itemVariants} className={clsx("text-center text-sm leading-relaxed mb-4 transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-600")}>
              Enter your email and password to securely access<br/>your account and manage your services.
            </motion.p>
            
            {/* Title */}
            <motion.h1 variants={itemVariants} className={clsx("font-bold text-3xl mb-5 tracking-tight transition-colors duration-700", isDarkMode ? "text-white" : "text-gray-900")}>
              Sign In
            </motion.h1>
            
            {/* Username/Email Input */}
            <motion.div variants={itemVariants} className="w-full">
              <InputField icon={Mail} type="email" placeholder="Email address" isDarkMode={isDarkMode} />
            </motion.div>
            
            {/* Password Input with Eye Icon */}
            <motion.div variants={itemVariants} className="w-full relative">
              <InputField icon={Lock} type="password" placeholder="Password" isDarkMode={isDarkMode} />
            </motion.div>
            
            {/* Remember Me Checkbox + Forgot Password */}
            <motion.div variants={itemVariants} className="w-full flex items-center justify-between mb-5">
              <label className={clsx("flex items-center gap-2 text-sm cursor-pointer transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                Remember me
              </label>
              <a href="#" className={clsx("text-sm transition-colors duration-700 hover:underline font-medium", isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700")}>
                Forgot Password
              </a>
            </motion.div>
            
            {/* Login Button */}
            <motion.button 
              variants={itemVariants} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3.5 rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
            >
              Login
            </motion.button>
            
            {/* Don't have an account */}
            <motion.div variants={itemVariants} className="flex items-center gap-1.5 mb-5">
              <span className={clsx("text-sm transition-colors duration-700", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                Don't have an account?
              </span>
              <button 
                type="button" 
                onClick={() => setIsSignUp(true)} 
                className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors underline-offset-2 hover:underline"
              >
                Sign Up here
              </button>
            </motion.div>
            
            {/* OR Divider */}
            <motion.div variants={itemVariants} className="w-full flex items-center gap-4 mb-5">
              <div className={clsx("flex-1 h-px transition-colors duration-700", isDarkMode ? "bg-white/10" : "bg-gray-200")}></div>
              <span className={clsx("text-sm font-medium transition-colors duration-700", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                Or Continue With
              </span>
              <div className={clsx("flex-1 h-px transition-colors duration-700", isDarkMode ? "bg-white/10" : "bg-gray-200")}></div>
            </motion.div>
            
            {/* Social Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <SocialIconButton icon={Facebook} isDarkMode={isDarkMode} />
              <SocialIconButton icon={GoogleIcon} isGoogle isDarkMode={isDarkMode} />
              <SocialIconButton icon={Linkedin} isDarkMode={isDarkMode} />
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
