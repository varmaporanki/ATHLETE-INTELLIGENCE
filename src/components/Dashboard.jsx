import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { quotes } from '../data/quotes';
import VideoAnalyzer from './VideoAnalyzer';
import NutritionPredictor from './NutritionPredictor';
import OpponentPredictor from './OpponentPredictor';
import CoachChatbot from './CoachChatbot';
import * as Icons from 'lucide-react';

export default function Dashboard() {
  const { selectedSport, activeModule, setActiveModule, setCurrentScreen, user } = useApp();
  const [quote, setQuote] = useState(quotes[0]);

  // Rotate quotes in the dashboard header banner occasionally
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }, 8000);
    return () => clearInterval(quoteInterval);
  }, []);

  if (!selectedSport) {
    setCurrentScreen('sports_selection');
    return null;
  }

  // Map modules to Icons and display text
  const modules = [
    { id: 'analyzer', name: 'Video Analyzer', icon: Icons.Cpu, desc: 'Biomechanical Pose Overlay' },
    { id: 'nutrition', name: 'Nutrition Planner', icon: Icons.Apple, desc: 'Match Day Fuel Protocols' },
    { id: 'opponent', name: 'Opponent Predictor', icon: Icons.Target, desc: 'Tactical Playbook Counters' },
    { id: 'coach', name: 'AI Coach Chat', icon: Icons.MessageSquare, desc: 'Conversational Neural Advisor' }
  ];

  return (
    <div className="relative min-h-screen bg-darkBg text-white flex flex-col lg:flex-row">
      {/* Sidebar for Desktop / Header Drawer for Mobile */}
      <aside className="w-full lg:w-72 bg-darkCard/30 lg:border-r border-white/5 flex flex-col justify-between shrink-0 glass-panel-heavy z-20">
        <div>
          {/* Logo & Portal Selector */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icons.Zap className="w-6 h-6 text-accentBlue" />
              <span className="font-extrabold tracking-wider text-sm">ATHLETE INTEL</span>
            </div>
            <button
              onClick={() => setCurrentScreen('sports_selection')}
              className="px-2 py-1 text-[10px] font-bold bg-white/5 rounded border border-white/10 hover:bg-white/10 text-accentBlue uppercase tracking-wider"
            >
              Portal Exit
            </button>
          </div>

          {/* Active Sport Badge */}
          <div className="p-6 border-b border-white/5 bg-gradient-to-r from-accentBlue/5 to-transparent">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Active Portal</span>
            <div className="flex items-center space-x-3 mt-1.5">
              <div className="w-9 h-9 rounded-lg bg-accentBlue/10 flex items-center justify-center border border-accentBlue/20">
                {/* Dynamically extract icon for selected sport */}
                {React.createElement(Icons[selectedSport.icon] || Icons.Award, { className: "w-5 h-5 text-accentBlue" })}
              </div>
              <div>
                <h2 className="text-base font-extrabold tracking-wide uppercase text-white leading-tight">
                  {selectedSport.name}
                </h2>
                <span className="text-[10px] text-accentCyan font-bold uppercase tracking-widest">
                  {selectedSport.category} Area
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {modules.map((mod) => {
              const IconComp = mod.icon;
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center space-x-3.5 transition-all duration-300 relative group ${
                    isActive
                      ? 'bg-gradient-to-r from-accentBlue/10 to-accentCyan/10 border-l-[3px] border-accentBlue text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-[3px] border-transparent'
                  }`}
                >
                  <IconComp className={`w-5 h-5 shrink-0 ${isActive ? 'text-accentBlue' : 'text-gray-400 group-hover:text-white transition'}`} />
                  <div>
                    <span className="text-sm block leading-tight">{mod.name}</span>
                    <span className="text-[9px] text-gray-500 font-semibold block uppercase mt-0.5 tracking-wider">
                      {mod.desc}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accentBlue animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Stats/Log out Footer */}
        <div className="p-6 border-t border-white/5 bg-black/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accentBlue to-accentCyan flex items-center justify-center text-xs font-extrabold text-black">
                {user?.name ? user.name[0] : 'A'}
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold block max-w-[120px] truncate">{user?.name || 'ATHLETE'}</span>
                <span className="text-[9px] text-gray-500 block truncate font-mono">Class-A Link</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('auth')}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition"
              title="Disconnect"
            >
              <Icons.LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Banner/Header with Quotes */}
        <header className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center md:justify-between bg-black/15 shrink-0">
          <div className="mb-4 md:mb-0">
            <span className="text-[10px] text-accentBlue font-extrabold tracking-widest uppercase">Performance Hub</span>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider mt-0.5">
              {modules.find(m => m.id === activeModule)?.name}
            </h1>
          </div>

          {/* Motivational banner ticker */}
          <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 max-w-md flex items-center space-x-3 text-xs md:text-sm text-gray-300">
            <Icons.Quote className="w-4 h-4 text-accentCyan shrink-0 rotate-180" />
            <span className="italic line-clamp-1">
              "{quote.text}" — <strong className="text-white not-italic text-xs font-semibold">{quote.author}</strong>
            </span>
          </div>
        </header>

        {/* Dynamic Portal Screen Frame */}
        <div className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeModule === 'analyzer' && <VideoAnalyzer />}
          {activeModule === 'nutrition' && <NutritionPredictor />}
          {activeModule === 'opponent' && <OpponentPredictor />}
          {activeModule === 'coach' && <CoachChatbot />}
        </div>
      </main>
    </div>
  );
}
