import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../lib/theme';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  icon?: string;
}

export default function Badge({ text, variant = 'default', icon }: BadgeProps) {
  const variantColors: Record<string, string> = {
    default: colors.light.mutedForeground,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  };

  const backgroundColor = variantColors[variant];

  return (
    <View style={[styles.badge, { backgroundColor: backgroundColor + '20' }]}>
      {icon && <Icon name={icon} size={12} color={backgroundColor} />}
      <Text style={[styles.text, { color: backgroundColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
});
