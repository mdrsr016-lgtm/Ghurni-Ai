import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mail, Lock, User, Github, Facebook, Moon, Sun, Twitter, Eye, EyeOff, Phone, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import AnimatedCheckbox from './AnimatedCheckbox';
import AnimatedButton from './AnimatedButton';
import ForgotPasswordModal from './ForgotPasswordModal';

// Unified Professional Transition Configuration
const professionalTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8,
  // Fallback for tween-based properties if needed, though spring handles most well
  duration: 0.6, 
  ease: [0.22, 1, 0.36, 1] // Custom refined cubic-bezier
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

// Professional Social Login Button ("Pill" Style) - Glassmorphism
const SocialLoginButton = ({ icon: Icon, label, onClick, isDarkMode, isGoogle = false }) => (
  <button 
    type="button"
    onClick={onClick}
    className={clsx(
      "w-full relative flex items-center justify-center gap-3 py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium text-sm group backdrop-blur-md",
      isGoogle 
        ? (isDarkMode ? "bg-white/90 text-gray-800 hover:bg-white shadow-lg border border-white/20" : "bg-white/70 text-gray-700 border border-white/50 hover:bg-white/90 shadow-lg")
        : (isDarkMode ? "bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]" : "bg-white/40 border border-white/60 text-gray-800 hover:bg-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]")
    )}
  >
    <div className="absolute left-4">
      {isGoogle ? <GoogleIcon /> : <Icon size={20} className={clsx("transition-transform group-hover:scale-110", isGoogle ? "" : (isDarkMode ? "text-white" : "text-gray-700"))} />}
    </div>
    <span>{label}</span>
  </button>
);

// Small Circular Social Icon Button - Glassmorphism
const SocialIconButton = ({ iconSrc, onClick, isDarkMode }) => (
  <button 
    type="button"
    onClick={onClick}
    className={clsx(
      "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-md",
      isDarkMode 
        ? "bg-white/10 border border-white/20 hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]" 
        : "bg-white/50 border border-white/60 hover:bg-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
    )}
  >
    <img src={iconSrc} alt="Social Icon" className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
);

const InputField = ({ icon: Icon, type, placeholder, isDarkMode, autoComplete = "off", value, onChange, error, success }) => (
  <div className="w-full mb-3 sm:mb-4 group">
    <div className="relative">
      <div className={clsx(
        "absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-300",
        error ? "text-red-500" : (success ? "text-green-500" : (isDarkMode ? "text-gray-400 group-focus-within:text-turf-green-300" : "text-gray-400 group-focus-within:text-turf-green-600"))
      )}>
        <Icon size={18} className="sm:w-[20px] sm:h-[20px]" />
      </div>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        animate={error ? { x: [-5, 5, -5, 5, 0] } : {}} // Shake on error
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={clsx(
          "w-full rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 text-sm transition-all duration-300 outline-none backdrop-blur-md border",
          error 
            ? (isDarkMode ? "bg-red-500/10 border-red-500 text-red-100 placeholder-red-300" : "bg-red-50 border-red-500 text-red-900 placeholder-red-300")
            : success
              ? (isDarkMode ? "bg-green-500/10 border-green-500 text-green-100" : "bg-green-50 border-green-500 text-green-900")
              : (isDarkMode 
                  ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-turf-green-500/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(47,208,141,0.1)]" 
                  : "bg-white/60 border-white/60 text-gray-900 placeholder-gray-400 focus:border-turf-green-500 focus:bg-white/80 focus:shadow-[0_0_15px_rgba(47,208,141,0.15)]")
        )}
      />
    </div>
    {error && (
      <div 
        className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg bg-red-100 border border-red-200 shadow-sm"
      >
        <AlertCircle size={16} className="text-red-600 shrink-0" />
        <p className="text-red-600 text-xs font-medium text-left">
          {error}
        </p>
      </div>
    )}
  </div>
);

