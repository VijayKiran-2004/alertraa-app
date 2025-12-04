import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import MedicineScreen from '../screens/MedicineScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors, spacing, borderRadius } from '../lib/theme';

export type MainTabParamList = {
  Home: undefined;
  Booking: undefined;
  Medicine: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

interface MainTabNavigatorProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  isDarkMode: boolean;
}

const SosButton = ({ onPress, isDarkMode }: { onPress: () => void; isDarkMode: boolean }) => (
  <TouchableOpacity
    style={styles.sosButton}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.sosText}>SOS</Text>
  </TouchableOpacity>
);

const CustomTabBar = ({ state, descriptors, navigation, isDarkMode }: CustomTabBarProps) => {
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const icons: Record<string, string> = {
    Home: 'heart',
    Booking: 'file-text',
    Medicine: 'package',
    Profile: 'user',
  };

  const handleSosPress = () => {
    // Handle SOS press - show alert or navigate to SOS screen
    // Alert or navigation logic here
  };

  return (
    <View style={[styles.tabBar, { backgroundColor: themeColors.card, borderTopColor: themeColors.border }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Insert SOS button after Booking (index 1)
        if (index === 2) {
          return (
            <React.Fragment key="sos-fragment">
              <SosButton onPress={handleSosPress} isDarkMode={isDarkMode} />
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                <Icon
                  name={icons[route.name]}
                  size={24}
                  color={isFocused ? themeColors.primary : themeColors.mutedForeground}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? themeColors.primary : themeColors.mutedForeground },
                  ]}
                >
                  {route.name}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Icon
              name={icons[route.name]}
              size={24}
              color={isFocused ? themeColors.primary : themeColors.mutedForeground}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? themeColors.primary : themeColors.mutedForeground },
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function MainTabNavigator({ isDarkMode, toggleDarkMode, onLogout }: MainTabNavigatorProps) {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} isDarkMode={isDarkMode} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home">
        {(props: any) => <HomeScreen {...props} isDarkMode={isDarkMode} />}
      </Tab.Screen>
      <Tab.Screen name="Booking">
        {(props: any) => <BookingScreen {...props} isDarkMode={isDarkMode} />}
      </Tab.Screen>
      <Tab.Screen name="Medicine">
        {(props: any) => <MedicineScreen {...props} isDarkMode={isDarkMode} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props: any) => (
          <ProfileScreen
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  sosButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
