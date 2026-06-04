export const customSportInsights = {
  cricket: {
    overallScore: 84,
    metrics: [
      { name: "Batting Swing Plane", score: 86, status: "Optimal", tip: "Bat face is opening slightly early during the cover drive. Focus on keeping the top hand dominant." },
      { name: "Weight Shift Ratio", score: 78, status: "Improvement", tip: "Your weight remains 60% on back foot during the front foot press. Commit your front shoulder more forward." },
      { name: "Footwork Alignment", score: 89, status: "Optimal", tip: "Excellent stride length. Head is positioned directly over the ball at the point of impact." },
      { name: "Elbow Elevation Angle", score: 83, status: "Optimal", tip: "High lead elbow maintained at 105 degrees. This ensures the ball stays on the ground." }
    ]
  },
  football: {
    overallScore: 87,
    metrics: [
      { name: "Kicking Angle & Release", score: 91, status: "Optimal", tip: "Plant foot position is perfectly aligned 15cm beside the ball, creating high shooting accuracy." },
      { name: "Hip Torque Generation", score: 79, status: "Improvement", tip: "Hip rotation is restricted by 12 degrees. Enhance core flexibility to unlock explosive power." },
      { name: "Non-Kicking Arm Balance", score: 95, status: "Optimal", tip: "Excellent counter-balance extension. Your arm is extended outwards, keeping the chest stable." },
      { name: "Knee Flexion (Plant Leg)", score: 83, status: "Optimal", tip: "Knee bent at 125 degrees, providing a stable shock-absorbing platform for the strike." }
    ]
  },
  basketball: {
    overallScore: 82,
    metrics: [
      { name: "Jump Shot Release Angle", score: 88, status: "Optimal", tip: "Release angle measured at 52.4 degrees, providing a high-arching ball trajectory." },
      { name: "Elbow Flexion Alignment", score: 74, status: "Improvement", tip: "Your shooting elbow flare-out is detected at 6 degrees. Keep it tucked in line with the rim." },
      { name: "Knee Flexion Depth", score: 81, status: "Optimal", tip: "Knee flexion is deep enough (115 degrees) to generate consistent vertical force." },
      { name: "Jump-to-Release Timing", score: 85, status: "Optimal", tip: "Ball release occurs at 94% of maximum jump height, utilizing vertical momentum well." }
    ]
  },
  badminton: {
    overallScore: 89,
    metrics: [
      { name: "Smash Contact Height", score: 92, status: "Optimal", tip: "Racket point of contact is at maximum vertical extension (2.8m). Exceptional reach." },
      { name: "Wrist Snap Velocity", score: 84, status: "Optimal", tip: "Excellent wrist acceleration. Pronation angle is sharp, directing the shuttlecock downwards." },
      { name: "Footwork Recovery Speed", score: 76, status: "Improvement", tip: "Slight split-step delay of 0.12 seconds on recovery. Stay on the balls of your feet." },
      { name: "Core Tilt Stability", score: 90, status: "Optimal", tip: "Body tilt is balanced, keeping your center of gravity under control during airborne shots." }
    ]
  },
  tennis: {
    overallScore: 85,
    metrics: [
      { name: "Forehand Swing Path", score: 87, status: "Optimal", tip: "Low-to-high swing path creates optimal topspin. Racket face angle is controlled at impact." },
      { name: "Serve Toss Consistency", score: 75, status: "Improvement", tip: "Toss deviation of 18cm forward detected. Keep the toss consistent at 12 o'clock relative to your shoulder." },
      { name: "Knee Drive (Serve)", score: 89, status: "Optimal", tip: "Deep leg drive generates 35% of your serve velocity. Excellent loading phase." },
      { name: "Open Stance Balance", score: 89, status: "Optimal", tip: "Wide base during defensive baseline rallies keeps weight balanced for quick lateral changes." }
    ]
  },
  chess: {
    overallScore: 94,
    metrics: [
      { name: "Decision Latency Balance", score: 96, status: "Optimal", tip: "Time management is balanced. Move execution in complex middlegames matches calculations." },
      { name: "Posture Stress Telemetry", score: 81, status: "Optimal", tip: "Lean angle indicates active focus. Shoulder tension is slightly high; relax during opponent's time." },
      { name: "Breathing Cadence", score: 92, status: "Optimal", tip: "Stable heart-rate and breathing cycle observed under time-trouble pressure. Highly disciplined." },
      { name: "Hand Hover Hesitation", score: 88, status: "Optimal", tip: "Low piece-hover duration. Decisive movement indicates clear calculations before touching pieces." }
    ]
  },
  esports: {
    overallScore: 90,
    metrics: [
      { name: "APM Consistency", score: 92, status: "Optimal", tip: "APM remains above 280 even during high-pressure team fights. Excellent micro-mechanics." },
      { name: "Input Reaction Delay", score: 95, status: "Optimal", tip: "Visual-to-click reaction speed average is 142ms. Top tier reflex index." },
      { name: "Wrist Extension Angle", score: 72, status: "Improvement", tip: "Wrist extension exceeds 20 degrees. Ergonomic risk detected. Relax forearm grip and adjust mouse pad." },
      { name: "Map Check Frequency", score: 88, status: "Optimal", tip: "Minimap checks occur every 4.2 seconds. Exceptional map awareness." }
    ]
  },
  boxing: {
    overallScore: 83,
    metrics: [
      { name: "Punch Retraction Speed", score: 87, status: "Optimal", tip: "Lead jab retracts to guard position in 0.15s. Excellent defensive awareness." },
      { name: "Guard Positioning", score: 74, status: "Improvement", tip: "Right hand drops slightly during left hook execution, leaving chin exposed. Keep it up." },
      { name: "Footwork Pivot Torque", score: 86, status: "Optimal", tip: "Rear foot rotates fully on cross punches, driving power from the hip." },
      { name: "Head Movement Evasion", score: 85, status: "Optimal", tip: "Slip angles of 15 degrees evade head strikes while keeping you in counter position." }
    ]
  }
};

export function getSportInsights(sportId) {
  const custom = customSportInsights[sportId];
  if (custom) return custom;

  // Fallback dynamic generator for other sports
  const hash = sportId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const score1 = 70 + (hash % 25);
  const score2 = 65 + ((hash * 3) % 30);
  const score3 = 72 + ((hash * 7) % 23);
  const score4 = 68 + ((hash * 13) % 27);
  const overall = Math.round((score1 + score2 + score3 + score4) / 4);

  return {
    overallScore: overall,
    metrics: [
      { 
        name: "Joint Dynamic Alignment", 
        score: score1, 
        status: score1 > 82 ? "Optimal" : "Improvement", 
        tip: `Keep joints aligned during peak force execution to reduce wear. Focus on core engagement.` 
      },
      { 
        name: "Execution Timing", 
        score: score2, 
        status: score2 > 82 ? "Optimal" : "Improvement", 
        tip: `The critical movement phase occurs ${score2 < 80 ? 'slightly out of sync' : 'in harmony'} with power loading. Work on pacing.` 
      },
      { 
        name: "Balance and Grounding", 
        score: score3, 
        status: score3 > 82 ? "Optimal" : "Improvement", 
        tip: `Your center of gravity deviates slightly under lateral forces. Practice wide stance stability.` 
      },
      { 
        name: "Energy Efficiency Ratio", 
        score: score4, 
        status: score4 > 82 ? "Optimal" : "Improvement", 
        tip: `Slight muscle over-activation detected. Relax passive muscle groups to save energy.` 
      }
    ]
  };
}
