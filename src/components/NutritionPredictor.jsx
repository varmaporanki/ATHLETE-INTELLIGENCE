import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getNutritionPlan } from '../data/nutritionData';
import { Flame, Droplet, Sun, Moon, Coffee, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

export default function NutritionPredictor() {
  const { selectedSport } = useApp();
  const [dietMode, setDietMode] = useState('match'); // 'match' or 'nonMatch'
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    if (selectedSport) {
      setNutrition(getNutritionPlan(selectedSport.id));
    }
  }, [selectedSport]);

  if (!nutrition) return null;

  const currentPlan = dietMode === 'match' ? nutrition.matchDay : nutrition.nonMatchDay;
  const macros = nutrition.macroRatio;

  return (
    <div className="space-y-6">
      {/* Header Panel with Mode Switch */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] text-accentBlue font-bold uppercase tracking-widest">Nutrition Engine</span>
          <h2 className="text-xl font-bold uppercase tracking-wider mt-0.5">Sport-Specific Diet Calibration</h2>
          <p className="text-xs text-gray-400 mt-1">
            Optimized fuel guidelines for <strong className="text-white uppercase">{selectedSport.name}</strong> ({nutrition.categoryName}).
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto self-stretch md:self-auto shrink-0">
          <button
            onClick={() => setDietMode('match')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
              dietMode === 'match'
                ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-black shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Match Day</span>
          </button>
          <button
            onClick={() => setDietMode('nonMatch')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
              dietMode === 'nonMatch'
                ? 'bg-gradient-to-r from-accentBlue to-accentCyan text-black shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Non-Match Day</span>
          </button>
        </div>
      </div>

      {/* Overview Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calorie & Focus Card */}
        <div className="glass-panel rounded-3xl p-6 border border-white/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accentBlue/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center space-x-2 text-accentBlue mb-4">
              <Flame className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Energy Requirements</span>
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-black">{currentPlan.calories}</span>
              <span className="text-sm text-gray-400 ml-1 font-semibold">kcal / day</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans border-t border-white/5 pt-4">
              <strong className="text-white font-bold block mb-1">Focus Protocol:</strong>
              {currentPlan.focus}
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-white/5 text-[9px] text-gray-500 font-mono">
            UPDATED ACCORDING TO LOAD PROFILE
          </div>
        </div>

        {/* Macro Nutrient Breakdown Card */}
        <div className="glass-panel rounded-3xl p-6 border border-white/5 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accentCyan/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center space-x-2 text-accentCyan mb-6">
            <Coffee className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Macro-Nutrient Calibration</span>
          </div>

          {/* Graphical Macro Bars */}
          <div className="space-y-4">
            {/* Carbs */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-gray-300">Carbohydrates (Energy Fuel)</span>
                <span className="text-accentBlue font-bold">{macros.carbs}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${macros.carbs}%` }}
                  className="h-full bg-gradient-to-r from-accentBlue to-accentCyan"
                />
              </div>
            </div>

            {/* Protein */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-gray-300">Protein (Tissue Recovery)</span>
                <span className="text-accentCyan font-bold">{macros.protein}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${macros.protein}%` }}
                  className="h-full bg-accentCyan"
                />
              </div>
            </div>

            {/* Fats */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-gray-300">Healthy Fats (Hormonal Balance)</span>
                <span className="text-accentGold font-bold">{macros.fat}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${macros.fat}%` }}
                  className="h-full bg-accentGold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Meal Plan Schedule */}
      <div>
        <h3 className="text-base font-bold uppercase tracking-wider mb-4 px-2">Nutritional Sequence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Breakfast Card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-accentBlue">
                  <Sun className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Breakfast</span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">07:30 AM</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">{currentPlan.breakfast}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-1.5 text-[10px] text-gray-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-accentBlue" />
              <span>Eat 2 hours before main load</span>
            </div>
          </div>

          {/* Lunch Card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-accentCyan">
                  <Coffee className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Lunch</span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">01:00 PM</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">{currentPlan.lunch}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-1.5 text-[10px] text-gray-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-accentCyan" />
              <span>Focus on easy absorption</span>
            </div>
          </div>

          {/* Snacks Card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-accentGold">
                  <Moon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Snacks</span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">04:30 PM</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">{currentPlan.snacks}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-1.5 text-[10px] text-gray-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-accentGold" />
              <span>Booster pre-workout load</span>
            </div>
          </div>

          {/* Hydration Schedule */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-[#4facfe]">
                  <Droplet className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Hydration Protocol</span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">Ongoing</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">{currentPlan.hydration}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-1.5 text-[10px] text-gray-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4facfe]" />
              <span>Fluid-electrolyte tracking</span>
            </div>
          </div>

          {/* Recovery Meal / Foods */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-[#39FF14]">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {dietMode === 'match' ? 'Post-Match Recovery Meal' : 'Recovery Foods'}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">Immediate Post</span>
              </div>
              <p className="text-sm font-semibold text-white leading-snug">
                {dietMode === 'match' ? currentPlan.recoveryMeal : currentPlan.recoveryFoods}
              </p>
              
              {/* Optional Macro Tip for recovery */}
              {dietMode === 'nonMatch' && currentPlan.proteinCarbBalance && (
                <p className="text-xs text-gray-400 mt-2 bg-white/5 p-2 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-0.5">Macro Balance Instruction:</span>
                  {currentPlan.proteinCarbBalance}
                </p>
              )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-1.5 text-[10px] text-gray-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>Crucial window for cellular repair</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
