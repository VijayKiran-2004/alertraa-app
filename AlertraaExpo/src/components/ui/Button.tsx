import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather as Icon } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../lib/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      borderRadius: borderRadius.lg,
      opacity: disabled ? 0.5 : 1,
    };

    const sizeStyles: Record<string, ViewStyle> = {
      sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
      md: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
      lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
    };

    const widthStyle: ViewStyle = fullWidth ? { width: '100%' } : {};

    return [baseStyle, sizeStyles[size], widthStyle, style || {}];
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles: Record<string, TextStyle> = {
      sm: { fontSize: fontSize.sm },
      md: { fontSize: fontSize.md },
      lg: { fontSize: fontSize.lg },
    };

    return {
      ...sizeStyles[size],
      fontWeight: fontWeight.semibold,
      color: variant === 'outline' ? colors.light.primary : '#fff',
    };
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
        <LinearGradient
          colors={[colors.light.primary, colors.light.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={getButtonStyle()}
        >
          {icon && <Icon name={icon} size={20} color="#fff" />}
          <Text style={getTextStyle()}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyles: Record<string, ViewStyle> = {
    secondary: { backgroundColor: colors.light.secondary },
    outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.light.primary },
    danger: { backgroundColor: colors.error },
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), variantStyles[variant]]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && <Icon name={icon} size={20} color={variant === 'outline' ? colors.light.primary : '#fff'} />}
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}
