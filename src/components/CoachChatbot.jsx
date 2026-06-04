import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, User, MessageSquare, Zap, Activity, Dumbbell, ShieldAlert } from 'lucide-react';

export default function CoachChatbot() {
  const { selectedSport } = useApp();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { id: '1', title: 'Tactical drills optimization', time: 'Yesterday' },
    { id: '2', title: 'Match-day hydration balance', time: '3 days ago' },
    { id: '3', title: 'Mental composure under pressure', time: '1 week ago' }
  ]);
  const messagesEndRef = useRef(null);

  // Initialize coach with a sport-specific welcome message
  useEffect(() => {
    if (selectedSport) {
      setMessages([
        {
          id: 'init',
          sender: 'coach',
          text: `Greetings. I am your AI Sports Coach, calibrated for ${selectedSport.name.toUpperCase()}. I have loaded your posture telemetry, nutrition profile, and biomechanical scores. What parameters are we optimizing today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [selectedSport]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Dynamic responses from the Elite AI Coach
  const generateCoachResponse = (userText) => {
    const text = userText.toLowerCase();
    const sport = selectedSport.name;
    const isMentalSport = ['chess', 'esports', 'archery', 'shooting', 'golf', 'equestrian', 'diving'].includes(selectedSport.id) || selectedSport.category === 'precision' || selectedSport.category === 'modern';
    
    let responseText = isMentalSport
      ? `Optimizing your tactical approach for ${sport} requires deep mental discipline. Focus on consistency of decision-making, pacing your calculations, and cognitive recovery. What specific aspects can we refine today?`
      : `That requires dedicated practice. For ${sport}, focus on keeping your center of gravity low and repeating your core biomechanical patterns. Remember, discipline creates greatness. What details can we dive into?`;

    if (text.includes('drill') || text.includes('train') || text.includes('practice')) {
      if (selectedSport.id === 'chess') {
        responseText = `For ${sport}, I recommend a 3-part mental drill today: \n1. 10 minutes of isolated tactical puzzle warm-ups to train pattern recognition.\n2. 15 minutes of deep calculations under strict blitz timers.\n3. 10 minutes of post-game error telemetry review. Focus on accuracy over speed.`;
      } else if (selectedSport.id === 'esports') {
        responseText = `For ${sport}, I recommend a 3-part micro-drill today: \n1. 10 minutes of isolated mechanical / aim training.\n2. 15 minutes of mini-map and rotation awareness scanning drills.\n3. 10 minutes of review of communication and position spacing. Minimize APM waste.`;
      } else if (isMentalSport) {
        responseText = `For ${sport}, I recommend a 3-part drill today: \n1. 10 minutes of static stance and alignment hold checks.\n2. 15 minutes of release-tempo consistency drills.\n3. 10 minutes of wind, terrain, or micro-adjustment calculations. Strive for absolute repeatability.`;
      } else {
        responseText = `For ${sport}, I recommend a 3-part micro-drill today: \n1. 10 minutes of isolated posture positioning.\n2. 15 minutes of transition acceleration drills at 85% maximum effort.\n3. 10 minutes of situational combat loops (simulating late-stage pressure). Commit to each repetition. Focus on form over speed.`;
      }
    } else if (text.includes('stamina') || text.includes('exhaust') || text.includes('tired') || text.includes('energy')) {
      if (isMentalSport) {
        responseText = `Cognitive stamina in ${sport} is driven by glucose stability, hydration, and mental pacing. Take micro-breaks to reset visual fatigue. Check your Nutrition Planner; your brain's fuel must be locked in with Omega-3 fatty acids and low-glycemic index meals to avoid brain fog.`;
      } else {
        responseText = `Stamina in ${sport} is a direct product of pacing and oxygen economy. Ensure your breathing matches your movement cycles (inhale on loading phases, exhale on execution). Keep your lactic thresholds high by incorporating weekly intervals. Check your Nutrition Planner; your glycogen stores must be locked in.`;
      }
    } else if (text.includes('pressure') || text.includes('focus') || text.includes('mental') || text.includes('nervous')) {
      responseText = `Pressure is just unorganized data. Under stress, your brain resorts to muscle memory. Ground yourself: take three slow diaphragmatic breaths (4s inhale, 4s hold, 4s exhale) to reset your heart rate variability. Focus entirely on the immediate tactical execution, not the scoreboard. You have done the work. Trust the training.`;
    } else if (text.includes('nutrition') || text.includes('diet') || text.includes('eat') || text.includes('protein')) {
      if (isMentalSport) {
        responseText = `Cognitive performance in ${sport} is heavily dependent on steady blood sugar. Target balanced healthy fats (Omega-3s) and complex carbs. Avoid heavy caffeine spikes to prevent jittery reflexes. Keep hydrated with 2 Liters of water daily.`;
      } else {
        responseText = `Fuel dictates performance. For ${sport}, your macro ratio targets high complex carbohydrates and lean proteins. Ensure you eat your pre-event meal exactly 2 hours before main drills to optimize digestion and prevent cramping. Drink 250ml fluids containing electrolytes every 20 minutes.`;
      }
    } else if (text.includes('posture') || text.includes('alignment') || text.includes('angle')) {
      if (isMentalSport) {
        responseText = `For ${sport}, ergonomic alignment is your foundation. Ensure your screen height is at eye level, and your chair height keeps your feet flat on the floor. Keep your wrist in a neutral position (flexion/extension under 15 degrees) to prevent strain and maximize click speed.`;
      } else {
        responseText = `Looking at your Video Analyzer reports, we need to focus on extension integrity. Ensure your core remains braced during execution to stabilize your hips and prevent torque leaks. Keep your shoulders relaxed and isolate the action. Every minor adjustment adds up to a massive gain.`;
      }
    } else if (text.includes('mistake') || text.includes('fail') || text.includes('lose') || text.includes('wrong')) {
      responseText = `Every mistake is simply diagnostic data. In sports intelligence, we do not focus on failure; we isolate variables. Let's analyze the exact frame of the breakdown. Did your stance shift, was there a delay in timing, or did you make a tactical miscalculation? We adjust, we correct, and we build. We do not look back.`;
    }

    return responseText;
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Coaching response latency
    setTimeout(() => {
      setIsTyping(false);
      const coachMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: generateCoachResponse(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, coachMsg]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion);
  };

  const suggestions = [
    `Suggest a training drill for ${selectedSport.name}`,
    "How do I manage match-day pressure?",
    "How can I optimize my movement stamina?",
    "Check posture requirements"
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/5 h-[620px] overflow-hidden flex flex-col md:flex-row relative">
      
      {/* Sessions History Sidebar (Desktop) */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-black/15 flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-white/5 flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-accentBlue" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Coaching Sessions</span>
        </div>
        <div className="p-2 space-y-1 overflow-y-auto flex-1">
          {chatHistory.map((item) => (
            <button
              key={item.id}
              className="w-full text-left p-3 rounded-xl hover:bg-white/5 text-xs transition border border-transparent hover:border-white/5"
            >
              <span className="font-semibold block text-gray-200 truncate">{item.title}</span>
              <span className="text-[10px] text-gray-500 block mt-0.5">{item.time}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Active Chat Console */}
      <section className="flex-1 flex flex-col min-h-0 relative">
        {/* Chat Console Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/5 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-accentBlue/10 flex items-center justify-center border border-accentBlue/20">
              <Zap className="w-4 h-4 text-accentBlue animate-pulse" />
            </div>
            <div>
              <span className="text-[9px] text-accentCyan font-bold uppercase tracking-widest block">AI Mentor Online</span>
              <h4 className="text-sm font-extrabold uppercase tracking-wide leading-tight">Coach Advisor</h4>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-semibold font-mono">
            <Activity className="w-3.5 h-3.5 text-[#39FF14]" />
            <span>ACTIVE PROFILE</span>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isCoach = msg.sender === 'coach';
            return (
              <div 
                key={msg.id}
                className={`flex items-start gap-3 max-w-[85%] ${isCoach ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Message Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isCoach 
                    ? 'bg-accentBlue/15 border-accentBlue/20 text-accentBlue' 
                    : 'bg-white/5 border-white/10 text-white'
                }`}>
                  {isCoach ? <Zap className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Content Bubble */}
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                    isCoach 
                      ? 'glass-panel border-white/5 text-gray-200' 
                      : 'bg-gradient-to-r from-accentBlue/15 to-accentCyan/15 border border-accentBlue/25 text-white'
                  }`}>
                    {/* Render newlines correctly */}
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                  <span className={`text-[9px] text-gray-500 block ${isCoach ? 'text-left' : 'text-right'} font-mono`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 mr-auto max-w-[80%]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-accentBlue/15 border-accentBlue/20 text-accentBlue">
                <Zap className="w-4 h-4" />
              </div>
              <div className="glass-panel border border-white/5 p-4 rounded-2xl flex items-center space-x-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accentBlue animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accentBlue animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accentBlue animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Pills */}
        <div className="px-4 py-2 border-t border-white/5 overflow-x-auto flex space-x-2 shrink-0 bg-black/5 no-scrollbar">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(sug)}
              disabled={isTyping}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-gray-400 hover:text-white hover:bg-white/10 transition shrink-0 font-medium"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Controls */}
        <div className="p-4 border-t border-white/5 bg-black/10 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              placeholder="Ask coach about posture, drills, nutrition, or stamina..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              className="flex-1 px-4 py-3 rounded-xl glass-input text-xs md:text-sm text-white"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan text-black flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition duration-300 shadow-[0_0_15px_rgba(0,242,254,0.15)] shrink-0"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

      </section>
    </div>
  );
}
