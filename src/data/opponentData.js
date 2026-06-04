export const customOpponentReports = {
  cricket: {
    style: "Front-foot accumulator, risk-averse in first 6 overs, aggressive against spin.",
    weakZones: "Outside off-stump back-of-a-length channel; short-pitch body lines.",
    habits: "Frequently walks across the stumps to sweep when spin bowler is introduced.",
    staminaDrops: "Fatigue indicators show at overs 35+ or after running back-to-back doubles, leading to lofted slices.",
    counterStrategy: "Pack the off-side field on the 5th stump channel; bowl short rib-cage deliveries with a leg gully; delay spin introduction until field spreads."
  },
  football: {
    style: "Counter-attacking wing-play; relies on high overlapping fullbacks and rapid transitions.",
    weakZones: "Space behind fullbacks during attack phases; slow central defense lateral recovery.",
    habits: "Attacks predominantly through the left wing (65% of attacks); central striker holds up ball.",
    staminaDrops: "Pressing intensity drops significantly after the 70th minute, exposing central defense.",
    counterStrategy: "Deploy a compact mid-block; instruct wingers to exploit the space behind their overlapping fullbacks; execute quick diagonal transition balls."
  },
  basketball: {
    style: "Pick-and-roll dominant playmaker, high perimeter volume, isolation scorer.",
    weakZones: "Mid-range contested pull-ups; ball handling under hard double-team traps.",
    habits: "Drives right 82% of the time. Steps back for 3-pointers when defender drops hands.",
    staminaDrops: "Q4 fatigue shows via short-rim misses on jumpers and slower recovery on defense transitions.",
    counterStrategy: "Force driving lanes to the weak left hand; utilize drop-coverage on high screens; double-team on baseline traps; push pace on fast breaks."
  },
  tennis: {
    style: "Baseline grinder with heavy topspin; stays 2 meters behind the baseline; rarely approaches net.",
    weakZones: "Low slice shots to the forehand side; wide volleys; deep backhand corners.",
    habits: "Runs around his backhand to hit inside-out forehands under pressure, leaving the deuce court open.",
    staminaDrops: "Rally length tolerance drops from 12+ shots to under 6 shots after 2 hours of play.",
    counterStrategy: "Use deep central drives to pin him, then play a short angled slice to drag him to the net; serve wide to open up court space."
  },
  badminton: {
    style: "Deceptive net player, relies on drop shots and quick net taps, defensive posture.",
    weakZones: "High deep backhand corner; body smashes; rapid baseline-to-net pacing shifts.",
    habits: "Loves to play cross-court net drops when receiving low-serve drives.",
    staminaDrops: "Game 3 mid-game interval shows drops in lunge recovery, leading to lifted shuttlecocks.",
    counterStrategy: "Deliver high deep clears to the backhand corner to force lifts; attack the chest/body with explosive smashes; maintain net pressure."
  },
  boxing: {
    style: "Orthodox pressure fighter, high guard, works in close range, relies on body hooks.",
    weakZones: "Susceptible to uppercuts during entry; lateral footwork escapes; long range jabs.",
    habits: "Dips head left before throwing the overhand right. Drops lead hand slightly when throwing jabs.",
    staminaDrops: "Round 6+ shows drops in footwork speed and lower guard height.",
    counterStrategy: "Maintain distance with double-jabs; pivot to the right side (out of hook range); throw lead uppercuts when he lunges in."
  },
  esports: {
    style: "Split-push specialist, passive early-game farmer, highly efficient resource routing.",
    weakZones: "Early jungle invades; crowd-control chain targeting; vision choke-points.",
    habits: "Relies heavily on standard brush placements in the bot lane. Tends to overextend when flash is on cooldown.",
    staminaDrops: "Game 4+ in best-of-5 shows communication delays and slower reaction times.",
    counterStrategy: "Ban core comfort scaling heroes; secure early map vision control; coordinate 3-man ganks on the split lanes; force mid-game team fights."
  }
};

export function getOpponentReport(sportId) {
  const custom = customOpponentReports[sportId];
  if (custom) return custom;

  // Generic generator for other sports
  const hash = sportId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const styles = [
    "Aggressive paced, relies on physical dominance and explosive early starts.",
    "Counter-strategic pacing, sits back and capitalizes on mistakes.",
    "Highly balanced technician, rarely makes unforced errors, adapts to opponent tempo."
  ];
  const weakZones = [
    "Vulnerable to rapid changes of direction and quick transition plays.",
    "Struggles under persistent high-intensity pressure on his non-dominant side.",
    "Exposes open lanes when forced into deep defensive postures."
  ];
  const habits = [
    "Reverts to defensive patterns on the left boundary during pressure situations.",
    "Repeats attacking combinations from the central corridor twice in a row.",
    "Relies on high-risk maneuvers early in the engagement to establish dominance."
  ];
  const counterStrategy = [
    "Apply high pressure from the start, force them to defend deep, and attack the weak flank.",
    "Maintain a solid defensive block, absorb early pressure, and strike on high-speed transitions.",
    "Vary your speed and directions frequently to disrupt their tactical rhythm and composure."
  ];

  return {
    style: styles[hash % styles.length],
    weakZones: weakZones[(hash + 1) % weakZones.length],
    habits: habits[(hash + 2) % habits.length],
    staminaDrops: `Telemetry reports show a 15-20% drop in speed and reaction efficiency in the second half of the performance.`,
    counterStrategy: counterStrategy[(hash + 3) % counterStrategy.length]
  };
}
