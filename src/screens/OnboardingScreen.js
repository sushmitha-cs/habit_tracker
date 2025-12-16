import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';
import { HABIT_TEMPLATES } from '../data/habitTemplates';
import StorageService from '../services/StorageService';

const OnboardingScreen = ({ navigation }) => {
    const [selectedHabits, setSelectedHabits] = useState([]);

    const toggleHabit = (template) => {
        if (selectedHabits.find(h => h.id === template.id)) {
            setSelectedHabits(selectedHabits.filter(h => h.id !== template.id));
        } else {
            if (selectedHabits.length < 5) {
                setSelectedHabits([...selectedHabits, template]);
            }
        }
    };

    const handleContinue = async () => {
        if (selectedHabits.length >= 3) {
            // Create habits from templates
            const habits = selectedHabits.map((template, index) => ({
                id: `habit_${Date.now()}_${index}`,
                name: template.name,
                description: template.description,
                icon: template.icon,
                importance: template.importance,
                createdAt: new Date().toISOString(),
            }));

            // Save habits
            await StorageService.saveHabits(habits);

            // Initialize user profile
            const profile = {
                totalPoints: 0,
                level: 1,
                badges: [],
                createdAt: new Date().toISOString(),
            };
            await StorageService.saveUserProfile(profile);

            // Mark onboarding as complete
            await StorageService.setOnboardingComplete(true);

            // Navigate to main app
            navigation.replace('Main');
        }
    };

    const isSelected = (templateId) => {
        return selectedHabits.find(h => h.id === templateId) !== undefined;
    };

    return (
        <LinearGradient
            colors={theme.colors.gradients.dark}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome! 🎯</Text>
                        <Text style={styles.subtitle}>
                            You are the kind of person who builds great habits, one small step at a time.
                        </Text>
                        <Text style={styles.instruction}>
                            Choose 3-5 micro-habits to start your journey:
                        </Text>
                    </View>

                    <View style={styles.templatesContainer}>
                        {HABIT_TEMPLATES.map((template) => {
                            const selected = isSelected(template.id);
                            return (
                                <TouchableOpacity
                                    key={template.id}
                                    onPress={() => toggleHabit(template)}
                                    activeOpacity={0.7}
                                >
                                    <LinearGradient
                                        colors={selected
                                            ? theme.colors.gradients.primary
                                            : ['rgba(30, 41, 59, 0.8)', 'rgba(30, 41, 59, 0.8)']
                                        }
                                        style={styles.templateCard}
                                    >
                                        <Text style={styles.templateIcon}>{template.icon}</Text>
                                        <View style={styles.templateInfo}>
                                            <Text style={styles.templateName}>{template.name}</Text>
                                            <Text style={styles.templateDescription}>{template.description}</Text>
                                        </View>
                                        {selected && (
                                            <View style={styles.checkmark}>
                                                <Text style={styles.checkmarkText}>✓</Text>
                                            </View>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.selectedCount}>
                            {selectedHabits.length} / 5 selected (minimum 3)
                        </Text>

                        <TouchableOpacity
                            onPress={handleContinue}
                            disabled={selectedHabits.length < 3}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={selectedHabits.length >= 3
                                    ? theme.colors.gradients.primary
                                    : ['#475569', '#475569']
                                }
                                style={styles.continueButton}
                            >
                                <Text style={styles.continueButtonText}>
                                    {selectedHabits.length < 3 ? 'Select at least 3 habits' : 'Start Building Habits'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
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
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.fonts.sizes.xxxl,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.fonts.sizes.lg,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
        lineHeight: 24,
    },
    instruction: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    templatesContainer: {
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    templateCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        ...theme.shadows.md,
    },
    templateIcon: {
        fontSize: 32,
        marginRight: theme.spacing.md,
    },
    templateInfo: {
        flex: 1,
    },
    templateName: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 2,
    },
    templateDescription: {
        fontSize: theme.fonts.sizes.sm,
        color: theme.colors.textSecondary,
    },
    checkmark: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '700',
    },
    footer: {
        marginTop: theme.spacing.lg,
    },
    selectedCount: {
        fontSize: theme.fonts.sizes.md,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
    },
    continueButton: {
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        ...theme.shadows.lg,
    },
    continueButtonText: {
        fontSize: theme.fonts.sizes.lg,
        fontWeight: '600',
        color: theme.colors.text,
    },
});

export default OnboardingScreen;
