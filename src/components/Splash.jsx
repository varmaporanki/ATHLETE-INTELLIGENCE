import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quotes } from '../data/quotes';
import { useApp } from '../context/AppContext';
import { Zap } from 'lucide-react';

export default function Splash() {
  const { setCurrentScreen } = useApp();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 2500);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-darkBg text-white px-4">
      {/* Background Grid & Neon Halo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Pulsing Light Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accentBlue/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-accentCyan/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Futuristic Concentric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-accentBlue/10 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '6s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-accentCyan/20 rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: [1, 1.1, 1], rotate: 0 }}
          transition={{ 
            duration: 1.5,
            ease: "easeOut",
            times: [0, 0.5, 1],
            loop: Infinity
          }}
          className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-tr from-accentBlue to-accentCyan flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.4)]"
        >
          <Zap className="w-8 h-8 text-black stroke-[2.5]" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl md:text-6xl font-extrabold tracking-wider mb-2 font-sans"
        >
          ATHLETE <span className="text-neon-gradient">INTELLIGENCE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400 font-medium mb-16"
        >
          Next-Gen AI Sports Coaching Ecosystem
        </motion.p>

        {/* Quotes Carousel */}
        <div className="h-24 flex flex-col justify-center items-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <p className="text-lg md:text-2xl font-light italic text-gray-200 leading-relaxed font-sans max-w-lg">
                "{quotes[quoteIndex].text}"
              </p>
              <p className="text-xs tracking-widest text-accentBlue uppercase mt-3 font-semibold font-sans">
                — {quotes[quoteIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Loading Status Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-accentBlue to-accentCyan"
          />
        </div>
        <p className="text-[10px] tracking-widest text-gray-500 uppercase animate-pulse">
          Calibrating Neural Sensors...
        </p>
      </div>

      {/* Skip Button */}
      <button 
        onClick={() => setCurrentScreen('auth')}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold tracking-wider hover:bg-white/10 transition duration-300"
      >
        Skip Intro
      </button>
    </div>
  );
}
