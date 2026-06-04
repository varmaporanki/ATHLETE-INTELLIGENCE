export const sportNutritionProfiles = {
  endurance: {
    categoryName: "Endurance & Stamina",
    macroRatio: { carbs: 65, protein: 20, fat: 15 },
    matchDay: {
      calories: 3200,
      focus: "Glycogen loading, hydration pacing, and electrolyte balance.",
      breakfast: "Oatmeal with banana, honey, and chia seeds + 500ml water.",
      lunch: "Boiled white rice with grilled chicken breast and steamed zucchini.",
      snacks: "Energy gel or isotonic drink (30 mins pre-event) + sliced orange.",
      hydration: "3-4 Liters with electrolyte tablets, sipping 200ml every 20 mins of activity.",
      recoveryMeal: "Whey protein shake with dextrose + sweet potato and grilled salmon."
    },
    nonMatchDay: {
      calories: 2800,
      focus: "Muscle repair, glycogen replenishment, and joint health.",
      breakfast: "Scrambled eggs (3) with whole-grain toast and avocado.",
      lunch: "Quinoa salad with mixed greens, almonds, and baked cod.",
      snacks: "Greek yogurt with mixed berries and walnuts.",
      proteinCarbBalance: "Focus on slow-digesting complex carbs and lean protein.",
      recoveryFoods: "Tart cherry juice (for muscle soreness), almonds, and broccoli."
    }
  },
  team_ball: {
    categoryName: "High-Intensity Intermittent Team Sports",
    macroRatio: { carbs: 55, protein: 25, fat: 20 },
    matchDay: {
      calories: 3400,
      focus: "Explosive energy stores, fast digestion, and fluid replacement.",
      breakfast: "Pancakes with maple syrup and strawberries + scrambled egg whites.",
      lunch: "Pasta (marinara sauce) with lean ground turkey and spinach.",
      snacks: "Ripe banana + sports bar (60 mins pre-match).",
      hydration: "3 Liters. Hydrate heavily 2 hours before the game; drink sports drinks at half-time.",
      recoveryMeal: "Double turkey breast wrap + baked potato + chocolate milk."
    },
    nonMatchDay: {
      calories: 2900,
      focus: "Aerobic recovery, tissue healing, and strength maintenance.",
      breakfast: "Oat bran with skim milk, sliced almonds, and a scoop of protein powder.",
      lunch: "Brown rice with stir-fried beef and mixed vegetables (peppers, broccoli, carrots).",
      snacks: "Cottage cheese with pineapple chunks.",
      proteinCarbBalance: "Moderate complex carbs with high leucine-rich protein sources.",
      recoveryFoods: "Avocado, spinach, eggs, and blueberries."
    }
  },
  racket: {
    categoryName: "Agility & Lateral Reactivity",
    macroRatio: { carbs: 60, protein: 22, fat: 18 },
    matchDay: {
      calories: 2800,
      focus: "Reflex maintenance, blood sugar stabilization, and micro-hydration.",
      breakfast: "Cream of wheat with maple syrup + 2 soft boiled eggs.",
      lunch: "White rice with grilled turkey breast and cucumbers.",
      snacks: "Dates or raisins (during changeovers) + 250ml electrolyte fluid.",
      hydration: "2.5-3 Liters. Focus on small, frequent sips to avoid fullness during quick movements.",
      recoveryMeal: "Grilled chicken wrap with light hummus + banana smoothie."
    },
    nonMatchDay: {
      calories: 2400,
      focus: "Lactic acid clearance, joint support, and flexibility nutrition.",
      breakfast: "Oatmeal with whey protein, flaxseeds, and blueberries.",
      lunch: "Whole-wheat pita with tuna salad, spinach, and tomatoes.",
      snacks: "Hummus with carrot and celery sticks.",
      proteinCarbBalance: "Balanced carbs and proteins, rich in anti-inflammatory fats (omega-3).",
      recoveryFoods: "Salmon, walnuts, chia seeds, and green tea."
    }
  },
  combat: {
    categoryName: "Power-to-Weight Ratio & Strength",
    macroRatio: { carbs: 45, protein: 35, fat: 20 },
    matchDay: {
      calories: 2600,
      focus: "Post-weigh-in rehydration, glycogen reload, and gut comfort.",
      breakfast: "Rice pudding with honey + 2 scrambled eggs + coconut water.",
      lunch: "Polenta or white rice with grilled cod and steamed asparagus.",
      snacks: "BCAA drink + rice cakes with peanut butter (90 mins pre-fight).",
      hydration: "3 Liters. Hyper-hydration with sodium loading if rehydrating after weight cut.",
      recoveryMeal: "Lean steak + mashed potatoes + dark chocolate."
    },
    nonMatchDay: {
      calories: 2200,
      focus: "Muscle mass maintenance, fat loss, and strength loading.",
      breakfast: "Egg white omelet with spinach, mushrooms, and turkey bacon.",
      lunch: "Large green salad with grilled chicken breast, pumpkin seeds, and olive oil.",
      snacks: "Casein protein shake + handful of almonds.",
      proteinCarbBalance: "High protein, low-to-moderate low-glycemic index carbohydrates.",
      recoveryFoods: "Cottage cheese, bone broth, lean beef, and ginger."
    }
  },
  precision_mental: {
    categoryName: "Cognitive Focus & Precision",
    macroRatio: { carbs: 40, protein: 30, fat: 30 },
    matchDay: {
      calories: 2200,
      focus: "Sustained brain fuel, nervous system calm, and visual acuity.",
      breakfast: "Whole-grain toast with almond butter and sliced banana + green tea.",
      lunch: "Baked salmon with quinoa and steamed broccoli.",
      snacks: "Dark chocolate (80%+) + walnuts (for cognitive boost).",
      hydration: "2 Liters. Avoid excessive caffeine to prevent jittery reflexes.",
      recoveryMeal: "Scrambled eggs + avocado + berries + mixed seeds."
    },
    nonMatchDay: {
      calories: 2000,
      focus: "Brain health, low inflammatory states, and core stability.",
      breakfast: "Greek yogurt with blueberries, pumpkin seeds, and honey.",
      lunch: "Tuna salad wrap with spinach, avocado, and olive oil dressing.",
      snacks: "Apple slices with almond butter.",
      proteinCarbBalance: "High healthy fats (Omega-3s), moderate proteins, and low glycemic carbs.",
      recoveryFoods: "Blueberries, salmon, walnuts, spinach, and turmeric."
    }
  }
};

