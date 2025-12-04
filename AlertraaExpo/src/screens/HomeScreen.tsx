import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockData } from '../lib/mockData';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../lib/theme';
import type { Vital, DailyActivity } from '../types';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  isDarkMode: boolean;
}

interface MetricCardProps {
  name: string;
  value: string;
  icon: string;
  color: string;
  isDarkMode: boolean;
  onPress: () => void;
}

const MetricCard = ({ name, value, icon, color, isDarkMode, onPress }: MetricCardProps) => {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  
  return (
    <TouchableOpacity
      style={[
        styles.metricCard,
        { backgroundColor: isDarkMode ? colors.dark.secondary : colors.light.secondary },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.metricName, { color: themeColors.foreground }]}>{name}</Text>
      <Text style={[styles.metricValue, { color: themeColors.foreground }]}>{value}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ isDarkMode }: HomeScreenProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [quoteIndex, setQuoteIndex] = useState(0);

  const metrics = [
    { name: 'Heart Rate', value: mockData.vitals.heartRate, icon: 'heart', color: colors.heartRate },
    { name: 'Blood Pressure', value: mockData.vitals.bloodPressure, icon: 'activity', color: colors.bloodPressure },
    { name: 'Blood Oxygen', value: mockData.vitals.bloodOxygen, icon: 'wind', color: colors.bloodOxygen },
    { name: 'Steps', value: mockData.dailyActivity.steps, icon: 'footprints', color: colors.steps },
    { name: 'Sleep', value: mockData.dailyActivity.sleepHours, icon: 'moon', color: colors.sleep },
    { name: 'Calories', value: mockData.dailyActivity.caloriesBurnt, icon: 'zap', color: colors.calories },
  ];

  const handleMetricPress = (metricName: string) => {
    // Navigate to metric details
    // Add navigation logic here
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: themeColors.card, borderBottomColor: themeColors.border }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
          <Text style={[styles.headerTitle, { color: themeColors.foreground }]}>Alertraa</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="shopping-cart" size={24} color={themeColors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="bell" size={24} color={themeColors.foreground} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="settings" size={24} color={themeColors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <MetricCard
                key={`${metric.name}-${index}`}
                name={metric.name}
                value={metric.value}
                icon={metric.icon}
                color={metric.color}
                isDarkMode={isDarkMode}
                onPress={() => handleMetricPress(metric.name)}
              />
            ))}
          </View>
        </View>

        {/* Quote Card */}
        <View style={[styles.quoteCard, { backgroundColor: themeColors.card }]}>
          <Icon name="quote" size={24} color={themeColors.primary} style={styles.quoteIcon} />
          <Text style={[styles.quoteText, { color: themeColors.foreground }]}>
            "{mockData.quotes[quoteIndex].text}"
          </Text>
          <Text style={[styles.quoteAuthor, { color: themeColors.mutedForeground }]}>
            - {mockData.quotes[quoteIndex].author}
          </Text>
        </View>

        {/* Location Card */}
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <View style={styles.cardHeader}>
            <Icon name="map-pin" size={20} color={themeColors.primary} />
            <Text style={[styles.cardTitle, { color: themeColors.foreground }]}>Live Location</Text>
            <Icon name="chevron-right" size={20} color={themeColors.mutedForeground} />
          </View>
          <View style={[styles.mapPlaceholder, { backgroundColor: themeColors.secondary }]}>
            <Icon name="map" size={48} color={themeColors.mutedForeground} />
            <Text style={[styles.address, { color: themeColors.foreground }]}>
              {mockData.location.address}
            </Text>
          </View>
        </View>

        {/* Emergencies Card */}
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <View style={styles.cardHeader}>
            <Icon name="alert-triangle" size={20} color={colors.warning} />
            <Text style={[styles.cardTitle, { color: themeColors.foreground }]}>Recent Emergencies</Text>
          </View>
          {mockData.emergencies.slice(0, 3).map((emergency, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.emergencyItem, { borderBottomColor: themeColors.border }]}
            >
              <View style={styles.emergencyContent}>
                <Icon
                  name="alert-circle"
                  size={16}
                  color={
                    emergency.severity === 'critical'
                      ? colors.error
                      : emergency.severity === 'major'
                      ? colors.warning
                      : colors.info
                  }
                />
                <View style={styles.emergencyText}>
                  <Text style={[styles.emergencyDate, { color: themeColors.mutedForeground }]}>
                    {emergency.date}
                  </Text>
                  <Text style={[styles.emergencySummary, { color: themeColors.foreground }]}>
                    {emergency.summary}
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" size={16} color={themeColors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerIcon: {
    padding: spacing.xs,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  metricsContainer: {
    padding: spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  metricCard: {
    width: (width - spacing.md * 4) / 3,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricName: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  quoteCard: {
    margin: spacing.md,
    marginTop: 0,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteIcon: {
    marginBottom: spacing.sm,
  },
  quoteText: {
    fontSize: fontSize.md,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  quoteAuthor: {
    fontSize: fontSize.sm,
  },
  card: {
    margin: spacing.md,
    marginTop: 0,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cardTitle: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  mapPlaceholder: {
    height: 150,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  address: {
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    flex: 1,
  },
  emergencyText: {
    flex: 1,
    gap: spacing.xs,
  },
  emergencyDate: {
    fontSize: fontSize.xs,
  },
  emergencySummary: {
    fontSize: fontSize.sm,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});
