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
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <Home userEmail={session.user.email} /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!session ? <Auth /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
