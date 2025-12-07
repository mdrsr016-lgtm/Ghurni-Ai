import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Github, Facebook, Linkedin, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

const SocialButton = ({ icon: Icon, href = "#" }) => (
  <a 
    href={href}
    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all duration-300"
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
  const [isDarkMode, setIsDarkMode] = useState(false); // Controls only the background

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Animated Gradient Background - Keeps the requested background */}
      <div className={clsx("gradient-bg", isDarkMode ? "gradient-dark" : "gradient-light")} />

      {/* Theme Toggle - Keeps the ability to switch background modes */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md z-50 hover:scale-110 transition-transform"
      >
        {isDarkMode ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-gray-700" />}
      </button>

      {/* Card - Restored to ORIGINAL STYLES (Opaque White, no glass/transparency on card itself) */}
      <div className="relative bg-white rounded-[20px] shadow-2xl overflow-hidden w-full max-w-[900px] min-h-[600px] flex z-10">
        
        {/* Sign Up Form */}
        <motion.div 
          className={clsx(
            "absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white transition-all duration-700",
            !isSignUp && "pointer-events-none opacity-0"
          )}
          animate={{ 
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 5 : 1,
            opacity: isSignUp ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(false)}
                  className="border border-purple-600 text-purple-600 font-bold py-2 px-8 rounded-full uppercase tracking-wider text-xs hover:bg-purple-50 transition"
                >
                  Sign In
                </button>
            </div>
          </form>
        </motion.div>

        {/* Sign In Form */}
        <motion.div 
          className={clsx(
            "absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white transition-all duration-700",
             isSignUp && "pointer-events-none opacity-0"
          )}
          animate={{ 
            x: isMobile ? "0%" : (isSignUp ? "100%" : "0%"),
            zIndex: isSignUp ? 1 : 5,
            opacity: isSignUp ? 0 : 1
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(true)}
                  className="border border-purple-600 text-purple-600 font-bold py-2 px-8 rounded-full uppercase tracking-wider text-xs hover:bg-purple-50 transition"
                >
                  Create Account
                </button>
            </div>
          </form>
        </motion.div>

        {/* Overlay (Desktop Only) - RESTORED ORIGINAL STYLES */}
        <div className={clsx(
          "absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 z-[100] hidden md:block",
           isSignUp ? "-translate-x-full" : ""
        )}>
          <div 
            className={clsx(
              "relative -left-full h-full w-[200%] transform transition-transform duration-700",
              isSignUp ? "translate-x-1/2" : "translate-x-0"
            )}
            style={{
              backgroundImage: "linear-gradient(to right, rgba(126, 34, 206, 0.4), rgba(79, 70, 229, 0.4)), url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2675&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
             {/* Text Content for Overlay - Re-adding the original text which was separate in the original code? 
                 In the original code (Step 14), the overlay was just an image div.
                 The text 'Hello Friend' / 'Welcome Back' was NOT in the overlay in Step 14. 
                 Wait, looking at Step 14 (original file).
                 Step 14: Lines 125-141 (Overlay). It was EMPTY inside. just background image.
                 The text was inside the FORMS? No.
                 Wait, where was "Hello Friend"? 
                 Ah, in the original code provided in Step 14, there was NO "Hello Friend" text on the overlay! 
                 The "Create Account" vs "Sign In" forms were the only text.
                 Wait, standard sliding auth usually has text on the overlay.
                 Let's check Step 14 carefully. 
                 Lines 36-77: Sign Up Form.
                 Lines 80-122: Sign In Form.
                 Lines 125-141: Overlay. It is EMPTY. "transform transition-transform... backgroundImage...".
                 So the original code purely relied on the forms?
                 Wait, if I restore it EXACTLY, I should leave the overlay empty?
                 Yes. The previous modification I made added text to the overlay. The user said "undo it".
                 So I will remove the text from the overlay.
             */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
