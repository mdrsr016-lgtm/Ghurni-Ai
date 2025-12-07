import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Github, Facebook, Linkedin } from 'lucide-react';
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-800">
      <div className="relative bg-white rounded-[20px] shadow-2xl overflow-hidden w-full max-w-[900px] min-h-[600px] flex">
        
        {/* Sign Up Form */}
        <motion.div 
          className={clsx(
            "absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white transition-all duration-700",
            !isSignUp && "pointer-events-none opacity-0 md:opacity-0"
          )}
          initial={false}
          animate={{ 
            x: isSignUp ? "100%" : "0%",
            zIndex: isSignUp ? 5 : 1,
            opacity: isSignUp ? 1 : 0
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <form className="w-full flex flex-col items-center h-full justify-center" onSubmit={(e) => e.preventDefault()}>
            <h1 className="font-bold text-3xl mb-4 text-gray-800">Create Account</h1>
            <div className="flex space-x-4 mb-4">
              <SocialButton icon={Github} /> {/* Using Github as proxy for Google/Generic */}
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
             isSignUp && "pointer-events-none opacity-0 md:opacity-0"
          )}
          initial={false}
          animate={{ 
            x: isSignUp ? "100%" : "0%",
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

        {/* Overlay (Desktop Only) */}
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
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
