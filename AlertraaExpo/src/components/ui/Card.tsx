import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../lib/theme';

interface CardProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
  style?: ViewStyle;
  padding?: number;
}

export default function Card({ children, isDarkMode = false, style, padding = spacing.lg }: CardProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColors.card,
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
