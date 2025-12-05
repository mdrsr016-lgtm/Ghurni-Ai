/**
 * Validation Utilities
 * 
 * Provides enhanced validation functions for form inputs
 */

/**
 * Validates email address with stricter rules
 * - Requires valid format with @ symbol
 * - Requires domain with at least 2 character TLD
 * - Prevents common typos
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || !email.trim()) return false;
  
  // More strict email validation
  // Requires: username@domain.tld where tld is at least 2 chars
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  return emailRegex.test(email.trim());
};

/**
 * Maps Supabase authentication errors to user-friendly messages
 */
export const getErrorMessage = (error: any): string => {
  if (!error) return "An unexpected error occurred";
  
  const errorMessage = error.message || error.toString();
  
  // Map common Supabase auth errors to friendly messages
  if (errorMessage.includes("Invalid login credentials")) {
    return "Email or password is incorrect. Please try again.";
  }
  
  if (errorMessage.includes("Email not confirmed")) {
    return "Please verify your email address before signing in. Check your inbox for the verification link.";
  }
  
  if (errorMessage.includes("User already registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  
  if (errorMessage.includes("Password should be at least")) {
    return "Password must be at least 6 characters long.";
  }
  
  if (errorMessage.includes("Unable to validate email address")) {
    return "Please enter a valid email address.";
  }
  
  if (errorMessage.includes("Email rate limit exceeded")) {
    return "Too many attempts. Please wait a few minutes before trying again.";
  }
  
  if (errorMessage.includes("Invalid email")) {
    return "Please enter a valid email address.";
  }
  
  if (errorMessage.includes("Signup requires a valid password")) {
    return "Please enter a valid password.";
  }
  
  if (errorMessage.includes("Network request failed")) {
    return "Network error. Please check your connection and try again.";
  }
  
  // Return original message if no mapping found
  return errorMessage;
};

/**
 * Validates username format
 * - Minimum 3 characters
 * - Only alphanumeric and underscores
 * - Cannot start with a number
 */
export const isValidUsername = (username: string): boolean => {
  if (!username || username.length < 3) return false;
  
  // Username: 3+ chars, alphanumeric + underscore, can't start with number
  const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{2,}$/;
  
  return usernameRegex.test(username);
};
