import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { sportsList, categories } from '../data/sports';
import * as Icons from 'lucide-react';

export default function SportsSelection() {
  const { selectSport, user, logout } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSports = sportsList.filter(sport => {
    const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || sport.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-darkBg text-white px-4 py-8 md:px-8">
      {/* Background Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-accentBlue/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-accentCyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between mb-12 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs text-accentBlue font-bold tracking-widest uppercase">System Activated</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
            CHOOSE YOUR <span className="text-neon-gradient">SPORT</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Welcome, {user?.name || 'Athlete'}. Select a discipline to calibrate AI metrics.</p>
        </div>
        <button
          onClick={logout}
          className="self-start md:self-auto mt-4 md:mt-0 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 transition duration-300"
        >
          Sign Out
        </button>
      </div>

      {/* Search & Categories Console */}
      <div className="max-w-7xl mx-auto mb-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Icons.Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search from 40 sports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-sm text-white font-medium"
            />
          </div>

          {/* Quick Stats Banner */}
          <div className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center space-x-3 text-xs md:text-sm text-gray-300">
            <Icons.Activity className="w-5 h-5 text-accentBlue animate-pulse" />
            <span>Telemetry: <strong className="text-white">40 Disciplines Loaded</strong></span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-black shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sports Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredSports.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredSports.map((sport, index) => {
              const IconComponent = Icons[sport.icon] || Icons.HelpCircle;
              return (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                  onClick={() => selectSport(sport.id)}
                  className="glow-card glass-panel rounded-2xl p-6 border border-white/5 cursor-pointer relative overflow-hidden group"
                >
                  {/* Subtle Gradient Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accentBlue/5 rounded-full blur-2xl group-hover:bg-accentBlue/10 transition duration-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-transparent border-b border-l border-white/0 group-hover:border-accentBlue/30 transition duration-300" />

                  {/* Sport Icon */}
                  <div className="mb-4 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-gradient-to-r group-hover:from-accentBlue/20 group-hover:to-accentCyan/20 group-hover:border-accentBlue/30 transition duration-300">
                    <IconComponent className="w-6 h-6 text-accentBlue group-hover:text-white transition duration-300" />
                  </div>

                  {/* Sport Details */}
                  <h3 className="text-lg font-bold tracking-wide group-hover:text-accentBlue transition duration-300">
                    {sport.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {sport.desc}
                  </p>

                  <div className="mt-4 flex items-center space-x-1.5 text-xs text-accentBlue font-bold tracking-wider opacity-0 group-hover:opacity-100 transition duration-300">
                    <span>LAUNCH PORTAL</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
            <Icons.AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-medium">No disciplines match your parameters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }} 
              className="mt-4 text-xs font-bold text-accentBlue hover:underline tracking-widest uppercase"
            >
              Reset Search Parameters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
