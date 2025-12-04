export const colors = {
  // Light theme colors
  light: {
    background: '#f0f5fa',
    foreground: '#0a1628',
    card: '#f5f8fa',
    cardForeground: '#0a1628',
    primary: '#6b9dd9',
    primaryForeground: '#fafafa',
    secondary: '#e8f0f5',
    secondaryForeground: '#1a2a42',
    muted: '#e8f0f5',
    mutedForeground: '#6b7280',
    accent: '#8fc4f0',
    accentForeground: '#1a2a42',
    destructive: '#ef4444',
    destructiveForeground: '#fafafa',
    border: '#e2e8f0',
  },
  // Dark theme colors
  dark: {
    background: '#0a1628',
    foreground: '#e8f0f5',
    card: '#0a1628',
    cardForeground: '#e8f0f5',
    primary: '#6b9dd9',
    primaryForeground: '#e8f0f5',
    secondary: '#1e3a5f',
    secondaryForeground: '#e8f0f5',
    muted: '#1e3a5f',
    mutedForeground: '#9ca3af',
    accent: '#8fc4f0',
    accentForeground: '#e8f0f5',
    destructive: '#7f1d1d',
    destructiveForeground: '#e8f0f5',
    border: '#1e3a5f',
  },
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  // Health metric colors
  heartRate: '#ef4444',
  bloodPressure: '#3b82f6',
  bloodOxygen: '#06b6d4',
  calories: '#f97316',
  steps: '#22c55e',
  sleep: '#6366f1',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 28,
  display: 32,
};

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
