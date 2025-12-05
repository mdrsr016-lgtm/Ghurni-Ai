/**
 * App.tsx - Main Application Router
 * 
 * RESPONSIBILITY: Manages routing and session state for the entire application.
 * - Initializes and monitors Supabase session
 * - Routes authenticated users to Home page (/)
 * - Routes unauthenticated users to Auth page (/auth)
 * - Prevents authenticated users from accessing /auth
 * - Prevents unauthenticated users from accessing /
 * 
 * FLOW:
 * 1. User visits app → Check session
 * 2. No session → Redirect to /auth (Auth.tsx)
 * 3. User logs in → Session created → Redirect to / (Home.tsx)
 * 4. User clicks logout → Session destroyed → Redirect to /auth
 */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "./lib/supabase";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      console.log('[App] Supabase not configured');
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[App] Error getting session:', error.message);
        // If there's an error (like clock skew), clear the session
        setSession(null);
      } else {
        console.log('[App] Initial session:', session ? 'EXISTS' : 'NULL');
        setSession(session);
      }
      setIsLoading(false);
    }).catch((err) => {
      console.error('[App] Failed to get session:', err);
      setSession(null);
      setIsLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[App] Auth state changed:', event, 'Session:', session ? 'EXISTS' : 'NULL');
      
      // Handle specific events
      if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(session);
      } else if (event === 'USER_UPDATED') {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  console.log('[App] Rendering with session:', session ? 'EXISTS' : 'NULL');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <Home userEmail={session.user.email} /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={!session ? <Auth /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
