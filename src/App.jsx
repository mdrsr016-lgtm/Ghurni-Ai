import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
import NatureAnimatedBackground from './NatureAnimatedBackground';
import GlassCard from './GlassCard';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import Header from './components/Header';

const MainLayout = () => (
  <NatureAnimatedBackground showHero={false} hideToggles={true}>
    <div className="min-h-screen flex flex-col">
       <Header />
       {/* Adjust padding top: h-16 (desktop) or h-30 (mobile) */}
       <main className="flex-1 w-full pt-16 md:pt-16 lg:pt-20">
          <div className="md:hidden h-14"></div> {/* Extra spacer for mobile tabs row */}
          <Outlet />
       </main>
    </div>
  </NatureAnimatedBackground>
);

const Placeholder = ({ title }) => (
  <div className="flex-1 flex items-center justify-center p-6 min-h-[50vh]">
     <div className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center max-w-2xl transform hover:scale-[1.02] transition-transform duration-500">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-turf-green-600 to-emerald-600 dark:from-turf-green-400 dark:to-emerald-400 mb-6 font-caviler tracking-tight">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-zinc-400 text-lg md:text-xl font-medium">
          Something incredible is being built here. <br/> Stay tuned.
        </p>
        <div className="mt-10 flex justify-center gap-2">
           <div className="w-2 h-2 rounded-full bg-turf-green-500/40 animate-bounce"></div>
           <div className="w-2 h-2 rounded-full bg-turf-green-500/60 animate-bounce delay-100"></div>
           <div className="w-2 h-2 rounded-full bg-turf-green-500/80 animate-bounce delay-200"></div>
        </div>
     </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <NatureAnimatedBackground showHero={true}>
             <GlassCard />
          </NatureAnimatedBackground>
        } />
        
        {/* Authenticated Routes with Global Persistent Layout */}
        <Route element={<MainLayout />}>
           <Route path="/home" element={<HomePage />} />
           <Route path="/explore" element={<Placeholder title="Explore" />} />
           <Route path="/map" element={<Placeholder title="Map" />} />
           <Route path="/ai" element={<Placeholder title="Ghurni AI" />} />
           <Route path="/notifications" element={<Placeholder title="Notifications" />} />
           <Route path="/menu" element={<MenuPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
