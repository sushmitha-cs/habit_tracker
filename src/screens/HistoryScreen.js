import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../styles/theme';
import StorageService from '../services/StorageService';
import { formatDisplayDate, calculateStreak } from '../utils/dateHelpers';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';

const HistoryScreen = () => {
    const [habits, setHabits] = useState([]);
    const [logs, setLogs] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const loadData = async () => {
        const loadedHabits = await StorageService.loadHabits();
        const loadedLogs = await StorageService.loadLogs();
        setHabits(loadedHabits);
        setLogs(loadedLogs);
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const getMonthDays = () => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        return eachDayOfInterval({ start, end });
    };

    const getIntensityForDate = (date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        const dayLogs = logs.filter(log => log.date === dateString);

        if (dayLogs.length === 0) return 0;

        const avgStars = dayLogs.reduce((sum, log) => sum + log.stars, 0) / dayLogs.length;
        return avgStars / 5; // Normalize to 0-1
    };

    const getColorForIntensity = (intensity) => {
        if (intensity === 0) return theme.colors.surfaceLight;
        if (intensity < 0.3) return 'rgba(139, 92, 246, 0.3)';
        if (intensity < 0.6) return 'rgba(139, 92, 246, 0.6)';
        return theme.colors.primary;
    };

    const getDayLogs = (date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        return logs.filter(log => log.date === dateString);
    };

    const calculateHabitStreak = (habitId) => {
        const habitLogs = logs.filter(log => log.habitId === habitId);
        return calculateStreak(habitLogs);
    };

    const monthDays = getMonthDays();
    const selectedDayLogs = selectedDate ? getDayLogs(selectedDate) : [];

    return (
        <LinearGradient
            colors={theme.colors.gradients.dark}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>History</Text>
                        <Text style={styles.monthYear}>{format(currentDate, 'MMMM yyyy')}</Text>
                    </View>

                    {/* Calendar Heatmap */}
                    <View style={styles.calendarCard}>
                        <LinearGradient
                            colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
                            style={styles.calendarGradient}
                        >
                            <View style={styles.weekDays}>
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                    <Text key={index} style={styles.weekDayLabel}>{day}</Text>
                                ))}
                            </View>

                            <View style={styles.calendar}>
                                {monthDays.map((day, index) => {
                                    const intensity = getIntensityForDate(day);
                                    const color = getColorForIntensity(intensity);
                                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setSelectedDate(day)}
                                            style={[
                                                styles.dayCell,
                                                { backgroundColor: color },
                                                isSelected && styles.selectedDay,
                                            ]}
                                        >
                                            <Text style={[
                                                styles.dayText,
                                                intensity > 0.3 && styles.dayTextLight,
                                            ]}>
                                                {format(day, 'd')}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Streaks Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>🔥 Current Streaks</Text>
                        {habits.map(habit => {
                            const streak = calculateHabitStreak(habit.id);
                            return (
                                <View key={habit.id} style={styles.streakCard}>
                                    <LinearGradient
                                        colors={['rgba(30, 41, 59, 0.8)', 'rgba(30, 41, 59, 0.6)']}
                                        style={styles.streakGradient}
                                    >
                                        <Text style={styles.streakIcon}>{habit.icon}</Text>
                                        <View style={styles.streakInfo}>
                                            <Text style={styles.streakName}>{habit.name}</Text>
                                            <Text style={styles.streakDays}>{streak} day{streak !== 1 ? 's' : ''}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                            );
                        })}
                    </View>

                    {/* Selected Day Details */}
                    {selectedDate && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                {formatDisplayDate(selectedDate)}
                            </Text>
                            {selectedDayLogs.length > 0 ? (
                                selectedDayLogs.map(log => {
                                    const habit = habits.find(h => h.id === log.habitId);
                                    if (!habit) return null;

                                    return (
                                        <View key={log.id} style={styles.logCard}>
                                            <LinearGradient
                                                colors={['rgba(139, 92, 246, 0.2)', 'rgba(59, 130, 246, 0.1)']}
                                                style={styles.logGradient}
                                            >
                                                <Text style={styles.logIcon}>{habit.icon}</Text>
                                                <View style={styles.logInfo}>
                                                    <Text style={styles.logName}>{habit.name}</Text>
                                                    <Text style={styles.logStars}>
                                                        {'⭐'.repeat(log.stars)} ({log.points} pts)
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    );
                                })
                            ) : (
                                <Text style={styles.noLogsText}>No habits logged on this day</Text>
                            )}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: theme.spacing.lg,
    },
    header: {
        marginBottom: theme.spacing.lg,
    },
    title: {
        fontSize: theme.fonts.sizes.xxxl,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    monthYear: {
        fontSize: theme.fonts.sizes.lg,
        color: theme.colors.textSecondary,
    },
    calendarCard: {
        marginBottom: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        ...theme.shadows.md,
    },
    calendarGradient: {
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
        borderRadius: theme.borderRadius.lg,
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.sm,
    },
    weekDayLabel: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
        fontWeight: '600',
        width: 40,
        textAlign: 'center',
    },
    calendar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
    },
    dayCell: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.1)',
    },
    selectedDay: {
        borderColor: theme.colors.accent,
        borderWidth: 2,
    },
    dayText: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
    dayTextLight: {
        color: theme.colors.text,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    streakCard: {
        marginBottom: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
    },
    streakGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    streakIcon: {
        fontSize: 28,
        marginRight: theme.spacing.md,
    },
    streakInfo: {
        flex: 1,
    },
    streakName: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        fontWeight: '600',
        marginBottom: 2,
    },
    streakDays: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },
    logCard: {
        marginBottom: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
    },
    logGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
    },
    logIcon: {
        fontSize: 24,
        marginRight: theme.spacing.md,
    },
    logInfo: {
        flex: 1,
    },
    logName: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        fontWeight: '600',
        marginBottom: 2,
    },
    logStars: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },
    noLogsText: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textMuted,
        textAlign: 'center',
        padding: theme.spacing.lg,
    },
});

export default HistoryScreen;
