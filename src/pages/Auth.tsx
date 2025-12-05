/**
 * Auth.tsx - Authentication Page
 * 
 * RESPONSIBILITY: Handles login and signup UI and form submission only.
 * - Displays login/signup forms
 * - Validates user input
 * - Submits credentials to Supabase
 * - Shows success/error messages
 * 
 * DOES NOT:
 * - Manage session state (handled by App.tsx)
 * - Handle routing (handled by App.tsx)
 * - Handle logout (handled by Home.tsx via Header)
 * 
 * After successful login, App.tsx will detect the session change
 * and automatically redirect to the Home page.
 */
import React, { useState, useEffect } from "react";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Phone,
  AtSign,
  Loader2,
  X,
  Mail,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useWallpaper } from "../lib/hooks";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { LogoIcon, GoogleIcon, FacebookIcon } from "../components/Icons";
import { isValidEmail, getErrorMessage } from "../utils/validation";

// --- HOOKS ---
// (Extracted to src/lib/hooks.ts)

// --- COMPONENTS ---
const SocialButton = ({
  icon,
  label,
  className,
  onClick,
  disabled,
  isLoading,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`group relative flex items-center justify-center w-full px-6 py-3 rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <div className="absolute left-6 flex items-center justify-center z-10">
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
    </div>
    <span className="relative z-10 text-white font-medium tracking-wide text-sm sm:text-base">
      {label}
    </span>
    {/* Shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0" />
  </button>
);

const Auth: React.FC = () => {
  const { currentSrc, isLoading, setIsLoading } = useWallpaper();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Auth State
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  // UI Feedback State
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Realtime Username Verification State
  const [isVerifyingUser, setIsVerifyingUser] = useState(false);
  const [isUserAvailable, setIsUserAvailable] = useState<boolean | null>(null);

  // Note: Session management is handled by App.tsx
  // This component only handles the login/signup UI and form submission

  // Clear errors when switching modes
  useEffect(() => {
    setFormError("");
    setFieldErrors({});
    setSuccessMsg("");
  }, [isSignUp]);

  // Real Username Verification with Supabase
  useEffect(() => {
    if (!isSignUp || !isSupabaseConfigured) return;

    // Reset state if empty
    if (!signupData.username) {
      setIsVerifyingUser(false);
      setIsUserAvailable(null);
      return;
    }

    // Basic format validation first
    if (signupData.username.length < 3) {
      setIsVerifyingUser(false);
      setIsUserAvailable(false);
      return;
    }

    setIsVerifyingUser(true);
    setIsUserAvailable(null);

    // Debounce the check
    const timer = setTimeout(async () => {
      try {
        // Check if username exists in user metadata
        // Note: This queries auth.users metadata. Adjust if you have a separate profiles table
        const { data, error } = await supabase.rpc('check_username_availability', {
          username_to_check: signupData.username
        });

        if (error) {
          // If RPC doesn't exist, fall back to basic validation
          console.warn('Username check RPC not found, using basic validation');
          setIsUserAvailable(signupData.username.length > 3);
        } else {
          setIsUserAvailable(data);
        }
      } catch (err) {
        console.error('Username check error:', err);
        // Fallback to basic validation
        setIsUserAvailable(signupData.username.length > 3);
      } finally {
        setIsVerifyingUser(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [signupData.username, isSignUp]);

  // Helper to Validate a Single Field
  const validateSingleField = (
    name: string,
    value: any,
    context: "signin" | "signup",
    data: any
  ) => {
    if (context === "signup") {
      switch (name) {
        case "fullName":
          return !value.trim() ? "Full name is required" : "";
        case "email":
          if (!value.trim()) return "Email is required";
          // Use stricter validation from utility
          if (!isValidEmail(value)) return "Invalid email address";
          return "";
        case "phone":
          if (!value) return "Phone number is required";
          // Validate phone number format
          if (!isValidPhoneNumber(value)) return "Invalid phone number";
          return "";
        case "username":
          return !value.trim() ? "Username is required" : "";
        case "password":
          if (!value) return "Password is required";
          if (value.length < 6) return "Password must be at least 6 characters";
          return "";
        case "confirmPassword":
          if (!value) return "Please confirm your password";
          if (value !== data.password) return "Passwords do not match";
          return "";
        case "agreed":
          return !value ? "You must agree to the terms" : "";
        default:
          return "";
      }
    } else {
      switch (name) {
        case "email":
          if (!value.trim()) return "Email is required";
          if (!isValidEmail(value)) return "Invalid email address";
          return "";
        case "password":
          return !value ? "Password is required" : "";
        default:
          return "";
      }
    }
  };

  const handleBlur = (field: string, context: "signin" | "signup") => {
    const data = context === "signup" ? signupData : signinData;
    // @ts-ignore
    const value = data[field];
    const error = validateSingleField(field, value, context, data);

    setFieldErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSignupChange = (field: string, value: any) => {
    // 1. Calculate New State
    const newState = { ...signupData, [field]: value };
    setSignupData(newState);

    // 2. Clear Global Error
    setFormError("");

    // 3. Realtime Validation (Only if error exists or for specific interactions)
    let error = "";

    // Special Case: Password matching should update in realtime if confirmed
    if (field === "password" && newState.confirmPassword) {
      if (newState.confirmPassword !== value) {
        setFieldErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }

    // Standard: If field has error, re-validate to see if we can clear it
    if (fieldErrors[field]) {
      error = validateSingleField(field, value, "signup", newState);
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSigninChange = (field: string, value: any) => {
    // 1. Calculate New State
    const newState = { ...signinData, [field]: value };
    setSigninData(newState);
    setFormError("");

    // 2. Realtime Validation (Only if error exists)
    if (fieldErrors[field]) {
      const error = validateSingleField(field, value, "signin", newState);
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const data = isSignUp ? signupData : signinData;
    const context = isSignUp ? "signup" : "signin";

    // Validate all fields based on context
    Object.keys(data).forEach((field) => {
      // @ts-ignore
      const error = validateSingleField(field, data[field], context, data);
      if (error) {
        errors[field] = error;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAuth = async () => {
    setFormError("");
    setSuccessMsg("");

    if (!isSupabaseConfigured) {
      setFormError(
        "Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: signupData.email,
          password: signupData.password,
          options: {
            data: {
              full_name: signupData.fullName,
              username: signupData.username,
              phone: signupData.phone,
            },
          },
        });

        if (error) throw error;

        console.log("Sign Up Success:", data);
        setSuccessMsg(
          "Account created! Please check your email to verify your account."
        );
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: signinData.email,
          password: signinData.password,
        });

        if (error) throw error;

        console.log("Sign In Success:", data);
        // Success message handled by onAuthStateChange
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setFormError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setFormError("");
    if (!isSupabaseConfigured) {
      setFormError(
        "Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
      );
      return;
    }

    setSocialLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          // Force localhost:3000 in dev to match Supabase whitelist, avoiding Vercel fallback
          redirectTo: import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setFormError(getErrorMessage(err));
      setSocialLoading(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!isSupabaseConfigured) {
      setFormError("Supabase not configured.");
      return;
    }

    const email = resetEmail || signinData.email;
    if (!email || !isValidEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setSuccessMsg("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccessMsg("Password reset email sent! Please check your inbox.");
      setShowForgotPassword(false);
      setResetEmail("");
    } catch (err: any) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logout is handled by Home.tsx via the Header component
  // This Auth page is only for login/signup

  // Determine if the submit button should be disabled

  // If logged in, show a simple dashboard for now (can be expanded later)
  // Session handling is now done in parent App.tsx for routing, 
  // but we might still use it here for state updates or listener if needed.
  // However, the conditional rendering of the dashboard is removed.


  return (
    <main className="relative w-full min-h-[100dvh] overflow-hidden text-white font-sans selection:bg-rose-500/30">
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="mesh-gradient-bg absolute inset-0 w-full h-full" />

        {/* Image Overlay */}
        {currentSrc && (
          <div
            className={`absolute inset-0 w-full h-full bg-black/40 transition-all duration-[2500ms] ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
              isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          >
            <img
              src={currentSrc}
              alt="Destination"
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          </div>
        )}
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full h-[100dvh] overflow-hidden">
        <div
          className="
          absolute inset-0 w-full h-full 
          overflow-y-auto                 /* Mobile: Enable scroll */
          tab:overflow-hidden             /* Tablet+: Lock scroll */
          tab:flex tab:items-center tab:justify-center /* Tablet: Center */
          laptop:justify-end laptop:p-16  /* Laptop: Right Align */
          desktop:p-24                    /* Desktop: More padding */
          transition-all duration-500 scroll-smooth
        "
        >
          {/* Mobile Spacer */}
          <div
            className="w-full h-[50dvh] landscape:h-4 shrink-0 block tab:hidden pointer-events-none transition-all duration-300"
            aria-hidden="true"
          />

          {/* Login Card Container */}
          <div
            className="
            /* --- MOBILE BASE --- */
            w-full min-h-[50dvh] 
            glass-panel 
            rounded-t-[2.5rem] rounded-b-none 
            p-6 sm:p-8 
            flex flex-col items-center 
            animate-card-entry relative shrink-0 
            shadow-2xl 
            border-x-0 border-b-0 
            backdrop-blur-3xl 
            mb-0
            
            /* --- TRANSITION --- */
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            
            /* --- TABLET --- */
            tab:w-full tab:max-w-[30rem] 
            tab:min-h-0 tab:h-auto 
            tab:rounded-3xl tab:rounded-b-3xl
            tab:border tab:border-white/10
            tab:mx-auto tab:p-10
            
            /* --- LAPTOP --- */
            laptop:w-full laptop:max-w-[32rem]
            laptop:mr-0 laptop:mx-0
            
            /* --- DESKTOP --- */
            desktop:max-w-[35rem]
            wide:max-w-[38rem]
            
            /* --- 4K / 5K --- */
            4k:max-w-[40rem] 4k:p-16 4k:rounded-[3rem] 4k:border-2
          "
          >
            {/* Card Header Row */}
            <div className="w-full flex justify-between items-center mb-6 sm:mb-8 4k:mb-12 z-20 shrink-0">
              {/* Brand */}
              <div className="flex items-center gap-2 tab:gap-3 laptop:gap-4 4k:gap-5 transition-all duration-300">
                <div className="w-8 h-8 tab:w-10 tab:h-10 laptop:w-12 laptop:h-12 4k:w-16 4k:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-sm transition-all duration-300">
                  <LogoIcon className="w-5 h-5 tab:w-6 tab:h-6 laptop:w-7 laptop:h-7 4k:w-10 4k:h-10 text-white transition-all duration-300" />
                </div>
                {/* UNIFIED TEXT STYLE: Responsive Sizing */}
                <span className="font-caviler text-2xl tab:text-3xl laptop:text-4xl 4k:text-5xl font-bold tracking-widest text-white pt-1 transition-all duration-300">
                  Ghurni Ai
                </span>
              </div>
              {/* Sign Up / Sign In Toggle Button */}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="px-4 py-2 4k:px-8 4k:py-4 text-xs 4k:text-lg font-bold tracking-wide uppercase bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-white hover:text-white/90"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>

            {/* Main Content Container */}
            <div className="w-full flex flex-col items-center text-center shrink-0">
              {/* Title */}
              <h1
                key={isSignUp ? "signup-title" : "signin-title"}
                className="text-3xl sm:text-4xl 4k:text-6xl font-bold tracking-tight mb-2 flex items-center justify-center gap-3 text-white animate-fade-in-scale"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </span>
                <span className="hidden sm:inline">👋</span>
              </h1>

              <p
                key={isSignUp ? "signup-desc" : "signin-desc"}
                className="text-white/60 font-light text-sm sm:text-base 4k:text-2xl mb-6 sm:mb-8 4k:mb-12 max-w-xs 4k:max-w-xl mx-auto leading-relaxed animate-fade-in-scale animate-delay-100"
              >
                {isSignUp
                  ? "Join the community of explorers."
                  : "Plan your next adventure with intelligent insights."}
              </p>

              {/* Supabase Missing Config Warning */}
              {!isSupabaseConfigured && (
                <div className="w-full mb-6 p-4 rounded-xl text-sm font-medium bg-amber-500/10 text-amber-200 border border-amber-500/20 flex flex-col gap-2 items-center text-center animate-fade-in-scale">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span className="font-bold">Supabase Not Connected</span>
                  </div>
                  <span className="text-xs opacity-80">
                    Add <code>VITE_SUPABASE_URL</code> and{" "}
                    <code>VITE_SUPABASE_ANON_KEY</code> to your environment
                    variables to enable login.
                  </span>
                </div>
              )}

              {/* General Feedback Message Area */}
              {(formError || successMsg) && (
                <div
                  className={`w-full mb-4 p-3 rounded-lg text-sm font-medium animate-fade-in-scale flex items-center justify-center gap-2 ${
                    formError
                      ? "bg-red-500/10 text-red-200 border border-red-500/20"
                      : "bg-green-500/10 text-green-200 border border-green-500/20"
                  }`}
                >
                  {formError ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>{formError || successMsg}</span>
                </div>
              )}

              {/* --- FORM --- */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAuth();
                }}
                className="w-full mb-6 flex flex-col animate-fade-in-up animate-delay-100"
              >
                {/* ----------------------------
                     SIGN UP FIELDS (COLLAPSIBLE)
                 ---------------------------- */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isSignUp
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="flex flex-col gap-4 mb-4">
                      {/* Full Name */}
                      <div className="relative group w-full text-left">
                        <div
                          className={`absolute left-4 4k:left-6 top-3.5 4k:top-6 ${
                            fieldErrors.fullName
                              ? "text-red-400"
                              : "text-white/40 group-focus-within:text-white"
                          } transition-colors duration-300`}
                        >
                          <User className="w-5 h-5 4k:w-8 4k:h-8" />
                        </div>
                        <input
                          type="text"
                          value={signupData.fullName}
                          onChange={(e) =>
                            handleSignupChange("fullName", e.target.value)
                          }
                          onBlur={() => handleBlur("fullName", "signup")}
                          className={`w-full bg-white/5 border rounded-2xl 4k:rounded-3xl py-3.5 4k:py-6 pl-12 4k:pl-20 pr-4 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-all duration-300 text-base 4k:text-2xl ${
                            fieldErrors.fullName
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/10 focus:border-white"
                          }`}
                          placeholder="Full Name"
                        />
                        {fieldErrors.fullName && (
                          <span className="text-red-400 text-xs ml-4 mt-1 block animate-fade-in-up">
                            {fieldErrors.fullName}
                          </span>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="relative group w-full text-left">
                        <div
                          className={`absolute left-4 4k:left-6 top-3.5 4k:top-6 ${
                            fieldErrors.email
                              ? "text-red-400"
                              : "text-white/40 group-focus-within:text-white"
                          } transition-colors duration-300`}
                        >
                          <Mail className="w-5 h-5 4k:w-8 4k:h-8" />
                        </div>
                        <input
                          type="email"
                          value={signupData.email}
                          onChange={(e) =>
                            handleSignupChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email", "signup")}
                          className={`w-full bg-white/5 border rounded-2xl 4k:rounded-3xl py-3.5 4k:py-6 pl-12 4k:pl-20 pr-4 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-all duration-300 text-base 4k:text-2xl ${
                            fieldErrors.email
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/10 focus:border-white"
                          }`}
                          placeholder="Email Address"
                        />
                        {fieldErrors.email && (
                          <span className="text-red-400 text-xs ml-4 mt-1 block animate-fade-in-up">
                            {fieldErrors.email}
                          </span>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="relative group w-full text-left">
                        <div
                          className={`absolute left-4 4k:left-6 top-3.5 4k:top-6 z-10 pointer-events-none ${
                            fieldErrors.phone
                              ? "text-red-400"
                              : "text-white/40 group-focus-within:text-white"
                          } transition-colors duration-300`}
                        >
                          <Phone className="w-5 h-5 4k:w-8 4k:h-8" />
                        </div>
                        <PhoneInput
                          international
                          defaultCountry="US"
                          value={signupData.phone}
                          onChange={(value) => handleSignupChange("phone", value || "")}
                          onBlur={() => handleBlur("phone", "signup")}
                          className={`phone-input-custom ${
                            fieldErrors.phone
                              ? "phone-input-error"
                              : ""
                          }`}
                          numberInputProps={{
                            className: `w-full bg-white/5 border rounded-2xl 4k:rounded-3xl py-3.5 4k:py-6 pl-12 4k:pl-20 pr-4 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-all duration-300 text-base 4k:text-2xl ${
                              fieldErrors.phone
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/10 focus:border-white"
                            }`,
                          }}
                        />
                        {fieldErrors.phone && (
                          <span className="text-red-400 text-xs ml-4 mt-1 block animate-fade-in-up" role="alert">
                            {fieldErrors.phone}
                          </span>
                        )}
                      </div>

                      {/* Username with Realtime Verification */}
                      <div className="relative group w-full text-left">
                        <div
                          className={`absolute left-4 4k:left-6 top-3.5 4k:top-6 ${
                            fieldErrors.username
                              ? "text-red-400"
                              : "text-white/40 group-focus-within:text-white"
                          } transition-colors duration-300`}
                        >
                          <AtSign className="w-5 h-5 4k:w-8 4k:h-8" />
                        </div>
                        <input
                          type="text"
                          value={signupData.username}
                          onChange={(e) =>
                            handleSignupChange("username", e.target.value)
                          }
                          onBlur={() => handleBlur("username", "signup")}
                          className={`w-full bg-white/5 border rounded-2xl 4k:rounded-3xl py-3.5 4k:py-6 pl-12 4k:pl-20 pr-12 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-all duration-300 text-base 4k:text-2xl ${
                            fieldErrors.username
                              ? "border-red-500/50 focus:border-red-500"
                              : isUserAvailable === true
                              ? "border-green-500/50 focus:border-green-500/80"
                              : isUserAvailable === false
                              ? "border-red-500/50 focus:border-red-500/80"
                              : "border-white/10 focus:border-white"
                          }`}
                          placeholder="Choose Username"
                        />
                        {/* Verification Status Icon */}
                        <div className="absolute right-4 4k:right-6 top-3.5 4k:top-6">
                          {isVerifyingUser ? (
                            <Loader2 className="w-5 h-5 4k:w-8 4k:h-8 text-white/50 animate-spin" />
                          ) : isUserAvailable === true ? (
                            <Check className="w-5 h-5 4k:w-8 4k:h-8 text-green-400 animate-zoom-in animate-pulse-glow" />
                          ) : isUserAvailable === false ? (
                            <X className="w-5 h-5 4k:w-8 4k:h-8 text-red-400 animate-shake" />
                          ) : null}
                        </div>
                        {fieldErrors.username && (
                          <span className="text-red-400 text-xs ml-4 mt-1 block animate-fade-in-up">
                            {fieldErrors.username}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ----------------------------
                     SIGN IN FIELDS (COLLAPSIBLE)
                 ---------------------------- */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    !isSignUp
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="mb-4">
                      <div className="relative group w-full text-left">
                        <div
                          className={`absolute left-4 4k:left-6 top-3.5 4k:top-6 ${
                            fieldErrors.email
                              ? "text-red-400"
                              : "text-white/40 group-focus-within:text-white"
                          } transition-colors duration-300`}
                        >
                          <Mail className="w-5 h-5 4k:w-8 4k:h-8" />
                        </div>
                        <input
                          type="email"
                          value={signinData.email}
                          onChange={(e) =>
                            handleSigninChange("email", e.target.value)
                          }
                          onBlur={() => handleBlur("email", "signin")}
                          className={`w-full bg-white/5 border rounded-2xl 4k:rounded-3xl py-3.5 4k:py-6 pl-12 4k:pl-20 pr-4 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-all duration-300 text-base 4k:text-2xl ${
                            fieldErrors.email
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/10 focus:border-white"
                          }`}
                          placeholder="Email Address"
                        />
                        {fieldErrors.email && (
                          <span className="text-red-400 text-xs ml-4 mt-1 block animate-fade-in-up">
                            {fieldErrors.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Input (Always Visible) */}
                <div className="relative group w-full mb-4 text-left">
                  <div
                    className={`absolute left-4 4k:left-6 top-3.5 4k:top-6 ${
                      fieldErrors.password
                        ? "text-red-400"
                        : "text-white/40 group-focus-within:text-white"
                    } transition-colors duration-300`}
                  >
                    <Lock className="w-5 h-5 4k:w-8 4k:h-8" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={isSignUp ? signupData.password : signinData.password}
                    onChange={(e) =>
                      isSignUp
                        ? handleSignupChange("password", e.target.value)
                        : handleSigninChange("password", e.target.value)
                    }
                    onBlur={() =>
                      handleBlur("password", isSignUp ? "signup" : "signin")
                    }
                    className={`w-full bg-white/5 border rounded-2xl 4k:rounded-3xl py-3.5 4k:py-6 pl-12 4k:pl-20 pr-12 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-all duration-300 text-base 4k:text-2xl ${
                      fieldErrors.password
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-white"
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 4k:right-6 top-3.5 4k:top-6 text-white/40 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 4k:w-8 4k:h-8" />
                    ) : (
                      <Eye className="w-5 h-5 4k:w-8 4k:h-8" />
                    )}
                  </button>
                  {fieldErrors.password && (
                    <span className="text-red-400 text-xs ml-4 mt-1 block animate-fade-in-up" role="alert">
                      {fieldErrors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password (Sign Up Only) */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isSignUp
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="mb-4">
                      <div className="relative group w-full text-left">
                        <div
                          className={`absolute left-4 4k:left-6 top-3.5 4k:top-6 ${
                            fieldErrors.confirmPassword
                              ? "text-red-400"
                              : "text-white/40 group-focus-within:text-white"
                          } transition-colors duration-300`}
                        >
                          <Lock className="w-5 h-5 4k:w-8 4k:h-8" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={signupData.confirmPassword}
                          onChange={(e) =>
                            handleSignupChange(
                              "confirmPassword",
                              e.target.value
                            )
                          }
                          onBlur={() => handleBlur("confirmPassword", "signup")}
                          className={`w-full bg-white/5 border rounded-2xl 4k:rounded-3xl py-3.5 4k:py-6 pl-12 4k:pl-20 pr-12 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-all duration-300 text-base 4k:text-2xl ${
                            fieldErrors.confirmPassword
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/10 focus:border-white"
                          }`}
                          placeholder="Confirm Password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                          className="absolute right-4 4k:right-6 top-3.5 4k:top-6 text-white/40 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5 4k:w-8 4k:h-8" />
                          ) : (
                            <Eye className="w-5 h-5 4k:w-8 4k:h-8" />
                          )}
                        </button>
                        {fieldErrors.confirmPassword && (
                          <span className="text-red-400 text-xs ml-4 mt-1 block animate-fade-in-up" role="alert">
                            {fieldErrors.confirmPassword}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remember Me OR Consent Checkbox - Content Fades */}
                <div className="flex flex-col w-full min-h-[1.5rem] 4k:min-h-[2rem] mb-6">
                  <div className="flex justify-between items-start sm:items-center w-full">
                    <label className="flex items-start sm:items-center gap-2.5 4k:gap-4 cursor-pointer group select-none">
                      <div
                        className={`relative mt-1 sm:mt-0 flex items-center justify-center w-4 h-4 4k:w-6 4k:h-6 rounded bg-white/5 border transition-all shrink-0 ${
                          fieldErrors.agreed
                            ? "border-red-400"
                            : isSignUp && !signupData.agreed
                            ? "border-white/20 group-hover:border-red-400"
                            : "border-white/20 group-hover:border-white/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="peer appearance-none absolute inset-0 w-full h-full cursor-pointer opacity-0"
                          checked={
                            isSignUp ? signupData.agreed : signinData.rememberMe
                          }
                          onChange={(e) =>
                            isSignUp
                              ? handleSignupChange("agreed", e.target.checked)
                              : handleSigninChange(
                                  "rememberMe",
                                  e.target.checked
                                )
                          }
                        />
                        <div className="absolute inset-0 bg-violet-600 rounded opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                        <Check
                          className="w-3 h-3 4k:w-5 4k:h-5 text-white opacity-0 peer-checked:opacity-100 relative z-10 transition-opacity duration-200"
                          strokeWidth={3}
                        />
                      </div>

                      <span
                        key={isSignUp ? "signup-consent" : "signin-remember"}
                        className="animate-fade-in-scale text-xs sm:text-sm 4k:text-xl font-medium text-white/50 group-hover:text-white/80 transition-colors text-left leading-tight"
                      >
                        {isSignUp ? (
                          <>
                            I agree to{" "}
                            <a 
                              href="/privacy-policy" 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-300 hover:underline"
                            >
                              Privacy Policy
                            </a>{" "}
                            &{" "}
                            <a 
                              href="/terms-of-service"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-300 hover:underline"
                            >
                              Terms
                            </a>
                          </>
                        ) : (
                          "Remember me"
                        )}
                      </span>
                    </label>

                    {/* Forgot Password Link - Collapsible */}
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        !isSignUp
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden min-h-0">
                        <button 
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-sm 4k:text-xl font-medium text-purple-300/80 hover:text-purple-300 transition-colors whitespace-nowrap"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  </div>
                  {fieldErrors.agreed && (
                    <span className="text-red-400 text-xs mt-1 block animate-fade-in-up text-left">
                      {fieldErrors.agreed}
                    </span>
                  )}
                </div>

                {/* Premium Glass-Morphic Primary Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || (isSignUp && !signupData.agreed)}
                  className={`group relative w-full py-3.5 4k:py-6 rounded-2xl 4k:rounded-3xl overflow-hidden transition-all duration-500 ease-out shadow-2xl shadow-purple-900/40 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
                    isSubmitting || (isSignUp && !signupData.agreed)
                      ? "opacity-50 cursor-not-allowed grayscale-[0.5] brightness-75"
                      : "hover:scale-[1.02] active:scale-[0.98] hover:shadow-purple-700/60 hover:ring-white/30"
                  }`}
                >
                  {/* Deep Atmospheric Background */}
                  <div className="absolute inset-0 bg-[#2e1065] opacity-100" />

                  {/* Gradient Mesh overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Glass Shine (Top) */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-100" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 4k:w-8 4k:h-8 text-white animate-spin" />
                    ) : (
                      <>
                        <span
                          key={isSignUp ? "btn-create" : "btn-signin"}
                          className="text-white font-bold text-lg 4k:text-3xl tracking-widest uppercase drop-shadow-md group-hover:text-white transition-colors animate-fade-in-scale"
                        >
                          {isSignUp ? "Create Account" : "Sign In"}
                        </span>
                        <ArrowRight className="w-5 h-5 4k:w-8 4k:h-8 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </>
                    )}
                  </div>

                  {/* Moving Highlight Effect */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="w-full flex items-center gap-4 mb-6 4k:mb-10 animate-fade-in-up animate-delay-100 opacity-60">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-white/40 text-[10px] 4k:text-sm font-bold uppercase tracking-widest">
                  Or continue with
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* Social Buttons */}
              <div className="w-full space-y-3 4k:space-y-6 animate-fade-in-up animate-delay-200 mb-2">
                <SocialButton
                  icon={<GoogleIcon />}
                  label={socialLoading === "google" ? "Connecting..." : "Continue with Google"}
                  className="bg-white/5 hover:bg-white/10 border-white/10 py-3.5 4k:py-6"
                  onClick={() => handleSocialLogin("google")}
                  disabled={socialLoading !== null}
                  isLoading={socialLoading === "google"}
                />

                <SocialButton
                  icon={<FacebookIcon />}
                  label={socialLoading === "facebook" ? "Connecting..." : "Continue with Facebook"}
                  className="bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border-[#1877F2]/20 py-3.5 4k:py-6"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={socialLoading !== null}
                  isLoading={socialLoading === "facebook"}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 4k:mt-12 pt-4 w-full border-t border-white/5 animate-fade-in-up animate-delay-200 shrink-0 flex flex-col items-center gap-4">
              {/* Privacy Links */}
              <div className="flex items-center justify-center space-x-4 text-[10px] 4k:text-sm text-white/30 uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">
                  Help
                </a>
              </div>

              {/* Mobile/Tablet Badge - Visible inside card */}
              <div className="flex laptop:hidden items-center space-x-2 text-white/30 text-[10px] backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 bg-black/10">
                <Lock className="w-3 h-3" />
                <span>Secured by Ghurni ID</span>
              </div>
            </div>
          </div>

          {/* Bottom secured badge (Desktop Only - 'laptop' and up) */}
          <div className="hidden laptop:flex w-full absolute bottom-8 left-12 w-auto animate-fade-in-up animate-delay-200 pointer-events-none z-0">
            <div className="flex items-center space-x-2 text-white/30 text-xs 4k:text-xl backdrop-blur-sm px-3 4k:px-6 py-1 4k:py-2 rounded-full border border-white/5 bg-black/10">
              <Lock className="w-3 h-3 4k:w-6 4k:h-6" />
              <span>Secured by Ghurni ID</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
