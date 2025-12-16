// App-wide constants

export const POINTS_PER_STAR = 2;
export const PENALTY_MULTIPLIER = 2;
export const POINTS_PER_LEVEL = 100;

export const BADGE_DEFINITIONS = [
  {
    id: 'first_habit',
    name: 'Getting Started',
    description: 'Complete your first habit',
    icon: '🌱',
    requirement: { type: 'total_logs', count: 1 },
  },
  {
    id: 'week_streak',
    name: '7-Day Streak',
    description: 'Maintain a 7-day streak on any habit',
    icon: '🔥',
    requirement: { type: 'streak', days: 7 },
  },
  {
    id: 'hundred_stars',
    name: 'Century',
    description: 'Earn 100 total stars',
    icon: '⭐',
    requirement: { type: 'total_stars', count: 100 },
  },
  {
    id: 'consistency_master',
    name: 'Consistency Master',
    description: 'Achieve 80%+ consistency this month',
    icon: '🎯',
    requirement: { type: 'monthly_consistency', percentage: 80 },
  },
  {
    id: 'level_five',
    name: 'Level 5 Hero',
    description: 'Reach level 5',
    icon: '🏆',
    requirement: { type: 'level', level: 5 },
  },
  {
    id: 'perfect_day',
    name: 'Perfect Day',
    description: 'Get 5 stars on all habits in a single day',
    icon: '💎',
    requirement: { type: 'perfect_day' },
  },
];

export const STORAGE_KEYS = {
  HABITS: '@habits',
  LOGS: '@habit_logs',
  USER_PROFILE: '@user_profile',
  ONBOARDING_COMPLETE: '@onboarding_complete',
};
