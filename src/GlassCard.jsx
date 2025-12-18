import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Loader2, Mail, CheckCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

import { translations } from './translations';
import SocialButton from './components/SocialButton';
import { supabase } from './supabaseClient';

// --- Internal Reusable Components ---

const InputField = ({ label, type, placeholder, value, onChange, icon: Icon, isPasswordToggle, showPassword, onTogglePassword, variant = "default" }) => (
  <div className={`space-y-1 ${variant === 'compact' ? 'md:space-y-1' : 'md:space-y-2'}`}>
    <label className="text-xs md:text-xs font-semibold text-gray-700 dark:text-gray-300 ml-1">{label}</label>
    <div className="relative group">
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        className={`w-full ${variant === 'compact' ? 'h-8 md:h-10 text-xs md:text-sm' : 'h-10 md:h-12 text-sm md:text-base'} px-4 pl-10 md:pl-12 bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-turf-green-500/50 focus:border-turf-green-500 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 transition-all font-medium backdrop-blur-sm`}
      />
      <Icon size={variant === 'compact' ? 14 : 18} className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-turf-green-500/80 md:w-5 md:h-5" />
      
      {isPasswordToggle && (
        <button 
          type="button" 
          onClick={onTogglePassword}
          className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-[10px] md:text-xs font-semibold text-turf-green-600 hover:text-turf-green-700 dark:text-turf-green-400 dark:hover:text-turf-green-300 transition-colors"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  </div>
);


// --- Main Component ---

export default function GlassCard() {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '', confirmPassword: '', firstName: '', lastName: '', termsAccepted: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', password: '', email: '', confirmPassword: '', firstName: '', lastName: '', termsAccepted: false });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (isLogin) {
        if (!formData.email && !formData.username) {
             // Supabase defaults to email usually, unless username handling is custom. 
             // Assuming User inputs email in username field or we strictly ask for email. 
             // The form asks for "Username" in placeholder but assumes it's the identifier.
             // Standard Supabase is Email/Password. Let's assume input can be email.
            setError(language === 'English' ? 'Please enter email' : 'ইমেইল দিন');
            return;
        }
        if (!formData.password) {
            setError(t.passwordPlaceholder);
            return;
        }
    } else {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError(language === 'English' ? 'Please fill in all fields' : 'সব ঘর পূরণ করুন');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError(language === 'English' ? 'Passwords do not match' : 'পাসওয়ার্ড মিলছে না');
            return;
        }
        if (!formData.termsAccepted) {
            setError(language === 'English' ? 'You must agree to the Terms & Conditions' : 'আপনাকে শর্তাবলীতে সম্মত হতে হবে');
            return;
        }
    }

    setLoading(true);

    try {
        if (isLogin) {
            // LOGIN
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.username, // Assuming username field holds email for simple Supabase connection
                password: formData.password,
            });

            if (error) throw error;
            navigate('/home');

        } else {
            // SIGN UP
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        username: formData.username,
                    }
                }
            });

            if (error) throw error;
            
            // If email confirmation is enabled, user might not be logged in immediately.
            // Check session or prompt to check email.
            if (data.session) {
                navigate('/home');
            } else {
                 alert('Registration successful! Please check your email to confirm your account.');
                 setIsLogin(true);
            }
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${window.location.origin}/home`,
            }
        });
        if (error) throw error;
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
  };


  return (
    <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-t-3xl rounded-b-none md:rounded-3xl overflow-hidden shadow-2xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 mx-0 transition-colors duration-500 my-0 md:my-0 min-h-[600px] font-caviler">
      
      {/* --- Left Column: Login Form --- */}
      <div className={`p-5 md:p-8 relative z-10 flex flex-col justify-center h-full transition-all duration-500 ${!isLogin ? 'hidden md:flex md:opacity-0 md:pointer-events-none' : 'flex'}`}>
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-4">
             <img src="/logo.svg" alt="Ghurnibook" className="w-8 h-8 md:w-10 md:h-10" />
             <span className="text-2xl md:text-3xl text-turf-green-800 dark:text-turf-green-400 tracking-wide font-caviler">Ghurnibook</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2 md:mb-2 tracking-tight">{t.startPlanning}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-xs md:max-w-sm">{t.description}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 w-full">
          <div className="space-y-4 text-left">
              <InputField 
                label={t.username}
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange({ target: { name: 'username', value: e.target.value } })}
                placeholder={language === 'English' ? "Email address" : "ইমেইল"}
                icon={User}
              />
              <div className="relative">
                <InputField 
                    label={t.password}
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange({ target: { name: 'password', value: e.target.value } })}
                    placeholder={t.passwordPlaceholder}
                    icon={Lock}
                    isPasswordToggle={true}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                />
             </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg animate-pulse">
                {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="checkbox-container">
              <input type="checkbox" className="peer" />
              <svg viewBox="0 0 64 64" className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 transition-all">
                <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" className="checkbox-path"></path>
              </svg>
              <span className="text-gray-600 dark:text-gray-400 font-medium text-xs md:text-sm group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors select-none">{t.rememberMe}</span>
            </label>
            <a href="#" className="font-semibold text-turf-green-600 hover:text-turf-green-700 dark:text-turf-green-400 hover:underline transition-all text-xs md:text-sm">{t.forgotPassword}</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-10 md:h-12 bg-turf-green-600 hover:bg-turf-green-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-turf-green-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] text-sm md:text-base flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="animate-spin" size={20} /><span>Processing...</span></> : t.login}
          </button>
        </form>

        <div className="flex items-center gap-3 md:gap-4 my-6 md:my-6 w-full">
            <div className="h-px flex-1 bg-gray-100 dark:bg-zinc-800"></div>
            <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">{t.continueWith}</span>
            <div className="h-px flex-1 bg-gray-100 dark:bg-zinc-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
           <SocialButton iconSrc="/google.svg" altText="Google" label={t.signInGoogle} onClick={() => handleSocialLogin('google')} />
           <SocialButton iconSrc="/facebook.svg" altText="Facebook" label={t.signInFacebook} onClick={() => handleSocialLogin('facebook')} />
           <SocialButton iconSrc="/X.svg" altText="X" label={t.signInX} onClick={() => handleSocialLogin('twitter')} />
        </div>

        <div className="mt-8 text-center space-y-4">
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
            {t.noAccount} <button onClick={toggleAuthMode} className="font-bold text-turf-green-600 hover:text-turf-green-700 dark:text-turf-green-400 hover:underline transition-colors ml-1">{t.createAccount}</button>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-white/5">
             <div className="flex items-center justify-center gap-4 text-[10px] md:text-xs text-gray-500 dark:text-gray-500 font-medium">
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">{t.privacyPolicy}</a>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700"></span>
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">{t.termsConditions}</a>
             </div>
             <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-600">
                <Lock size={10} />
                <span>{t.securedBy} <span className="font-semibold text-gray-500 dark:text-gray-400">Ghurnibook</span></span>
             </div>
          </div>
        </div>
      </div>

      {/* --- Right Column: Sign Up Form --- */}
      <div className={`p-4 md:p-8 relative z-10 flex flex-col justify-center h-full transition-all duration-500 ${isLogin ? 'hidden md:flex md:opacity-0 md:pointer-events-none' : 'flex'}`}>
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4 md:mb-4">
          <div className="flex items-center gap-2 md:gap-2 mb-2 md:mb-1">
             <img src="/logo.svg" alt="Ghurnibook" className="w-6 h-6 md:w-8 md:h-8" />
             <span className="text-xl md:text-2xl text-turf-green-800 dark:text-turf-green-400 tracking-wide font-caviler">Ghurnibook</span>
          </div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1 md:mb-1 tracking-tight">{t.createAccount}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm max-w-xs md:max-w-sm">{t.description}</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3 w-full">
           <div className="grid grid-cols-1 gap-2 md:gap-3">
              <div className="grid grid-cols-2 gap-2">
                  <InputField 
                        label={t.firstName}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder={t.firstNamePlaceholder}
                        icon={User}
                        variant="compact"
                  />
                  <InputField 
                        label={t.lastName}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder={t.lastNamePlaceholder}
                        icon={User}
                        variant="compact"
                  />
              </div>
              <InputField 
                    label={t.username}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder={t.usernamePlaceholder}
                    icon={User}
                    variant="compact"
              />
              <InputField 
                    label={t.email}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.emailPlaceholder}
                    icon={Mail}
                    variant="compact"
              />
              <div className="relative">
                <InputField 
                    label={t.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t.passwordPlaceholder}
                    icon={Lock}
                    isPasswordToggle={true}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    variant="compact"
                />
             </div>
             <div className="relative">
                <InputField 
                    label={t.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t.confirmPasswordPlaceholder}
                    icon={CheckCircle}
                    variant="compact"
                />
             </div>
           </div>

           {/* Terms and Conditions Checkbox */}
           <div className="flex items-start gap-2 mt-1">
              <div className="checkbox-container mt-0.5">
                <input 
                    type="checkbox" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="peer" 
                />
                <svg viewBox="0 0 64 64" className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0 transition-all">
                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" className="checkbox-path"></path>
                </svg>
              </div>
              <label className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-medium leading-tight select-none">
                 {t.agreeTo} <a href="#" className="text-turf-green-600 hover:underline">{t.terms}</a> {t.and} <a href="#" className="text-turf-green-600 hover:underline">{t.privacy}</a>{language === 'Bangla' ? t.accept : ''}
              </label>
           </div>

          {error && (
            <div className="text-red-500 text-xs font-medium text-center bg-red-50 dark:bg-red-900/20 py-1.5 rounded-lg animate-pulse">
                {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-9 md:h-10 bg-turf-green-600 hover:bg-turf-green-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-turf-green-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] text-xs md:text-sm flex items-center justify-center gap-2 mt-1"
          >
            {loading ? <><Loader2 className="animate-spin" size={16} /><span>Processing...</span></> : t.signUp}
          </button>
        </form>

        <div className="flex items-center gap-2 md:gap-3 my-3 md:my-4 w-full">
            <div className="h-px flex-1 bg-gray-100 dark:bg-zinc-800"></div>
            <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">{t.continueWith}</span>
            <div className="h-px flex-1 bg-gray-100 dark:bg-zinc-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
           <SocialButton iconSrc="/google.svg" altText="Google" label={t.signInGoogle} onClick={() => handleSocialLogin('google')} />
           <SocialButton iconSrc="/facebook.svg" altText="Facebook" label={t.signInFacebook} onClick={() => handleSocialLogin('facebook')} />
           <SocialButton iconSrc="/X.svg" altText="X" label={t.signInX} onClick={() => handleSocialLogin('twitter')} />
        </div>

        <div className="mt-4 text-center space-y-2">
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {t.alreadyHaveAccount} <button onClick={toggleAuthMode} className="font-bold text-turf-green-600 hover:text-turf-green-700 dark:text-turf-green-400 hover:underline transition-colors ml-1">{t.loginHere}</button>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-white/5">
             <div className="flex items-center justify-center gap-4 text-[10px] md:text-xs text-gray-500 dark:text-gray-500 font-medium">
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">{t.privacyPolicy}</a>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700"></span>
                <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">{t.termsConditions}</a>
             </div>
             <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-600">
                <Lock size={10} />
                <span>{t.securedBy} <span className="font-semibold text-gray-500 dark:text-gray-400">Ghurnibook</span></span>
             </div>
          </div>
        </div>
      </div>

      {/* --- Image Overlay (Sliding) --- */}
      <div className={`hidden md:block absolute top-0 right-0 w-1/2 h-full z-50 transition-transform duration-700 ease-in-out ${!isLogin ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="absolute inset-2 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <img 
              src="/nature-sidebar.png" 
              alt="Nature" 
              className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute bottom-12 left-8 right-8 z-20 text-white transition-opacity duration-300 ${isLogin ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-12 h-1 bg-turf-green-500 mb-6 rounded-full"></div>
              <p className="text-2xl font-light italic leading-relaxed opacity-95">{t.quote}</p>
              <p className="text-sm font-bold mt-4 tracking-wider uppercase opacity-80">{t.quoteAuthor}</p>
          </div>
           {/* Alternative Content for Signup Side? For now keeping it same or adding a different quote/text could be nice but not requested. 
               Let's just show the same image.
               Maybe fade in different text?
           */}
           <div className={`absolute bottom-12 left-8 right-8 z-20 text-white transition-opacity duration-300 delay-300 ${!isLogin ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-12 h-1 bg-turf-green-500 mb-6 rounded-full"></div>
              <p className="text-2xl font-light italic leading-relaxed opacity-95">{t.description}</p>
              <p className="text-sm font-bold mt-4 tracking-wider uppercase opacity-80">Join Ghurnibook</p>
          </div>
        </div>
      </div>
    
    </div>
  );
}
