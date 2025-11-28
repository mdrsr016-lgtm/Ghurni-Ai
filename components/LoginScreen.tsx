import React, { useState } from 'react';
import { EyeOff, Eye, Globe, ArrowRight, UserPlus, LogIn, Check } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const translations = {
  English: {
    tagline: "Global travel made simple – your personal AI guide.",
    start: "Start",
    discover: "Discover",
    yourNext: "your next",
    adventure: "adventure",
    flightTo: "Flight to",
    tokyo: "Tokyo, JPN",
    createAccount: "Create Account",
    signIn: "Sign In",
    fillDetails: "Fill in your details to start planning your trip.",
    welcomeBack: "Welcome back! Please enter your details.",
    fullName: "Full Name",
    emailPlaceholderSignUp: "Email Address",
    emailPlaceholderSignIn: "Email or Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot password?",
    signUpBtn: "Sign Up",
    signInBtn: "Sign In",
    orContinue: "Or continue with",
    google: "Google",
    facebook: "Facebook",
    haveAccount: "Already have an account? Sign In",
    newHere: "New here? Sign Up",
    signInShort: "Sign In",
    signUpShort: "Sign Up",
    copyright: "© 2005-2025 Ghurni Ai Inc."
  },
  Bangla: {
    tagline: "বিশ্ব ভ্রমণ এখন সহজ – আপনার ব্যক্তিগত এআই গাইড।",
    start: "শুরু করুন",
    discover: "আবিষ্কার করুন",
    yourNext: "আপনার পরবর্তী",
    adventure: "অ্যাডভেঞ্চার",
    flightTo: "ফ্লাইট",
    tokyo: "টোকিও, জাপান",
    createAccount: "অ্যাকাউন্ট খুলুন",
    signIn: "সাইন ইন",
    fillDetails: "ভ্রমণ পরিকল্পনা শুরু করতে আপনার বিবরণ দিন।",
    welcomeBack: "স্বাগতম! অনুগ্রহ করে আপনার বিবরণ দিন।",
    fullName: "পুরো নাম",
    emailPlaceholderSignUp: "ইমেল ঠিকানা",
    emailPlaceholderSignIn: "ইমেল বা ইউজারনেম",
    password: "পাসওয়ার্ড",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    signUpBtn: "সাইন আপ",
    signInBtn: "সাইন ইন",
    orContinue: "অথবা চালিয়ে যান",
    google: "গুগল",
    facebook: "ফেসবুক",
    haveAccount: "অ্যাকাউন্ট আছে? সাইন ইন",
    newHere: "নতুন এখানে? সাইন আপ",
    signInShort: "সাইন ইন",
    signUpShort: "সাইন আপ",
    copyright: "© ২০০৫-২০২৫ ঘূর্ণি এআই ইংক."
  }
};

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Language Selection State
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'English' | 'Bangla'>('English');

  const t = translations[currentLang];

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleLangSelect = (lang: 'English' | 'Bangla') => {
    setCurrentLang(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#1C1C1E] flex flex-col md:flex-row overflow-x-hidden">
        
        {/* Left Side (Dark) - Branding & Visuals */}
        <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] bg-[#1C1C1E] relative p-6 sm:p-8 md:p-12 lg:px-10 lg:py-12 xl:p-16 flex flex-col justify-center text-white shrink-0 min-h-[40vh] md:min-h-screen transition-all duration-500 z-0 gap-6 md:gap-12">
           {/* Background Decoration */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
             <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full border border-gray-700/50 animate-fade-in duration-1000"></div>
             <div className="absolute top-[-5%] right-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full border border-gray-700/50 animate-fade-in duration-1000 delay-200"></div>
           </div>

           {/* Header / Tagline - Absolute on Desktop to stay top */}
           <div className="md:absolute md:top-12 md:left-12 lg:left-16 relative z-10 animate-fade-in-up text-left">
              <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide">
                {t.tagline}
              </p>
           </div>

           {/* Main Heading & Mockup - Flex Row on Mobile, Column on Desktop - LEFT ALIGNED ON DESKTOP */}
           <div className="relative z-10 flex flex-row md:flex-col md:justify-center items-center md:items-start gap-6 sm:gap-8 md:gap-10 lg:gap-14 w-full">
              
              {/* Text Section - Left aligned on Desktop */}
              <div className="flex-1 text-left md:text-left md:w-full z-20">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] md:leading-[1.1] tracking-tighter transition-all duration-300">
                    <span key={isSignUp ? 'start' : 'discover'} className="inline-block animate-fade-in-up">
                        {isSignUp ? t.start : t.discover}
                    </span>
                    <br />
                    <span className="animate-fade-in-up animation-delay-100 inline-block">{t.yourNext}</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 animate-fade-in-up animation-delay-200 inline-block">{t.adventure}</span>
                  </h1>
              </div>
              
              {/* Phone Mockup visual */}
              {/* Wrapper handles the entrance animation (Slide Up/Fade In) */}
              <div className="relative flex-shrink-0 z-10 animate-fade-in-up animation-delay-300 self-end md:self-center">
                {/* Inner Div handles the Rotation and Hover transform */}
                <div className="
                    relative 
                    w-28 h-48 
                    sm:w-40 sm:h-64 
                    md:w-48 md:h-[19rem] 
                    lg:w-60 lg:h-[24rem] 
                    xl:w-72 xl:h-[28rem]
                    bg-gray-800 rounded-[1.25rem] md:rounded-[2.5rem] border-[3px] md:border-4 border-gray-700 
                    shadow-2xl 
                    transform -rotate-6 md:-rotate-6 hover:rotate-0 
                    md:self-center
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] 
                    overflow-hidden group
                    [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform
                    [-webkit-mask-image:-webkit-radial-gradient(white,black)]
                ">
                    <img 
                      src="https://picsum.photos/400/800" 
                      alt="App Screen" 
                      className="w-full h-full object-cover opacity-100 transition-opacity duration-500 z-10 relative"
                    />
                    
                    {/* Floating Widget on Phone */}
                    <div className="absolute bottom-2 md:bottom-6 left-1.5 right-1.5 md:left-4 md:right-4 bg-white/10 backdrop-blur-md p-1.5 md:p-3 rounded-lg md:rounded-xl border border-white/20 shadow-lg transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[6px] md:text-[10px] text-gray-300 leading-tight">{t.flightTo}</p>
                          <p className="text-[9px] md:text-sm font-bold leading-tight">{t.tokyo}</p>
                        </div>
                        <div className="text-[10px] md:text-base font-bold text-black leading-tight">$897</div>
                      </div>
                    </div>
                </div>
              </div>
           </div>

           {/* Footer Icons (Desktop Only) - Absolute to stay bottom */}
           <div className="relative md:absolute md:bottom-12 md:left-12 lg:left-16 z-10 hidden md:flex gap-4 animate-fade-in animation-delay-500">
              
              {/* Language Selector */}
              <div className="relative">
                  <button 
                     onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                     className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isLangMenuOpen ? 'bg-gray-800 border-gray-500 scale-110 text-white' : 'border-gray-700 text-gray-400 hover:bg-gray-800 hover:border-gray-500 hover:scale-110 hover:text-white'}`}
                     title="Select Language"
                  >
                     <Globe size={18} />
                  </button>
                  
                  {isLangMenuOpen && (
                      <>
                        {/* Click backdrop to close */}
                        <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsLangMenuOpen(false)}></div>
                        
                        {/* Menu */}
                        <div className="absolute bottom-full left-0 mb-3 w-40 bg-[#252525] border border-gray-700 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 animate-scale-in origin-bottom-left z-50">
                            <button 
                                onClick={() => handleLangSelect('English')}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${currentLang === 'English' ? 'bg-gray-700 text-white font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
                            >
                                <span className="flex items-center gap-2">
                                    <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-5 rounded-sm shadow-sm" />
                                    English
                                </span>
                                {currentLang === 'English' && <Check size={14} className="text-green-500" />}
                            </button>
                            <button 
                                onClick={() => handleLangSelect('Bangla')}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${currentLang === 'Bangla' ? 'bg-gray-700 text-white font-medium' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
                            >
                                <span className="flex items-center gap-2">
                                    <img src="https://flagcdn.com/w40/bd.png" alt="BD" className="w-5 rounded-sm shadow-sm" />
                                    Bangla
                                </span>
                                {currentLang === 'Bangla' && <Check size={14} className="text-green-500" />}
                            </button>
                        </div>
                      </>
                  )}
              </div>

              {/* AI Button */}
              <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 hover:border-gray-500 hover:scale-110 transition-all duration-300 cursor-pointer text-gray-400 hover:text-white">
                 <span className="font-bold text-xs">AI</span>
              </div>
           </div>
        </div>

        {/* Right Side (Light) - Login/Signup Form */}
        <div className="flex-1 md:w-[55%] lg:w-[60%] xl:w-[65%] bg-white flex flex-col justify-center rounded-t-[30px] md:rounded-tr-none md:rounded-l-[40px] lg:rounded-l-[50px] relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] md:shadow-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[55vh] md:min-h-screen">
           <div className="p-6 sm:p-10 md:p-14 lg:p-20 xl:p-24 flex flex-col w-full h-full justify-center max-w-2xl mx-auto">
               
               {/* Top Bar - Mobile/Tablet mainly, adjusted for Desktop spacing */}
               <div className="flex justify-between items-center mb-8 md:mb-12 animate-fade-in">
                  <div className="flex items-center gap-2 group cursor-default">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3200 3200" className="w-8 h-8 text-orange-500 fill-current group-hover:scale-110 transition-transform duration-300">
                       <path d="M1671.79 1880.79c-9.69-13.24-21.85-26.4-30.37-40.01-57.74-92.22-15.88-219.75 70.48-278.48 29.58-20.11 59.68-36.49 90.93-53.75 46.18-25.17 92.15-50.73 137.91-76.66a7593 7593 0 0 0 171.35-101.81c32.08-19.34 64.12-39.22 96.86-57.35 9.35-5.18 34.11-18.72 44.7-16.56 21.16 4.3 22.63 28.25 22.64 45.41.05 95.29-2.48 190.61-3.36 285.9-.29 87.78 3.09 175.85 2.53 263.68-.19 30.37-.17 61.75-8.19 91.19-19.41 71.56-87.6 103.07-147.03 136.33l-119.15 67.26-191.32 111.6c-51.01 29.98-151.32 96.84-210.51 98.06-52.65 1.09-136.56-55.04-182.51-80.67-54.61-31.33-105.7-64.39-159.18-95.03l-157.24-88.14c-178.802-100.13-179.712-105.57-177.866-308.37l1.013-168.53-.502-192.46c-.339-48.99-2.983-102.3 3.511-150.61 5.308-39.48 30.84-76.98 62.854-99.75 49.5-34.67 105.26-63.31 157.98-93 85.53-48.28 170.73-97.147 255.61-146.585l383.65-225.924c98.82-59.188 196.24-120.792 298.42-174.009 55.86-29.096 121.96-57.877 186.07-57.635 103.8 1.484 202.49 63.68 291.22 112.462 103.18 56.724 212.59 113.427 301.59 190.443 64.78 56.057 87.78 151.111 91.07 233.228 2.99 74.52 1.34 150.54.15 225.16-2.4 116.41-3.72 232.84-3.94 349.27-.34 103.32.57 206.63 2.71 309.93 2.1 86.04 6.18 174.89 3.53 260.79-1.28 41.67-8.5 105.6-20.05 144.92-15.12 51.5-52.71 103.4-94.82 136.67-76.89 60.77-167 108-252.28 155.87-88.85 49.86-179.85 98.62-268.02 149.15a10492 10492 0 0 0-263.59 155.14c-91.38 55.48-182.9 112.64-277.51 162.08-86.63 45.27-169.98 72.83-266.45 41.16-107.98-35.46-197.43-97.58-294.95-154.38-108.06-65.17-212.86-128.23-322.356-191.17-80.468-46-161.335-91.29-242.59-135.89-92.485-50.2-187.436-101.41-273.901-161.57-42.428-29.52-77.498-65.66-101.453-111.79-25.52-49.14-34.236-118.83-37.291-174.47-3.897-70.96-1.844-150.5.229-221.79a8532 8532 0 0 0 4.702-236.08c.527-99.24.215-198.49-.936-297.74-1.875-67.13-3.322-134.29-4.344-201.44-1.735-87.77-5.812-238.259 20.262-319.338a287.24 287.24 0 0 1 93.501-136.396c33.659-27.536 76.796-54.431 114.04-76.996a4263 4263 0 0 1 173.208-98.498 21142 21142 0 0 0 268.061-149.6 22860 22860 0 0 0 293.188-174.208c72.31-43.588 140.58-84.526 215.13-124.099 170.61-90.567 268.09-53.505 424.51 35.467a7171 7171 0 0 1 158.03 93.035c23.91 14.368 50.71 31.504 74.75 44.999-.17.853-.97 2.771-1.31 3.67-6.34-.242-19.76-6.374-26.8-9.234-22.79-9.253-85.93-12.745-106.19 2.013-66.53 20.352-135.81 62.647-195.49 98.441l-139.94 84.037-444.33 263.213c-134.39 78.454-273.163 146.968-404.6 231.268-131.318 84.226-116.31 207.156-114.734 343.596l2.147 218.09c.313 81.74-.124 163.48-1.31 245.21-.993 80.78-9.159 229.5 14.116 303.35 12.849 40.76 37.668 72.83 70.447 99.79 50.428 41.48 111.394 72.68 168.17 104.61l240.734 134.53c64.33 36.55 127.47 76.73 191.64 113.77 44.53 25.71 87.4 54.53 133.77 77.27 69.64 34.55 125.27 57.44 202.12 31.19 65.02-22.21 116.91-56.82 175.39-90.72 72.54-42.05 144.16-87.67 216.49-129.26l229.93-129.36c55.35-30.9 113.52-62.35 165.27-98.75 32.69-23 57.56-45.19 75.47-81.33 16.13-32.56 21.69-57.37 24.54-93.64 5.25-66.65 3.2-132.92 2.25-199.64l-2.42-246.17c.27-78.39.96-156.78 2.07-235.16 1.18-78.78 7.77-173.24-15.08-249-17.53-58.16-71.69-107.94-125.1-133.078-64.56-30.2-116.77-42.71-184.79-17.356-66.43 24.761-126.07 61.194-186.34 97.634-61.11 37.31-122.56 74.07-184.34 110.27a18928 18928 0 0 1-222.04 125.61c-66.77 36.95-132.86 72.45-195.32 116.93-76.37 52.52-119.43 165.42-86.89 253.78 31.82 86.41 137.67 133.07 214.05 172.94 28.5 14.87 60.39 33.46 89.19 46.75 4.8 2.22 9.65 4.33 14.55 6.32"/>
                     </svg>
                     <span className="font-bold text-xl tracking-tight text-gray-800">Ghurni Ai</span>
                  </div>
                  <button 
                    onClick={toggleMode}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-all px-3 py-2 rounded-lg hover:bg-gray-100 active:scale-95"
                  >
                     {isSignUp ? (
                       <>
                         <LogIn size={16} /> <span className="hidden sm:inline">{t.haveAccount}</span>
                         <span className="sm:hidden">{t.signInShort}</span>
                       </>
                     ) : (
                       <>
                         <UserPlus size={16} /> <span className="hidden sm:inline">{t.newHere}</span>
                         <span className="sm:hidden">{t.signUpShort}</span>
                       </>
                     )}
                  </button>
               </div>

               {/* Form Section */}
               <div 
                  key={isSignUp ? 'signup' : 'signin'}
                  className={`w-full flex-1 flex flex-col justify-center`}
               >
                  <div className="animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 mb-2 md:mb-4">
                      {isSignUp ? t.createAccount : t.signIn}
                    </h2>
                  </div>

                  <div className="animate-fade-in-up animation-delay-75">
                    <p className="text-gray-500 mb-8 md:mb-10 text-sm md:text-base">
                      {isSignUp 
                        ? t.fillDetails 
                        : t.welcomeBack}
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
                     
                     {/* Full Name (Sign Up Only) */}
                     {isSignUp && (
                       <div className="animate-fade-in-up animation-delay-150">
                          <input 
                            type="text" 
                            placeholder={t.fullName}
                            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white shadow-sm hover:shadow-md hover:border-orange-300"
                            required
                          />
                       </div>
                     )}

                     {/* Email/Username */}
                     <div className={`animate-fade-in-up ${isSignUp ? 'animation-delay-200' : 'animation-delay-150'}`}>
                        <input 
                          type="text" 
                          placeholder={isSignUp ? t.emailPlaceholderSignUp : t.emailPlaceholderSignIn}
                          className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white shadow-sm hover:shadow-md hover:border-orange-300"
                          required
                        />
                     </div>

                     {/* Password */}
                     <div className={`relative animate-fade-in-up ${isSignUp ? 'animation-delay-300' : 'animation-delay-200'}`}>
                        <input 
                          type={showPassword ? "text" : "password"}
                          placeholder={t.password}
                          className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white shadow-sm hover:shadow-md hover:border-orange-300"
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors p-2 rounded-full hover:bg-gray-100"
                        >
                           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                     </div>

                     {/* Confirm Password (Sign Up Only) */}
                     {isSignUp && (
                       <div className="relative animate-fade-in-up animation-delay-400">
                          <input 
                            type="password"
                            placeholder={t.confirmPassword}
                            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white shadow-sm hover:shadow-md hover:border-orange-300"
                            required
                          />
                       </div>
                     )}
                     
                     {/* Forgot Password (Sign In Only) */}
                     {!isSignUp && (
                       <div className="flex justify-end items-center mt-1 animate-fade-in animation-delay-300">
                         <a href="#" className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors underline-offset-4 hover:underline">{t.forgotPassword}</a>
                       </div>
                     )}

                     <button 
                       type="submit"
                       className={`mt-4 md:mt-6 w-full py-4 rounded-full text-white font-medium text-lg gradient-btn shadow-lg hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] animate-fade-in-up ${isSignUp ? 'animation-delay-500' : 'animation-delay-400'}`}
                     >
                       <span className="relative">
                         {isSignUp ? t.signUpBtn : t.signInBtn}
                       </span>
                       <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                     </button>
                  </form>

                  {/* Divider */}
                  <div className={`relative flex py-6 items-center animate-fade-in-up ${isSignUp ? 'animation-delay-500' : 'animation-delay-500'}`}>
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">{t.orContinue}</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      type="button" 
                      className={`relative flex items-center justify-center gap-3 px-4 py-3.5 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] animate-fade-in-up ${isSignUp ? 'animation-delay-500' : 'animation-delay-500'}`}
                      style={{ animationFillMode: 'backwards' }}
                    >
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>{t.google}</span>
                    </button>

                    <button 
                      type="button" 
                      className="relative flex items-center justify-center gap-3 px-4 py-3.5 bg-[#1877F2] border border-[#1877F2] rounded-full text-white font-medium hover:bg-[#166fe5] hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] animate-fade-in-up"
                      style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}
                    >
                        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span>{t.facebook}</span>
                    </button>
                  </div>
               </div>

               {/* Footer */}
               <div 
                 className="flex justify-center items-center text-xs text-gray-400 mt-8 animate-fade-in w-full max-w-2xl mx-auto"
                 style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}
               >
                  <p className="text-center transition-colors hover:text-gray-600">{t.copyright}</p>
               </div>
           </div>
        </div>
    </div>
  );
};

export default LoginScreen;