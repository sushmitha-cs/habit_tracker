import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

const ProgressBar = ({ progress, height = 8, showGradient = true }) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <View style={[styles.container, { height }]}>
            <View style={[styles.background, { borderRadius: height / 2 }]}>
                {showGradient ? (
                    <LinearGradient
                        colors={theme.colors.gradients.primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                            styles.fill,
                            {
                                width: `${clampedProgress}%`,
                                borderRadius: height / 2,
                            },
                        ]}
                    />
                ) : (
                    <View
                        style={[
                            styles.fill,
                            {
                                width: `${clampedProgress}%`,
                                backgroundColor: theme.colors.primary,
                                borderRadius: height / 2,
                            },
                        ]}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.surfaceLight,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
    },
});

export default ProgressBar;
