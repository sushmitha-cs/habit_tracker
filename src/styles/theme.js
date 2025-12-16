export const theme = {
    colors: {
        // Primary gradient colors (vibrant purple to blue)
        primary: '#8B5CF6',
        primaryDark: '#7C3AED',
        primaryLight: '#A78BFA',
        secondary: '#3B82F6',
        secondaryDark: '#2563EB',

        // Accent colors
        accent: '#F59E0B',
        accentLight: '#FBBF24',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',

        // Neutral colors
        background: '#0F172A',
        backgroundLight: '#1E293B',
        surface: '#1E293B',
        surfaceLight: '#334155',

        // Text colors
        text: '#F1F5F9',
        textSecondary: '#94A3B8',
        textMuted: '#64748B',

        // Star colors
        starEmpty: '#475569',
        starFilled: '#FBBF24',

        // Gradient definitions
        gradients: {
            primary: ['#8B5CF6', '#3B82F6'],
            secondary: ['#F59E0B', '#EF4444'],
            success: ['#10B981', '#059669'],
            dark: ['#1E293B', '#0F172A'],
            card: ['rgba(30, 41, 59, 0.8)', 'rgba(15, 23, 42, 0.6)'],
        },
    },

    fonts: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
        sizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 24,
            xxl: 32,
            xxxl: 48,
        },
    },

    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
    },

    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
    },

    // Glassmorphism effect
    glass: {
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.1)',
    },
};
