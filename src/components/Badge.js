import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

const Badge = ({ badge, unlocked = false, size = 80 }) => {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {unlocked ? (
                <LinearGradient
                    colors={theme.colors.gradients.primary}
                    style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}
                >
                    <Text style={[styles.icon, { fontSize: size * 0.5 }]}>{badge.icon}</Text>
                </LinearGradient>
            ) : (
                <View style={[styles.badgeLocked, { width: size, height: size, borderRadius: size / 2 }]}>
                    <Text style={[styles.iconLocked, { fontSize: size * 0.5 }]}>🔒</Text>
                </View>
            )}
            <Text style={[styles.name, unlocked ? styles.nameUnlocked : styles.nameLocked]} numberOfLines={2}>
                {badge.name}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: theme.spacing.sm,
    },
    badge: {
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.md,
    },
    badgeLocked: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceLight,
        opacity: 0.5,
    },
    icon: {
        textAlign: 'center',
    },
    iconLocked: {
        textAlign: 'center',
        opacity: 0.5,
    },
    name: {
        marginTop: theme.spacing.xs,
        fontSize: theme.fonts.sizes.xs,
        textAlign: 'center',
        maxWidth: 80,
    },
    nameUnlocked: {
        color: theme.colors.text,
        fontWeight: '600',
    },
    nameLocked: {
        color: theme.colors.textMuted,
    },
});

export default Badge;
