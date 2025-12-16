import { BADGE_DEFINITIONS } from '../utils/constants';
import { calculateStreak, getTodayString } from '../utils/dateHelpers';
import PointsService from './PointsService';

class BadgeService {
    checkBadgeEligibility(badge, userProfile, habits, logs) {
        const { requirement } = badge;

        switch (requirement.type) {
            case 'total_logs':
                return logs.length >= requirement.count;

            case 'streak':
                return habits.some(habit => {
                    const habitLogs = logs.filter(log => log.habitId === habit.id);
                    const streak = calculateStreak(habitLogs);
                    return streak >= requirement.days;
                });

            case 'total_stars':
                const totalStars = logs.reduce((sum, log) => sum + log.stars, 0);
                return totalStars >= requirement.count;

            case 'monthly_consistency':
                const today = new Date();
                const currentMonth = today.getMonth();
                const currentYear = today.getFullYear();

                const monthLogs = logs.filter(log => {
                    const logDate = new Date(log.date);
                    return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
                });

                const daysLogged = new Set(monthLogs.map(log => log.date)).size;
                const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                const consistency = (daysLogged / daysInMonth) * 100;

                return consistency >= requirement.percentage;

            case 'level':
                return userProfile.level >= requirement.level;

            case 'perfect_day':
                const todayString = getTodayString();
                const todayLogs = logs.filter(log => log.date === todayString);

                if (todayLogs.length === 0 || todayLogs.length !== habits.length) {
                    return false;
                }

                return todayLogs.every(log => log.stars === 5);

            default:
                return false;
        }
    }

    checkAndAwardBadges(userProfile, habits, logs) {
        const newBadges = [];

        BADGE_DEFINITIONS.forEach(badge => {
            const alreadyHas = userProfile.badges.includes(badge.id);

            if (!alreadyHas && this.checkBadgeEligibility(badge, userProfile, habits, logs)) {
                newBadges.push(badge.id);
            }
        });

        return newBadges;
    }

    getBadgeById(badgeId) {
        return BADGE_DEFINITIONS.find(badge => badge.id === badgeId);
    }

    getAllBadges() {
        return BADGE_DEFINITIONS;
    }
}

export default new BadgeService();
