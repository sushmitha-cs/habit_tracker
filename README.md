# Habit Tracker Mobile App 🎯

A beautiful, gamified habit tracking mobile application built with React Native and Expo. Track your micro-habits, earn points, level up, and unlock achievements!

## Features ✨

### Core Functionality
- **Micro-Habit Tracking**: Focus on small, achievable habits
- **Star Rating System**: Rate each habit 0-5 stars daily
- **Points & Levels**: Earn points based on your performance and level up
- **Streaks**: Track your consistency with daily streaks
- **Calendar Heatmap**: Visualize your progress over time
- **Badges & Achievements**: Unlock badges for milestones

### Design
- **Premium Dark Mode UI**: Sleek dark theme with vibrant gradients
- **Glassmorphism Effects**: Modern, translucent card designs
- **Smooth Animations**: Engaging micro-interactions
- **Identity-Based Messaging**: Motivational messages reinforcing positive self-image

## Getting Started 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npx expo start
```

3. **Run on your device**:
   - **iOS**: Press `i` in the terminal or scan the QR code with the Expo Go app
   - **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
   - **Web**: Press `w` in the terminal

## Project Structure 📁

```
habit_tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Badge.js
│   │   ├── HabitCard.js
│   │   ├── ProgressBar.js
│   │   └── StarRating.js
│   ├── data/               # Static data and templates
│   │   └── habitTemplates.js
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js
│   ├── screens/            # App screens
│   │   ├── OnboardingScreen.js
│   │   ├── TodayScreen.js
│   │   ├── HistoryScreen.js
│   │   └── ProfileScreen.js
│   ├── services/           # Business logic services
│   │   ├── BadgeService.js
│   │   ├── PointsService.js
│   │   └── StorageService.js
│   ├── styles/             # Theme and styling
│   │   └── theme.js
│   └── utils/              # Utility functions
│       ├── constants.js
│       └── dateHelpers.js
├── App.js                  # Main app entry point
└── package.json
```

## How It Works 🎮

### Points System
- Each habit has an **importance** level (1-3)
- Daily points = `stars × importance × 2`
- Missing a habit = `-2 × importance` points
- Level up every 100 points

### Badges
Unlock achievements by:
- Completing your first habit
- Maintaining 7-day streaks
- Earning 100 total stars
- Achieving 80%+ monthly consistency
- Reaching level 5
- Getting 5 stars on all habits in a day

### The 4 Laws of Behavior Change
The app is designed around James Clear's principles:
1. **Make it Obvious**: Clear daily habit list with reminders
2. **Make it Attractive**: Gamified points, streaks, and badges
3. **Make it Easy**: 1-tap star rating, micro-habits
4. **Make it Satisfying**: Immediate visual feedback and progress tracking

## Technologies Used 🛠️

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **date-fns** - Date manipulation
- **expo-linear-gradient** - Gradient styling

## Future Enhancements 🔮

- Push notifications for habit reminders
- Cloud sync and backup
- Social features and accountability partners
- Custom habit creation
- Data export and analytics
- Widget support
- Apple Watch / Wear OS integration

## License

MIT License - feel free to use this project for your own habit tracking journey!

## Acknowledgments

Inspired by "Atomic Habits" by James Clear and the principles of behavior change.

---

Built with ❤️ using React Native and Expo
