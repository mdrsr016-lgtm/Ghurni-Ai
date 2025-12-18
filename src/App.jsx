import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NatureAnimatedBackground from './NatureAnimatedBackground';
import GlassCard from './GlassCard';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <NatureAnimatedBackground>
             <GlassCard />
          </NatureAnimatedBackground>
        } />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
