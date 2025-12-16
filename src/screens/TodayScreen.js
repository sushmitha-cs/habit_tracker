import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../styles/theme';
import HabitCard from '../components/HabitCard';
import ProgressBar from '../components/ProgressBar';
import StorageService from '../services/StorageService';
import PointsService from '../services/PointsService';
import BadgeService from '../services/BadgeService';
import { getTodayString } from '../utils/dateHelpers';

const TodayScreen = () => {
    const [habits, setHabits] = useState([]);
    const [logs, setLogs] = useState([]);
    const [todayLogs, setTodayLogs] = useState({});
    const [userProfile, setUserProfile] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [dailyPoints, setDailyPoints] = useState(0);
    const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);

    const loadData = async () => {
        const loadedHabits = await StorageService.loadHabits();
        const loadedLogs = await StorageService.loadLogs();
        const profile = await StorageService.loadUserProfile();

        setHabits(loadedHabits);
        setLogs(loadedLogs);
        setUserProfile(profile);

        // Get today's logs
        const today = getTodayString();
        const todayLogsMap = {};
        loadedLogs
            .filter(log => log.date === today)
            .forEach(log => {
                todayLogsMap[log.habitId] = log;
            });
        setTodayLogs(todayLogsMap);

        // Calculate daily points
        const todayLogsList = Object.values(todayLogsMap);
        const points = PointsService.calculateDailyTotal(todayLogsList, loadedHabits);
        setDailyPoints(points);

        // Calculate max possible points (all habits at 5 stars)
        const maxPoints = loadedHabits.reduce((sum, habit) => {
            return sum + PointsService.calculatePoints(5, habit.importance);
        }, 0);
        setMaxPossiblePoints(maxPoints);
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const handleStarChange = async (habitId, stars) => {
        const today = getTodayString();
        const habit = habits.find(h => h.id === habitId);

        if (!habit) return;

        const points = PointsService.calculatePoints(stars, habit.importance);

        // Update or create log
        const existingLogIndex = logs.findIndex(
            log => log.habitId === habitId && log.date === today
        );

        let updatedLogs;
        if (existingLogIndex >= 0) {
            updatedLogs = [...logs];
            updatedLogs[existingLogIndex] = {
                ...updatedLogs[existingLogIndex],
                stars,
                points,
            };
        } else {
            const newLog = {
                id: `log_${Date.now()}_${habitId}`,
                habitId,
                date: today,
                stars,
                points,
                timestamp: new Date().toISOString(),
            };
            updatedLogs = [...logs, newLog];
        }

        // Save logs
        await StorageService.saveLogs(updatedLogs);
        setLogs(updatedLogs);

        // Update today's logs map
        const updatedTodayLogs = { ...todayLogs };
        updatedTodayLogs[habitId] = updatedLogs.find(
            log => log.habitId === habitId && log.date === today
        );
        setTodayLogs(updatedTodayLogs);

        // Recalculate total points
        const allLogs = updatedLogs;
        const totalPoints = PointsService.calculateTotalPoints(allLogs, habits);
        const newLevel = PointsService.calculateLevel(totalPoints);

        // Check for new badges
        const newBadges = BadgeService.checkAndAwardBadges(
            { ...userProfile, level: newLevel },
            habits,
            allLogs
        );

        // Update user profile
        const updatedProfile = {
            ...userProfile,
            totalPoints,
            level: newLevel,
            badges: [...userProfile.badges, ...newBadges],
        };
        await StorageService.saveUserProfile(updatedProfile);
        setUserProfile(updatedProfile);

        // Recalculate daily points
        const todayLogsList = Object.values(updatedTodayLogs).filter(log => log);
        const newDailyPoints = PointsService.calculateDailyTotal(todayLogsList, habits);
        setDailyPoints(newDailyPoints);
    };

    const progress = maxPossiblePoints > 0 ? (dailyPoints / maxPossiblePoints) * 100 : 0;
    const completedHabits = Object.values(todayLogs).filter(log => log && log.stars > 0).length;

    return (
        <LinearGradient
            colors={theme.colors.gradients.dark}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
                    }
                >
                    <View style={styles.header}>
                        <Text style={styles.greeting}>Today's Habits</Text>
                        <Text style={styles.identity}>
                            You are the kind of person who shows up every day 💪
                        </Text>
                    </View>

                    <View style={styles.statsCard}>
                        <LinearGradient
                            colors={['rgba(139, 92, 246, 0.2)', 'rgba(59, 130, 246, 0.1)']}
                            style={styles.statsGradient}
                        >
                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statValue}>{dailyPoints}</Text>
                                    <Text style={styles.statLabel}>Points Today</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statValue}>{completedHabits}/{habits.length}</Text>
                                    <Text style={styles.statLabel}>Completed</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Text style={styles.statValue}>Lv {userProfile?.level || 1}</Text>
                                    <Text style={styles.statLabel}>Level</Text>
                                </View>
                            </View>

                            <View style={styles.progressSection}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressLabel}>Daily Progress</Text>
                                    <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
                                </View>
                                <ProgressBar progress={progress} height={12} />
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={styles.habitsSection}>
                        <Text style={styles.sectionTitle}>Your Habits</Text>
                        {habits.map(habit => {
                            const log = todayLogs[habit.id];
                            const stars = log ? log.stars : 0;

                            return (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    stars={stars}
                                    onStarChange={(newStars) => handleStarChange(habit.id, newStars)}
                                />
                            );
                        })}
                    </View>
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
    greeting: {
        fontSize: theme.fonts.sizes.xxxl,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    identity: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
        lineHeight: 22,
    },
    statsCard: {
        marginBottom: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        ...theme.shadows.lg,
    },
    statsGradient: {
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderRadius: theme.borderRadius.lg,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.lg,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: theme.fonts.sizes.xxl,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(148, 163, 184, 0.2)',
    },
    progressSection: {
        marginTop: theme.spacing.md,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    progressLabel: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    progressPercentage: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.primary,
        fontWeight: '700',
    },
    habitsSection: {
        marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
});

export default TodayScreen;
