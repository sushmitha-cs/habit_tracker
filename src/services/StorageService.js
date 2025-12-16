import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
    // Habits
    async saveHabits(habits) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
            return true;
        } catch (error) {
            console.error('Error saving habits:', error);
            return false;
        }
    }

    async loadHabits() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading habits:', error);
            return [];
        }
    }

    // Logs
    async saveLogs(logs) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
            return true;
        } catch (error) {
            console.error('Error saving logs:', error);
            return false;
        }
    }

    async loadLogs() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.LOGS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading logs:', error);
            return [];
        }
    }

    // User Profile
    async saveUserProfile(profile) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
            return true;
        } catch (error) {
            console.error('Error saving user profile:', error);
            return false;
        }
    }

    async loadUserProfile() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
            return data ? JSON.parse(data) : {
                totalPoints: 0,
                level: 1,
                badges: [],
                createdAt: new Date().toISOString(),
            };
        } catch (error) {
            console.error('Error loading user profile:', error);
            return {
                totalPoints: 0,
                level: 1,
                badges: [],
                createdAt: new Date().toISOString(),
            };
        }
    }

    // Onboarding
    async setOnboardingComplete(complete) {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, JSON.stringify(complete));
            return true;
        } catch (error) {
            console.error('Error setting onboarding status:', error);
            return false;
        }
    }

    async isOnboardingComplete() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
            return data ? JSON.parse(data) : false;
        } catch (error) {
            console.error('Error checking onboarding status:', error);
            return false;
        }
    }

    // Clear all data (for testing)
    async clearAll() {
        try {
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }
}

export default new StorageService();
