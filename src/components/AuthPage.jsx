import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Github, Facebook, Linkedin, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

// Shared Spring Transition for professional smoothness
const transitionSpring = {
  type: "spring",
  stiffness: 70,
  damping: 14,
  mass: 1
};

const SocialButton = ({ icon: Icon, href = "#" }) => (
  <a 
    href={href}
    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
  >
    <Icon size={18} />
  </a>
);

const InputField = ({ icon: Icon, type, placeholder }) => (
  <div className="relative w-full mb-3">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <Icon size={16} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-gray-100 border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
    />
  </div>
);

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
      
      {/* Animated Gradient Background */}
      <div className={clsx("gradient-bg", isDarkMode ? "gradient-dark" : "gradient-light")} />

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md z-50 hover:scale-110 transition-transform"
      >
        {isDarkMode ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-gray-700" />}
      </button>

      {/* Card Container */}
      <div className="relative bg-white rounded-[20px] shadow-2xl overflow-hidden w-full max-w-[900px] min-h-[600px] flex z-10">
        
        {/* Sign Up Form Panel */}
        <motion.div 
          className={clsx(
            "absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white",
            // On mobile, we use opacity to hide. On desktop, we slide it.
            // But here we rely on the animate prop for visibility logic via z-index/opacity.
          )}
          initial={false}
          animate={{ 
            // On Mobile: Always 0% x.
            // On Desktop: If signing up, x is 0% (visible on left). If NOT signing up, x is 100% (behind overlay? No, standard is left=0, overlay moves).
            // Wait, standard sliding logic:
            // Sign Up Form is usually on the LEFT.
            // Sign In Form is usually on the LEFT (occupying same space) and they swap z-index?
            // OR they are side-by-side?
            // In the previous code:
            // Sign Up: x: isSignUp ? "100%" : "0%" ... Wait, if isSignUp is true, it moves to the RIGHT?
            // Let's re-read the original logic provided in Step 14.
            // Step 14: Sign Up Form: x: isSignUp ? "100%" : "0%". zIndex: 5 vs 1. Opacity 1 vs 0.
            // Wait, if x is 100%, it moves to the right half.
            // So Sign Up form IS on the right when active?
            // Let's look at the Overlay logic (Step 14): Overlay is "absolute top-0 left-1/2 w-1/2".
            // If isSignUp is true, Overlay translates -100% (to the left).
            // So:
            // Mode A (Sign In): Overlay is on Right. Sign In Form is on Left.
            // Mode B (Sign Up): Overlay moves Left. Sign Up Form moves Right.
            
            // Logic for Sign Up Form:
            // If isSignUp (Active): x should be "100%" (The Right Side). Opacity 1. Z=5.
            // If !isSignUp (Inactive): x should be "0%" (The Left Side - behind content? or just hidden?). Opacity 0.
            
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 5 : 1,
            opacity: isSignUp ? 1 : 0
          }}
          transition={transitionSpring}
        >
          <form className="w-full flex flex-col items-center h-full justify-center" onSubmit={(e) => e.preventDefault()}>
            <h1 className="font-bold text-3xl mb-4 text-gray-800">Create Account</h1>
            <div className="flex space-x-4 mb-4">
              <SocialButton icon={Github} />
              <SocialButton icon={Facebook} />
              <SocialButton icon={Linkedin} />
            </div>
            <span className="text-sm text-gray-500 mb-4">or use your email for registration</span>
            
            <InputField icon={User} type="text" placeholder="Name" />
            <InputField icon={Mail} type="email" placeholder="Email" />
            <InputField icon={Lock} type="password" placeholder="Password" />
            
            <button className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs shadow-lg hover:bg-purple-700 active:scale-95 transition-transform mt-4">
              Sign Up
            </button>
            <div className="mt-6 flex flex-col items-center">
                <span className="text-gray-500 text-sm mb-2">Already have an account?</span>
                <button type="button" onClick={() => setIsSignUp(false)} className="border border-purple-600 text-purple-600 font-bold py-2 px-8 rounded-full uppercase tracking-wider text-xs hover:bg-purple-50 transition">
                  Sign In
                </button>
            </div>
          </form>
        </motion.div>

        {/* Sign In Form Panel */}
        <motion.div 
          className={clsx(
            "absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white",
          )}
          initial={false}
          animate={{ 
            // If isSignUp is True (Sign Up Active), Sign In is Inactive.
            // It should move to... "100%"? 
            // Step 14: x: isSignUp ? "100%" : "0%".
            // So both forms move TOGETHER to the right when Sign Up is active?
            // Yes! Because the Overlay moves to the Left.
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 1 : 5,
            opacity: isSignUp ? 0 : 1
          }}
          transition={transitionSpring}
        >
          <form className="w-full flex flex-col items-center h-full justify-center" onSubmit={(e) => e.preventDefault()}>
            <h1 className="font-bold text-3xl mb-4 text-gray-800">Sign in</h1>
            <div className="flex space-x-4 mb-4">
              <SocialButton icon={Github} />
              <SocialButton icon={Facebook} />
              <SocialButton icon={Linkedin} />
            </div>
            <span className="text-sm text-gray-500 mb-4">or use your account</span>
            
            <InputField icon={Mail} type="email" placeholder="Email" />
            <InputField icon={Lock} type="password" placeholder="Password" />
            
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 mb-6 mt-2">Forgot your password?</a>
            
            <button className="bg-purple-600 text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs shadow-lg hover:bg-purple-700 active:scale-95 transition-transform">
              Sign In
            </button>
            <div className="mt-8 flex flex-col items-center">
                <span className="text-gray-500 text-sm mb-2">New here?</span>
                <button type="button" onClick={() => setIsSignUp(true)} className="border border-purple-600 text-purple-600 font-bold py-2 px-8 rounded-full uppercase tracking-wider text-xs hover:bg-purple-50 transition">
                  Create Account
                </button>
            </div>
          </form>
        </motion.div>

        {/* Overlay Container (Desktop Only) */}
        {/* We convert this to motion.div to sync the slide animation */}
        <motion.div 
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-[100] hidden md:block"
          initial={false}
          animate={{ 
            // If isSignUp is true, the Overlay Container moves to the Left (-100% of its width, which is 50% of parent).
            // So -100% of 50% = -50% of parent? No, translateX percentage is relative to element itself.
            // Step 14 used: isSignUp ? "-translate-x-full" : "".
            // -translate-x-full is -100%.
            x: isSignUp ? "-100%" : "0%" 
          }}
          transition={transitionSpring}
        >
          {/* Inner Text/Image Container (Moves in opposite direction to keep image static-ish) */}
          <motion.div 
             className="relative -left-full h-full w-[200%]"
             initial={false}
             animate={{ 
               // Step 14: isSignUp ? "translate-x-1/2" : "translate-x-0".
               // 1/2 of 200% width = 100% width of parent = 50% shift.
               x: isSignUp ? "50%" : "0%"
             }}
             transition={transitionSpring} // SYNCED transition
             style={{
               backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2675&auto=format&fit=crop')",
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default AuthPage;