// Password Input Field with Eye Toggle
const PasswordInputField = ({ placeholder, isDarkMode, showPassword, onTogglePassword, autoComplete = "off", value, onChange, error, success }) => (
  <div className="w-full mb-3 sm:mb-4 group">
    <div className="relative">
      <div className={clsx(
        "absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-300",
        error ? "text-red-500" : (success ? "text-green-500" : (isDarkMode ? "text-gray-400 group-focus-within:text-turf-green-300" : "text-gray-400 group-focus-within:text-turf-green-600"))
      )}>
        <Lock size={18} className="sm:w-[20px] sm:h-[20px]" />
      </div>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={clsx(
          "w-full rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-12 sm:pr-14 text-sm transition-all duration-300 outline-none backdrop-blur-md border",
          error 
            ? (isDarkMode ? "bg-red-500/10 border-red-500 text-red-100 placeholder-red-300" : "bg-red-50 border-red-500 text-red-900 placeholder-red-300")
            : success
              ? (isDarkMode ? "bg-green-500/10 border-green-500 text-green-100" : "bg-green-50 border-green-500 text-green-900")
              : (isDarkMode 
                  ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-turf-green-500/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(47,208,141,0.1)]" 
                  : "bg-white/60 border-white/60 text-gray-900 placeholder-gray-400 focus:border-turf-green-500 focus:bg-white/80 focus:shadow-[0_0_15px_rgba(47,208,141,0.15)]")
        )}
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className={clsx(
          "absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 hover:scale-110 transform p-1",
          isDarkMode 
             ? "text-gray-400 hover:text-white" 
             : "text-gray-400 hover:text-gray-600"
        )}
      >
        {showPassword ? <EyeOff size={18} className="sm:w-[20px] sm:h-[20px]" /> : <Eye size={18} className="sm:w-[20px] sm:h-[20px]" />}
      </button>
    </div>
    {error && (
      <div 
        className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg bg-red-100 border border-red-200 shadow-sm"
      >
        <AlertCircle size={16} className="text-red-600 shrink-0" />
        <p className="text-red-600 text-xs font-medium text-left">
          {error}
        </p>
      </div>
    )}
  </div>
);

// Brand Logo Component
// Brand Logo Component - Updated for Shared Layout Transition
const BrandLogo = ({ isDarkMode, layoutId, className }) => (
  <motion.div 
    layoutId={layoutId} 
    className={clsx("flex items-center gap-2 sm:gap-3", className)}
  >
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
      <img 
        src="/logo.svg" 
        alt="Ghurni Ai Logo" 
        className="w-full h-full object-contain transition-all duration-700"
      />
    </div>
    <span className={clsx(
        "text-xl sm:text-2xl font-bold tracking-wide transition-colors duration-700 font-caviler", 
        isDarkMode ? "text-white" : "text-gray-900"
    )}>
      Ghurni Ai
    </span>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      ...professionalTransition,
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
    transition: professionalTransition
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" } // Keep exit fast
  }
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      ...professionalTransition,
      staggerChildren: 0.06,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      ...professionalTransition,
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};


