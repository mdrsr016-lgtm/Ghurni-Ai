import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Facebook, Linkedin } from 'lucide-react';
import clsx from 'clsx';

const SocialButton = ({ icon: Icon, href = "#" }) => (
  <a 
    href={href}
    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

const InputField = ({ icon: Icon, type, placeholder }) => (
  <div className="relative w-full mb-4">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <Icon size={18} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-gray-100 border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    />
  </div>
);

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl min-h-[600px]">
        
        {/* Desktop Overlay Container */}
        <div className={clsx(
          "absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 z-[100] hidden md:block",
          isSignUp ? "-translate-x-full" : ""
        )}>
          <div className={clsx(
            "bg-gradient-to-r from-indigo-600 to-purple-700 text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 flex items-center justify-center",
            isSignUp ? "translate-x-1/2" : "translate-x-0"
          )}>
            
            {/* Left Overlay Panel (For Sign In) */}
            <div className="w-1/2 flex flex-col items-center justify-center px-12 text-center h-full">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-8 text-indigo-100 leading-relaxed">
                To keep connected with us please login with your personal info
              </p>
              <button 
                onClick={() => setIsSignUp(false)}
                className="px-8 py-3 border border-white rounded-full font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel (For Sign Up) */}
            <div className="w-1/2 flex flex-col items-center justify-center px-12 text-center h-full">
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="mb-8 text-indigo-100 leading-relaxed">
                Enter your personal details and start your journey with us
              </p>
              <button 
                onClick={() => setIsSignUp(true)}
                className="px-8 py-3 border border-white rounded-full font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

        {/* Forms Container */}
        <div className="relative w-full h-full min-h-[600px] flex">

          {/* Sign Up Form */}
          <motion.div 
            initial={false}
            animate={{ 
              x: isSignUp ? "100%" : "0%",
              opacity: isSignUp ? 1 : 0,
              zIndex: isSignUp ? 50 : 0
            }}
            transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
            className={clsx(
              "absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-white transition-all duration-700",
              // Mobile behavior overrides
              "md:opacity-100", 
              !isSignUp && "max-md:opacity-0 max-md:pointer-events-none"
            )}
          >
            <form className="w-full max-w-xs flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">Create Account</h1>
              <div className="flex space-x-4 mb-4">
                <SocialButton icon={Github} />
                <SocialButton icon={Facebook} />
                <SocialButton icon={Linkedin} />
              </div>
              <span className="text-xs text-gray-400 mb-4">or use your email for registration</span>
              
              <InputField icon={User} type="text" placeholder="Name" />
              <InputField icon={Mail} type="email" placeholder="Email" />
              <InputField icon={Lock} type="password" placeholder="Password" />
              
              <button className="mt-4 bg-indigo-600 text-white font-bold py-3 px-12 rounded-full text-xs uppercase tracking-wider shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95">
                Sign Up
              </button>

              <div className="mt-6 md:hidden">
                <p className="text-sm text-gray-500">Already have an account?</p>
                <button 
                  type="button"
                  onClick={() => setIsSignUp(false)} 
                  className="text-indigo-600 font-bold text-sm mt-1"
                >
                  Sign In
                </button>
              </div>
            </form>
          </motion.div>

          {/* Sign In Form */}
          <motion.div 
             initial={false}
             animate={{ 
               x: isSignUp ? "100%" : "0%", // Slide to right when Signing Up (to be covered)
             }}
             // Let's use specific variants for clarity.
             className={clsx(
              "absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-10 bg-white transition-all duration-700 z-10",
              // Logic: When isSignUp is true, this needs to move to right?
              // The reference CSS: .container-active .sign-in-container { transform: translateX(100%); }
              isSignUp ? "md:translate-x-full md:opacity-0" : "md:translate-x-0 md:opacity-100 md:z-10",
              // Mobile
              isSignUp && "max-md:opacity-0 max-md:pointer-events-none"
             )}
          >
            <form className="w-full max-w-xs flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">Sign In</h1>
              <div className="flex space-x-4 mb-4">
                <SocialButton icon={Github} />
                <SocialButton icon={Facebook} />
                <SocialButton icon={Linkedin} />
              </div>
              <span className="text-xs text-gray-400 mb-4">or use your account</span>
              
              <InputField icon={Mail} type="email" placeholder="Email" />
              <InputField icon={Lock} type="password" placeholder="Password" />
              
              <a href="#" className="text-xs text-gray-600 mb-6 hover:text-indigo-600 transition">Forgot your password?</a>
              
              <button className="bg-indigo-600 text-white font-bold py-3 px-12 rounded-full text-xs uppercase tracking-wider shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95">
                Sign In
              </button>

              <div className="mt-6 md:hidden">
                <p className="text-sm text-gray-500">Don't have an account?</p>
                <button 
                  type="button"
                  onClick={() => setIsSignUp(true)} 
                  className="text-indigo-600 font-bold text-sm mt-1"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;
