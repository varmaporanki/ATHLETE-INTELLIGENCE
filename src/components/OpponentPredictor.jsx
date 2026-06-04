import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getOpponentReport } from '../data/opponentData';
import { Target, Upload, FileText, Cpu, AlertTriangle, ShieldCheck, Zap, RefreshCw, Video } from 'lucide-react';

export default function OpponentPredictor() {
  const { selectedSport } = useApp();
  const [inputMode, setInputMode] = useState('upload'); // 'upload' or 'manual'
  const [predictState, setPredictState] = useState('idle'); // 'idle', 'processing', 'completed'
  const [report, setReport] = useState(null);
  
  // Manual Input States
  const [playstyle, setPlaystyle] = useState('balanced');
  const [dominantSide, setDominantSide] = useState('right');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Processing States
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    if (selectedSport) {
      setReport(getOpponentReport(selectedSport.id));
      setPredictState('idle');
    }
  }, [selectedSport]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      triggerAnalysis();
    }
  };

  const triggerAnalysis = () => {
    setPredictState('processing');
    
    const steps = [
      "Analyzing player spatial patterns...",
      "Mapping movement velocities...",
      "Identifying biomechanical tells...",
      "Correlating tactical triggers...",
      "Synthesizing counter adjustments..."
    ];
    
    let i = 0;
    setLoadingText(steps[0]);
    
    const interval = setInterval(() => {
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setPredictState('completed');
      } else {
        setLoadingText(steps[i]);
      }
    }, 1000);
  };

  const resetPredictor = () => {
    setPredictState('idle');
    setAdditionalNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] text-accentBlue font-bold uppercase tracking-widest">Tactical Center</span>
          <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Opponent Strategy Prediction</h2>
          <p className="text-xs text-gray-400 mt-1">
            Detect gameplay tendencies and calculate counter blueprints for <strong className="text-white uppercase">{selectedSport.name}</strong>.
          </p>
        </div>

        {/* Input Mode Selector */}
        {predictState === 'idle' && (
          <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto self-stretch md:self-auto shrink-0">
            <button
              onClick={() => setInputMode('upload')}
              className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
                inputMode === 'upload'
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-black shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Video Scan</span>
            </button>
            <button
              onClick={() => setInputMode('manual')}
              className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
                inputMode === 'manual'
                  ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-black shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Manual Telemetry</span>
            </button>
          </div>
        )}
      </div>

      {/* Input Options (Idle State) */}
      {predictState === 'idle' && (
        <>
          {inputMode === 'upload' ? (
            <div className="glass-panel rounded-3xl p-10 border border-white/5 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accentBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              
              <Video className="w-16 h-16 text-accentBlue mx-auto mb-6 animate-pulse" />
              <h3 className="text-xl font-bold uppercase tracking-wider">Load Opponent Recording</h3>
              <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
                Provide footage of your opponent's matches. The AI engine will index frame intervals, detect mechanical patterns, and suggest tactical adjustments.
              </p>

              <div className="mt-8 flex justify-center">
                <label className="cursor-pointer px-8 py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan text-black font-bold text-sm tracking-wider uppercase hover:opacity-90 transition duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                  Browse Video logs
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-4">SUPPORTS MP4, WEBM, MOV | MAX 500MB</p>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-8 border border-white/5 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-6 pb-3 border-b border-white/5 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-accentBlue" />
                <span>Manual Strategy Parameters</span>
              </h3>

              <form onSubmit={(e) => { e.preventDefault(); triggerAnalysis(); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Playstyle Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Estimated Playstyle</label>
                    <select 
                      value={playstyle}
                      onChange={(e) => setPlaystyle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm focus:border-accentBlue focus:outline-none text-white"
                    >
                      <option value="aggressive" className="bg-darkBg">Ultra Aggressive / Pressure</option>
                      <option value="defensive" className="bg-darkBg">Defensive / Grinder / Counter</option>
                      <option value="balanced" className="bg-darkBg">Balanced / Tactical Adaptable</option>
                      <option value="unorthodox" className="bg-darkBg">Unorthodox / Trickster / High-Risk</option>
                    </select>
                  </div>

                  {/* Dominant Side */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Dominant Side / Stance</label>
                    <select
                      value={dominantSide}
                      onChange={(e) => setDominantSide(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm focus:border-accentBlue focus:outline-none text-white"
                    >
                      <option value="right" className="bg-darkBg">Right-Handed / Orthodox</option>
                      <option value="left" className="bg-darkBg">Left-Handed / Southpaw</option>
                      <option value="ambidextrous" className="bg-darkBg">Switch Stance / Ambidextrous</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Behavioral Observations (Tactical tells, weak zones)</label>
                  <textarea
                    rows="3"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="E.g., opponent hesitates when rushed at the net, loses stamina in final stages, or drops hands during lateral pivot maneuvers."
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan text-black font-bold text-sm tracking-wider uppercase hover:opacity-90 transition duration-300 shadow-[0_0_20px_rgba(0,242,254,0.2)]"
                >
                  Generate Counter Strategy
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {/* Processing State */}
      {predictState === 'processing' && (
        <div className="glass-panel rounded-3xl p-12 border border-white/5 text-center max-w-md mx-auto relative overflow-hidden">
          <RefreshCw className="w-12 h-12 text-accentBlue mx-auto mb-6 animate-spin" />
          <h3 className="text-lg font-bold uppercase tracking-widest text-neon-gradient">Simulating Battle</h3>
          <p className="text-xs text-gray-400 mt-1 mb-6 leading-relaxed">
            Synthesizing game records and running defensive probability arrays...
          </p>
          
          <div className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/5 text-xs text-accentBlue font-mono uppercase inline-block animate-pulse">
            &gt; {loadingText}
          </div>
        </div>
      )}

      {/* Completed State (Show Report Output) */}
      {predictState === 'completed' && report && (
        <div className="space-y-6">
          {/* Sub Header Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-accentBlue/10 flex items-center justify-center border border-accentBlue/20">
                <Target className="w-6 h-6 text-accentBlue" />
              </div>
              <div>
                <span className="text-[10px] text-accentCyan font-bold uppercase tracking-widest">Prediction Outcome</span>
                <h3 className="text-lg font-bold uppercase tracking-wider mt-0.5">Strategy Report Generated</h3>
                <p className="text-xs text-gray-400 mt-0.5">Tactical patterns synthesized. Counter recommendations online.</p>
              </div>
            </div>

            <button
              onClick={resetPredictor}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-accentBlue to-accentCyan rounded-xl hover:opacity-90 transition shadow-[0_0_15px_rgba(0,242,254,0.15)]"
            >
              Analyze New Opponent
            </button>
          </div>

          {/* Core Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Playstyle / Habits Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-accentBlue mb-2">Opponent Play Style</h4>
                <p className="text-sm font-semibold text-white leading-relaxed">{report.style}</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accentCyan mb-2">Tactical Habits</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{report.habits}</p>
              </div>
            </div>

            {/* Weakness & Fatigue Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-accentGold mb-2">Primary Weakness / Zones</h4>
                <p className="text-sm font-semibold text-white leading-relaxed">{report.weakZones}</p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Fatigue Triggers</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{report.staminaDrops}</p>
              </div>
            </div>

            {/* Counter Strategy Blueprint (Full Width) */}
            <div className="glass-panel rounded-2xl p-6 border border-accentBlue/20 md:col-span-2 relative overflow-hidden bg-gradient-to-br from-accentBlue/[0.03] to-transparent">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accentBlue/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center space-x-2 text-[#39FF14] mb-4">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-extrabold uppercase tracking-wider">Counter Strategy Blueprint</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[10px] text-accentBlue font-bold uppercase tracking-widest font-mono block mb-1">
                    Tactical Execution Orders
                  </span>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    {report.counterStrategy}
                  </p>
                </div>

                {/* Additional manual adjustment notes block if manual input was used */}
                {inputMode === 'manual' && additionalNotes && (
                  <div className="p-4 rounded-xl bg-black/10 border border-white/5 text-xs text-gray-400 font-sans">
                    <strong className="text-white block mb-0.5">User Observations Factored:</strong>
                    "{additionalNotes}"
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-accentCyan shrink-0" />
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">Defense Mod</span>
                      <span className="text-xs font-bold text-white uppercase">Exploit Angles</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5">
                    <Zap className="w-4 h-4 text-accentBlue shrink-0" />
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">Attack Priority</span>
                      <span className="text-xs font-bold text-white uppercase">Target Flank</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center space-x-2.5">
                    <Target className="w-4 h-4 text-[#39FF14] shrink-0" />
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">Tactical Focus</span>
                      <span className="text-xs font-bold text-white uppercase">Pacing Pressure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