const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); 
  
  // --- Form State ---
  const [signInData, setSignInData] = useState({ email: '', password: '', rememberMe: false });
  const [signUpData, setSignUpData] = useState({ fullName: '', email: '', username: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({}); 

  // --- Validation Logic ---
  // --- Validation Logic ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (name, value, section = 'signUp') => {
      let error = '';
      let isSuccess = false;

      // Email Validation
      if (name === 'email' || name === 'signInEmail') {
          if (!value) error = 'Email address is required';
          else if (!value.includes('@')) error = 'Email must include "@" symbol';
          else if (!validateEmail(value)) error = 'Invalid email domain or format';
          else isSuccess = true;
      }

      // Password Validation
      if (name === 'password' || name === 'signInPassword') {
          if (!value) error = 'Password is required';
          else if (value.length < 6) error = `Password must be at least 6 characters (${value.length}/6)`;
          else isSuccess = true;
      }

      // Full Name (Sign Up only)
      if (name === 'fullName') {
          if (!value) error = 'Full name is required';
          else if (value.trim().split(' ').length < 2) error = 'Please enter your full name (first & last)';
          else isSuccess = true;
      }

      // Username (Sign Up only)
      if (name === 'username') {
          if (!value) error = 'Username is required';
          else if (value.length < 3) error = 'Username must be 3+ characters';
          else isSuccess = true;
      }

      // Update State
      const prefix = section === 'signIn' ? 'signIn' : 'signUp';
      const key = name === 'email' || name === 'password' ? `${prefix}${name.charAt(0).toUpperCase() + name.slice(1)}` : `${prefix}${name.charAt(0).toUpperCase() + name.slice(1)}`;
      
      let stateKey = '';
      if (section === 'signIn') {
          if (name === 'email') stateKey = 'signInEmail';
          if (name === 'password') stateKey = 'signInPassword';
      } else {
          if (name === 'fullName') stateKey = 'signUpFullName';
          if (name === 'email') stateKey = 'signUpEmail';
          if (name === 'username') stateKey = 'signUpUsername';
          if (name === 'password') stateKey = 'signUpPassword';
      }
      
      setErrors(prev => ({ ...prev, [stateKey]: error }));
      setSuccess(prev => ({ ...prev, [stateKey]: isSuccess }));
      
      return !error;
  };

  const handleSignInChange = (field, value) => {
      setSignInData(prev => ({ ...prev, [field]: value }));
      validateField(field, value, 'signIn');
  };

  const handleSignUpChange = (field, value) => {
      setSignUpData(prev => ({ ...prev, [field]: value }));
      validateField(field, value, 'signUp');
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateField('email', signInData.email, 'signIn');
    const isPasswordValid = validateField('password', signInData.password, 'signIn');

    if (isEmailValid && isPasswordValid) {
      alert("Sign In Successful!");
      // Proceed with actual login logic
    }
  };

  const handleSignUpSubmit = () => {
    const isNameValid = validateField('fullName', signUpData.fullName, 'signUp');
    const isEmailValid = validateField('email', signUpData.email, 'signUp');
    const isUserValid = validateField('username', signUpData.username, 'signUp');

    if (isNameValid && isEmailValid && isUserValid) {
      setIsSubmitted(true);
    }
  }; 

  // --- Parallax Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 50, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 15 });

  // Parallax for Background Elements only - Removed 3D Tilt for Card
  const moveX1 = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const moveY1 = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);
  
  const moveX2 = useTransform(mouseX, [-0.5, 0.5], [40, -40]); // Opposite direction
  const moveY2 = useTransform(mouseY, [-0.5, 0.5], [40, -40]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position from -0.5 to 0.5 center
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) - 0.5;
      const normalizedY = (e.clientY / innerHeight) - 0.5;
      
      x.set(normalizedX);
      y.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4 md:p-6 font-sans relative overflow-hidden">
      
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

       {/* Floating Parallax Elements (Orbs/Shapes) */}
       <motion.div 
         style={{ x: moveX1, y: moveY1 }}
         className={clsx(
           "absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[100px] opacity-40 mix-blend-overlay transition-colors duration-1000 pointer-events-none",
           isDarkMode ? "bg-celadon-800" : "bg-turf-green-300"
         )}
       />
       <motion.div 
         style={{ x: moveX2, y: moveY2 }}
         className={clsx(
           "absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-40 mix-blend-overlay transition-colors duration-1000 pointer-events-none",
           isDarkMode ? "bg-blue-900" : "bg-blue-300"
         )}
       />
        <motion.div 
         style={{ x: moveX1, y: moveY2 }}
         className={clsx(
           "absolute top-[40%] right-[20%] w-64 h-64 rounded-full blur-[80px] opacity-30 mix-blend-screen transition-colors duration-1000 pointer-events-none",
           isDarkMode ? "bg-purple-800" : "bg-purple-300"
         )}
       />

      {/* Theme Toggle */}
      <motion.button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={professionalTransition}
        className={clsx(
          "absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl shadow-lg z-50 hover:scale-110 transition-all duration-700 border transform",
          isDarkMode ? "bg-black/20 border-white/10" : "bg-white/20 border-white/40"
        )}
      >
        {isDarkMode ? <Sun size={24} className="text-yellow-400 transition-colors duration-700" /> : <Moon size={24} className="text-gray-800 transition-colors duration-700" />}
      </motion.button>

      {/* Main Glass Card Container - No 3D Tilt */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={{ 
          ...containerVariants.visible
        }}
        transition={professionalTransition}
        layout
        className={clsx(
        "relative rounded-[20px] sm:rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden w-full max-w-[900px] min-h-[500px] sm:min-h-[600px] flex z-10 transition-colors duration-1000 border backdrop-blur-xl", 
        isDarkMode 
          ? "bg-black/40 border-white/10"   // Dark Mode: Smoked Glass
          : "bg-white/40 border-white/40"   // Light Mode: Frosted Ice
      )}>
        
        {/* Header Logo Position (Top Left) - Appears on Submit */}
        {/* Removed AnimatePresence to allow immediate layout transfer */}
        {isSubmitted && (
            <div className="absolute top-6 left-8 z-[60]">
            <BrandLogo isDarkMode={isDarkMode} layoutId="brand-logo" />
            </div>
        )}

        {/* Step 2 Panel (Left Side - Visible on Submit) */}
        <motion.div
            className="absolute top-0 left-0 h-full w-full flex flex-col p-8 sm:p-12 md:p-16"
            initial={false}
            animate={{
                opacity: isSubmitted ? 1 : 0,
                zIndex: isSubmitted ? 10 : 0,
                pointerEvents: isSubmitted ? 'auto' : 'none'
            }}
            transition={{ duration: 0.4, delay: isSubmitted ? 0.3 : 0 }} 
        >
             {/* Content Container - Pushed to bottom right */}
             <div className="flex-1 relative w-full h-full flex flex-col justify-end items-end">
                 
                 {/* Buttons Bottom Right */}
                 <div className="flex items-center gap-6">
                     <button 
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className={clsx("text-sm font-semibold transition-colors hover:underline", isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black")}
                     >
                        Back
                     </button>
                     <div className="w-48">
                        <AnimatedButton type="button" onClick={() => alert("Account Created Successfully!")}>
                            Finish Account
                        </AnimatedButton>
                     </div>
                 </div>
             </div>
        </motion.div>
        
        {/* Sign Up Form Panel */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center"
          initial={false}
          animate={{ 
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 5 : 1,
            opacity: isSubmitted ? 0 : (isSignUp ? 1 : 0),
            pointerEvents: isSubmitted ? 'none' : (isSignUp ? 'auto' : 'none')
          }}
          transition={professionalTransition}
        >
              <motion.form 
                variants={formVariants}
                initial="hidden"
                animate={isSubmitted ? "exit" : "visible"}
                exit="exit"
                className="w-full flex flex-col items-center justify-center max-w-sm py-2 sm:py-4" 
                onSubmit={(e) => e.preventDefault()}
              >
            {/* Logo - Handle removal for layout transition - Removed variants to avoid opacity conflict during layout slide */}
            {!isSubmitted && (
               <motion.div className="mb-3 sm:mb-4">
                 <BrandLogo isDarkMode={isDarkMode} layoutId="brand-logo" />
               </motion.div>
            )}
            
            {/* Welcome Message */}
            <motion.p variants={itemVariants} className={clsx("text-center text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 px-2 transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-600")}>
              {/* Mobile version - shorter text */}
              <span className="block sm:hidden">
                Create your account to get started.
              </span>
              {/* Desktop version - full text */}
              <span className="hidden sm:block">
                Create your account to get started<br/>with our services.
              </span>
            </motion.p>
            
            {/* Title */}
            <motion.h1 variants={itemVariants} className={clsx("font-bold text-2xl sm:text-3xl mb-4 sm:mb-5 tracking-tight transition-colors duration-700", isDarkMode ? "text-white" : "text-gray-900")}>
              Sign Up
            </motion.h1>
            
            <div className="w-full">
              <motion.div variants={itemVariants}>
                <InputField 
                  icon={User} 
                  type="text" 
                  placeholder="Full name" 
                  isDarkMode={isDarkMode}
                  value={signUpData.fullName}
                  onChange={(e) => handleSignUpChange('fullName', e.target.value)}
                  error={errors.signUpFullName}
                  success={success.signUpFullName}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField 
                  icon={Mail} 
                  type="email" 
                  placeholder="Email" 
                  isDarkMode={isDarkMode}
                  value={signUpData.email}
                  onChange={(e) => handleSignUpChange('email', e.target.value)}
                  error={errors.signUpEmail}
                  success={success.signUpEmail}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField 
                  icon={User} 
                  type="text" 
                  placeholder="Username" 
                  isDarkMode={isDarkMode}
                  value={signUpData.username}
                  onChange={(e) => handleSignUpChange('username', e.target.value)}
                  error={errors.signUpUsername}
                  success={success.signUpUsername}
                />
              </motion.div>
            </div>
            
            {/* Create Account Button */}
            <motion.div 
              variants={itemVariants}
              className="w-[85%] sm:w-full sm:max-w-[280px] mb-3 sm:mb-4 mx-auto"
            >
              <AnimatedButton type="button" onClick={handleSignUpSubmit}>
                Continue Submitting
              </AnimatedButton>
            </motion.div>
            
            {/* Already have an account */}
            <motion.div variants={itemVariants} className="flex items-center gap-1 sm:gap-1.5 mb-4 sm:mb-5">
              <span className={clsx("text-xs sm:text-sm transition-colors duration-700", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                Already have an account?
              </span>
              <button 
                type="button" 
                onClick={() => setIsSignUp(false)} 
                className="text-xs sm:text-sm font-bold text-turf-green-600 hover:text-turf-green-700 transition-colors underline-offset-2 hover:underline"
              >
                Sign In
              </button>
            </motion.div>
            
            {/* OR Divider */}
            <motion.div variants={itemVariants} className="w-full flex items-center gap-2 sm:gap-4 mb-4 sm:mb-5">
              <div className={clsx("flex-1 h-px transition-colors duration-700", isDarkMode ? "bg-white/10" : "bg-gray-200")}></div>
              <span className={clsx("text-xs sm:text-sm font-medium transition-colors duration-700 whitespace-nowrap", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                Or Continue With
              </span>
              <div className={clsx("flex-1 h-px transition-colors duration-700", isDarkMode ? "bg-white/10" : "bg-gray-200")}></div>
            </motion.div>
            
            {/* Social Buttons */}
            <motion.div variants={itemVariants} className="flex gap-3 sm:gap-4">
              <button 
                type="button"
                className={clsx(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-md",
                  isDarkMode 
                    ? "bg-white/10 border border-white/20 hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]" 
                    : "bg-white/50 border border-white/60 hover:bg-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
                )}
              >
                <img src="/facebook.svg" alt="Facebook Icon" className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <SocialIconButton iconSrc="/google.svg" isDarkMode={isDarkMode} />
              <button 
                type="button"
                className={clsx(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-md",
                  isDarkMode 
                    ? "bg-white/10 border border-white/20 hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]" 
                    : "bg-white/50 border border-white/60 hover:bg-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
                )}
              >
                <img src="/X.svg" alt="X Icon" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Sign In Form Panel */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center"
          initial={false}
          animate={{ 
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 1 : 5,
            opacity: isSubmitted ? 0 : (isSignUp ? 0 : 1),
            pointerEvents: isSubmitted ? 'none' : (isSignUp ? 'none' : 'auto')
          }}
          transition={professionalTransition}
        >
              <motion.form 
                variants={formVariants}
                initial="hidden"
                animate={isSubmitted ? "exit" : "visible"}
                exit="exit"
                className="w-full flex flex-col items-center h-full justify-center max-w-sm" 
                onSubmit={(e) => e.preventDefault()}
              >
            {/* Logo + Text - Removed variants here too */}
            <motion.div className="mb-3 sm:mb-4"><BrandLogo isDarkMode={isDarkMode} layoutId="brand-logo" /></motion.div>
            
            {/* Welcome Message */}
            <motion.p variants={itemVariants} className={clsx("text-center text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 px-2 transition-colors duration-700", isDarkMode ? "text-gray-300" : "text-gray-600")}>
              {/* Mobile version - shorter text */}
              <span className="block sm:hidden">
                Enter your email and password to securely access your account.
              </span>
              {/* Desktop version - full text */}
              <span className="hidden sm:block">
                Enter your email and password to securely access<br/>your account and manage your services.
              </span>
            </motion.p>
            
            {/* Title */}
            <motion.h1 variants={itemVariants} className={clsx("font-bold text-2xl sm:text-3xl mb-4 sm:mb-5 tracking-tight transition-colors duration-700", isDarkMode ? "text-white" : "text-gray-900")}>
              Sign In
            </motion.h1>
            
            {/* Email Input */}
            <motion.div variants={itemVariants} className="w-full">
              <InputField 
                icon={Mail} 
                type="email" 
                placeholder="Email" 
                isDarkMode={isDarkMode} 
                autoComplete="email" 
                value={signInData.email}
                onChange={(e) => handleSignInChange('email', e.target.value)}
                error={errors.signInEmail}
                success={success.signInEmail}
              />
            </motion.div>
            
            {/* Password Input with Eye Icon */}
            <motion.div variants={itemVariants} className="w-full relative">
              <PasswordInputField 
                placeholder="Password" 
                isDarkMode={isDarkMode} 
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                autoComplete="current-password"
                value={signInData.password}
                onChange={(e) => handleSignInChange('password', e.target.value)}
                error={errors.signInPassword}
                success={success.signInPassword}
              />
            </motion.div>
            
            {/* Remember Me Checkbox */}
            <motion.div variants={itemVariants} className="w-full flex items-center justify-between mb-4 sm:mb-5">
              <AnimatedCheckbox label="Remember me" isDarkMode={isDarkMode} />
              {/* Forgot Password */}
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className={clsx("text-xs sm:text-sm transition-colors duration-700 hover:underline font-medium whitespace-nowrap", isDarkMode ? "text-celadon-400 hover:text-celadon-300" : "text-turf-green-600 hover:text-turf-green-700")}
              >
                Forgot Password ?
              </button>
            </motion.div>
            
            {/* Login Button */}
            <motion.button 
              type="submit"
              onClick={handleSignInSubmit}
              variants={itemVariants} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className="w-[85%] sm:w-full sm:max-w-[280px] mx-auto block bg-gradient-to-r from-turf-green-600 to-celadon-600 text-white font-semibold py-2.5 sm:py-3.5 rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 mb-3 sm:mb-4"
            >
              Login
            </motion.button>
            
            {/* Don't have an account */}
            <motion.div variants={itemVariants} className="flex items-center gap-1 sm:gap-1.5 mb-4 sm:mb-5">
              <span className={clsx("text-xs sm:text-sm transition-colors duration-700", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                Don't have an account?
              </span>
              <button 
                type="button" 
                onClick={() => setIsSignUp(true)} 
                className="text-xs sm:text-sm font-bold text-turf-green-600 hover:text-turf-green-700 transition-colors underline-offset-2 hover:underline"
              >
                Sign Up here
              </button>
            </motion.div>
            
            {/* OR Divider */}
            <motion.div variants={itemVariants} className="w-full flex items-center gap-2 sm:gap-4 mb-4 sm:mb-5">
              <div className={clsx("flex-1 h-px transition-colors duration-700", isDarkMode ? "bg-white/10" : "bg-gray-200")}></div>
              <span className={clsx("text-xs sm:text-sm font-medium transition-colors duration-700 whitespace-nowrap", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                Or Continue With
              </span>
              <div className={clsx("flex-1 h-px transition-colors duration-700", isDarkMode ? "bg-white/10" : "bg-gray-200")}></div>
            </motion.div>
            
            {/* Social Buttons */}
            <motion.div variants={itemVariants} className="flex gap-3 sm:gap-4">
              <button 
                type="button"
                className={clsx(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-md",
                  isDarkMode 
                    ? "bg-white/10 border border-white/20 hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]" 
                    : "bg-white/50 border border-white/60 hover:bg-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
                )}
              >
                <img src="/facebook.svg" alt="Facebook Icon" className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <SocialIconButton iconSrc="/google.svg" isDarkMode={isDarkMode} />
              <button 
                type="button"
                className={clsx(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-md",
                  isDarkMode 
                    ? "bg-white/10 border border-white/20 hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]" 
                    : "bg-white/50 border border-white/60 hover:bg-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]"
                )}
              >
                <img src="/X.svg" alt="X Icon" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Overlay Container (Desktop Only) */}
        <motion.div 
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[100] hidden md:block"
          initial={false}
          animate={{ 
            x: isSubmitted ? "100%" : (isSignUp ? "-100%" : "0%") // isSubmitted: 100% moves it completely to the right (offscreen)
          }}
          transition={professionalTransition}
        >
          {/* Inner Image Container */}
          <motion.div 
             className="relative -left-full h-full w-[200%]"
             initial={false}
             animate={{ 
               x: isSignUp ? "50%" : "0%"
             }}
             transition={professionalTransition} 
             style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2675&auto=format&fit=crop')",
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}
          />
        </motion.div>

      </motion.div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default AuthPage;
