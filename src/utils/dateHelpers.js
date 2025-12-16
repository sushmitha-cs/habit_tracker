import { format, startOfDay, isToday, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date) => {
    return format(date, 'MMM dd, yyyy');
};

export const getTodayString = () => {
    return formatDate(new Date());
};

export const isDateToday = (dateString) => {
    const date = new Date(dateString);
    return isToday(date);
};

export const getDaysDifference = (date1, date2) => {
    return differenceInDays(new Date(date1), new Date(date2));
};

export const getMonthDays = (year, month) => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));
    return eachDayOfInterval({ start, end });
};

export const calculateStreak = (logs) => {
    if (!logs || logs.length === 0) return 0;

    // Sort logs by date descending
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

    let streak = 0;
    let currentDate = new Date();

    for (const log of sortedLogs) {
        const logDate = new Date(log.date);
        const daysDiff = differenceInDays(startOfDay(currentDate), startOfDay(logDate));

        if (daysDiff === streak) {
            if (log.stars > 0) {
                streak++;
            } else {
                break;
            }
        } else if (daysDiff > streak) {
            break;
        }
    }

    return streak;
};

export const getWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
};
