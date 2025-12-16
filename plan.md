

## Core concept and rules

Design your system around micro-habits, identity, and clear feedback loops.[^2]
Key rules to lock in early:[^1][^2]

- Each habit is tiny, clearly defined, and rated out of 5 stars per day (0–5) instead of binary done/undone.
- Points are derived from stars: for example, 1 star = 2 points, 5 stars = 10 points; missing a habit gives negative points (configurable penalty).
- Focus on identity: show messages like “You are the kind of person who…” and cumulative stats (days practiced, average stars) to reinforce positive self-image.[^2]
- Use the 4 laws explicitly:
    - Make it obvious: cues via reminders and clear daily list.
    - Make it attractive: gamified points, streaks, badges.[^3][^4]
    - Make it easy: 1-tap logging, pre-filled micro-habit templates.[^3]
    - Make it satisfying: immediate animations, confetti, level-ups when points/streaks increase.[^5][^4]


## Gamification and point system

Use a simple but expandable game loop.[^6][^4][^3]

- Daily habit rating:
    - User taps habit → selects 0–5 stars or uses a slider.
    - Points = stars × weight; weight allows some habits to be more valuable.
    - If user does not log by day-end, auto-assign 0 stars and apply a penalty, or allow “grace days” to avoid demotivation.
- Negative points:
    - Define a penalty per habit or a global penalty (e.g., −3 points for “skipped day”).
    - Cap daily negative total to prevent one bad day from destroying motivation.
- Meta systems you can add:
    - Level and XP: total points → level (e.g., every 100 points = 1 level).
    - Coins and rewards: earn coins for points and let users attach real-life rewards (e.g., “Movie night costs 50 coins”).[^4][^6]
    - Badges: “7-day micro streak”, “100 total stars”, “Consistency 80%+ this month”.[^4][^3]


### Sample scoring logic

- Each habit has:
    - `importance` (1–3).
    - Daily stars (0–5).
- Formula: `daily_points = stars * importance`.
- If no log: `daily_points = -penalty * importance` (e.g., penalty = 2).


## Feature roadmap

Use 3 phases so you can ship early and iterate.[^7][^5][^3]

### Phase 1 – MVP (core tracking)

Goal: Single-user local app, simple gamification, micro-habit focus.

- Core screens:
    - Onboarding:
        - Choose 3–5 micro-habits from templates (e.g., “Drink one glass of water”, “Read 1 page”).[^2]
        - Ask user to set preferred reminder time.
    - Today screen:
        - List of today’s habits with:
            - Name, micro-description.
            - Star control (0–5).
            - Points gained today.
        - Daily progress bar and total stars.[^7]
    - History screen:
        - Calendar or heat-map-like view with color intensity based on average stars per day.[^6][^7]
        - Basic stats: streaks per habit, weekly average stars.
    - Profile/Stats:
        - Total points, level, badges unlocked, consistency percentage.[^6][^4]
- Notifications:
    - Local notifications at selected times for each habit or a daily “Review your day” reminder.[^5]
- Data:
    - Local storage using SQLite or AsyncStorage for MVP.