// Map each of the 40 sports to one of the nutrition profiles
export const sportToNutritionCategory = {
  archery: 'precision_mental',
  athletics: 'endurance',
  badminton: 'racket',
  baseball: 'team_ball',
  basketball: 'team_ball',
  biathlon: 'endurance',
  boxing: 'combat',
  canoeing: 'endurance',
  chess: 'precision_mental',
  cricket: 'team_ball',
  cycling: 'endurance',
  diving: 'precision_mental',
  equestrian: 'precision_mental',
  esports: 'precision_mental',
  fencing: 'combat',
  football: 'team_ball',
  golf: 'precision_mental',
  gymnastics: 'precision_mental',
  handball: 'team_ball',
  hockey: 'team_ball',
  judo: 'combat',
  kabaddi: 'combat',
  karate: 'combat',
  kickboxing: 'combat',
  lacrosse: 'team_ball',
  'modern-pentathlon': 'precision_mental',
  rowing: 'endurance',
  rugby: 'team_ball',
  sailing: 'endurance',
  shooting: 'precision_mental',
  skateboarding: 'precision_mental',
  squash: 'racket',
  swimming: 'endurance',
  'table-tennis': 'racket',
  taekwondo: 'combat',
  tennis: 'racket',
  triathlon: 'endurance',
  volleyball: 'team_ball',
  'water-polo': 'team_ball',
  wrestling: 'combat'
};

export function getNutritionPlan(sportId) {
  const category = sportToNutritionCategory[sportId] || 'team_ball';
  return sportNutritionProfiles[category];
}
