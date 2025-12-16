import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../styles/theme';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import StorageService from '../services/StorageService';
import PointsService from '../services/PointsService';
import BadgeService from '../services/BadgeService';

const ProfileScreen = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [habits, setHabits] = useState([]);
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({
        totalStars: 0,
        totalDays: 0,
        consistency: 0,
    });

    const loadData = async () => {
        const profile = await StorageService.loadUserProfile();
        const loadedHabits = await StorageService.loadHabits();
        const loadedLogs = await StorageService.loadLogs();

        setUserProfile(profile);
        setHabits(loadedHabits);
        setLogs(loadedLogs);

        // Calculate stats
        const totalStars = loadedLogs.reduce((sum, log) => sum + log.stars, 0);
        const uniqueDays = new Set(loadedLogs.map(log => log.date)).size;

        // Calculate consistency (days with at least one log)
        const daysSinceStart = Math.max(1, Math.ceil(
            (new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60 * 24)
        ));
        const consistency = (uniqueDays / daysSinceStart) * 100;

        setStats({
            totalStars,
            totalDays: uniqueDays,
            consistency: Math.min(100, consistency),
        });
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    if (!userProfile) {
        return null;
    }

    const allBadges = BadgeService.getAllBadges();
    const progress = PointsService.getProgressToNextLevel(userProfile.totalPoints, userProfile.level);

    return (
        <LinearGradient
            colors={theme.colors.gradients.dark}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Profile</Text>
                    </View>

                    {/* Level Card */}
                    <View style={styles.levelCard}>
                        <LinearGradient
                            colors={theme.colors.gradients.primary}
                            style={styles.levelGradient}
                        >
                            <View style={styles.levelContent}>
                                <Text style={styles.levelLabel}>Level</Text>
                                <Text style={styles.levelNumber}>{userProfile.level}</Text>
                                <Text style={styles.levelPoints}>{userProfile.totalPoints} points</Text>
                            </View>

                            <View style={styles.progressContainer}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressLabel}>Progress to Level {userProfile.level + 1}</Text>
                                    <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
                                </View>
                                <ProgressBar progress={progress} height={10} showGradient={false} />
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <LinearGradient
                                colors={['rgba(139, 92, 246, 0.2)', 'rgba(59, 130, 246, 0.1)']}
                                style={styles.statGradient}
                            >
                                <Text style={styles.statValue}>{stats.totalStars}</Text>
                                <Text style={styles.statLabel}>Total Stars</Text>
                            </LinearGradient>
                        </View>

                        <View style={styles.statCard}>
                            <LinearGradient
                                colors={['rgba(16, 185, 129, 0.2)', 'rgba(5, 150, 105, 0.1)']}
                                style={styles.statGradient}
                            >
                                <Text style={styles.statValue}>{stats.totalDays}</Text>
                                <Text style={styles.statLabel}>Days Active</Text>
                            </LinearGradient>
                        </View>

                        <View style={styles.statCard}>
                            <LinearGradient
                                colors={['rgba(245, 158, 11, 0.2)', 'rgba(239, 68, 68, 0.1)']}
                                style={styles.statGradient}
                            >
                                <Text style={styles.statValue}>{Math.round(stats.consistency)}%</Text>
                                <Text style={styles.statLabel}>Consistency</Text>
                            </LinearGradient>
                        </View>

                        <View style={styles.statCard}>
                            <LinearGradient
                                colors={['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.1)']}
                                style={styles.statGradient}
                            >
                                <Text style={styles.statValue}>{userProfile.badges.length}</Text>
                                <Text style={styles.statLabel}>Badges Earned</Text>
                            </LinearGradient>
                        </View>
                    </View>

                    {/* Badges Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.badgesContainer}
                        >
                            {allBadges.map(badge => (
                                <Badge
                                    key={badge.id}
                                    badge={badge}
                                    unlocked={userProfile.badges.includes(badge.id)}
                                    size={80}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Identity Message */}
                    <View style={styles.identityCard}>
                        <LinearGradient
                            colors={['rgba(139, 92, 246, 0.15)', 'rgba(59, 130, 246, 0.1)']}
                            style={styles.identityGradient}
                        >
                            <Text style={styles.identityIcon}>💪</Text>
                            <Text style={styles.identityText}>
                                You are the kind of person who builds great habits, one small step at a time.
                            </Text>
                        </LinearGradient>
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
    title: {
        fontSize: theme.fonts.sizes.xxxl,
        fontWeight: '700',
        color: theme.colors.text,
    },
    levelCard: {
        marginBottom: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        ...theme.shadows.lg,
    },
    levelGradient: {
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
    },
    levelContent: {
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    levelLabel: {
        fontSize: theme.fonts.sizes.md,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: theme.spacing.xs,
    },
    levelNumber: {
        fontSize: 72,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    levelPoints: {
        fontSize: theme.fonts.sizes.lg,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    progressContainer: {
        marginTop: theme.spacing.md,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.sm,
    },
    progressLabel: {
        fontSize: theme.fonts.sizes.sm,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '600',
    },
    progressPercentage: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.text,
        fontWeight: '700',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    statCard: {
        width: '47%',
        borderRadius: theme.borderRadius.md,
        overflow: 'hidden',
        ...theme.shadows.sm,
    },
    statGradient: {
        padding: theme.spacing.lg,
        alignItems: 'center',
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.1)',
    },
    statValue: {
        fontSize: theme.fonts.sizes.xxl,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
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
    badgesContainer: {
        paddingVertical: theme.spacing.sm,
    },
    identityCard: {
        marginBottom: theme.spacing.xl,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
    },
    identityGradient: {
        padding: theme.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    identityIcon: {
        fontSize: 32,
        marginRight: theme.spacing.md,
    },
    identityText: {
        flex: 1,
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.text,
        lineHeight: 22,
    },
});

export default ProfileScreen;
