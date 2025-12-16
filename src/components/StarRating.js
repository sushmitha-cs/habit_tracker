import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const StarRating = ({ value, onChange, size = 32, editable = true }) => {
    const stars = [1, 2, 3, 4, 5];

    const handlePress = (rating) => {
        if (editable && onChange) {
            // If tapping the same star, set to 0, otherwise set to the tapped value
            onChange(value === rating ? 0 : rating);
        }
    };

    return (
        <View style={styles.container}>
            {stars.map((star) => (
                <TouchableOpacity
                    key={star}
                    onPress={() => handlePress(star)}
                    disabled={!editable}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.star, { fontSize: size }]}>
                        {star <= value ? '⭐' : '☆'}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    star: {
        color: theme.colors.starFilled,
    },
});

export default StarRating;
