import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from './StarRating';
import { theme } from '../styles/theme';
import PointsService from '../services/PointsService';

const HabitCard = ({ habit, stars = 0, onStarChange, disabled = false }) => {
    const points = PointsService.calculatePoints(stars, habit.importance);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>{habit.icon}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{habit.name}</Text>
                            <Text style={styles.description}>{habit.description}</Text>
                        </View>
                        <View style={styles.pointsContainer}>
                            <Text style={styles.points}>{points > 0 ? `+${points}` : points}</Text>
                            <Text style={styles.pointsLabel}>pts</Text>
                        </View>
                    </View>

                    <View style={styles.ratingContainer}>
                        <StarRating
                            value={stars}
                            onChange={onStarChange}
                            editable={!disabled}
                            size={28}
                        />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        ...theme.shadows.md,
    },
    gradient: {
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    content: {
        padding: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.md,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    icon: {
        fontSize: 24,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 2,
    },
    description: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },
    pointsContainer: {
        alignItems: 'flex-end',
    },
    points: {
        fontSize: theme.fonts.sizes.xl,
        fontWeight: '700',
        color: theme.colors.primary,
    },
    pointsLabel: {
        fontSize: theme.fonts.sizes.xs,
        color: theme.colors.textMuted,
    },
    ratingContainer: {
        alignItems: 'center',
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: 'rgba(148, 163, 184, 0.1)',
    },
});

export default HabitCard;
