import { POINTS_PER_STAR, PENALTY_MULTIPLIER, POINTS_PER_LEVEL } from '../utils/constants';

class PointsService {
    calculatePoints(stars, importance) {
        return stars * importance * POINTS_PER_STAR;
    }

    calculatePenalty(importance) {
        return -PENALTY_MULTIPLIER * importance;
    }

    calculateLevel(totalPoints) {
        return Math.floor(totalPoints / POINTS_PER_LEVEL) + 1;
    }

    getPointsForNextLevel(currentLevel) {
        return currentLevel * POINTS_PER_LEVEL;
    }

    getProgressToNextLevel(totalPoints, currentLevel) {
        const pointsInCurrentLevel = totalPoints - ((currentLevel - 1) * POINTS_PER_LEVEL);
        const pointsNeededForLevel = POINTS_PER_LEVEL;
        return (pointsInCurrentLevel / pointsNeededForLevel) * 100;
    }

    calculateDailyTotal(logs, habits) {
        let total = 0;
        const habitMap = {};

        habits.forEach(habit => {
            habitMap[habit.id] = habit;
        });

        logs.forEach(log => {
            const habit = habitMap[log.habitId];
            if (habit) {
                total += this.calculatePoints(log.stars, habit.importance);
            }
        });

        return total;
    }

    calculateTotalPoints(logs, habits) {
        return this.calculateDailyTotal(logs, habits);
    }
}

export default new PointsService();
