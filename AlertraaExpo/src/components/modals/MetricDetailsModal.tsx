import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../lib/theme';
import Card from '../ui/Card';
import MetricChart from '../ui/MetricChart';
import type { Reading } from '../../types';

interface MetricDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  metricName: string;
  currentValue: string;
  data: Reading[];
  recommendation?: string;
  isDarkMode?: boolean;
}

export default function MetricDetailsModal({
  visible,
  onClose,
  metricName,
  currentValue,
  data,
  recommendation,
  isDarkMode = false,
}: MetricDetailsModalProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const getMetricColor = () => {
    switch (metricName) {
      case 'Heart Rate':
        return colors.heartRate;
      case 'Blood Pressure':
        return colors.bloodPressure;
      case 'Blood Oxygen':
        return colors.bloodOxygen;
      case 'Steps':
        return colors.steps;
      case 'Sleep':
        return colors.sleep;
      case 'Calories':
        return colors.calories;
      default:
        return colors.light.primary;
    }
  };

  const metricData = data.filter((r) => r.type === metricName);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: themeColors.background }]}>
          <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.title, { color: themeColors.foreground }]}>{metricName}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="x" size={24} color={themeColors.foreground} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Current Value */}
            <Card isDarkMode={isDarkMode} style={styles.valueCard}>
              <Text style={[styles.label, { color: themeColors.mutedForeground }]}>
                Current Value
              </Text>
              <Text style={[styles.value, { color: getMetricColor() }]}>{currentValue}</Text>
            </Card>

            {/* Chart */}
            <Card isDarkMode={isDarkMode} style={styles.chartCard}>
              <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>
                Trend (Last 7 days)
              </Text>
              <MetricChart
                data={metricData}
                color={getMetricColor()}
                isDarkMode={isDarkMode}
                height={200}
              />
            </Card>

            {/* Statistics */}
            <Card isDarkMode={isDarkMode} style={styles.statsCard}>
              <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>
                Statistics
              </Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Icon name="trending-up" size={20} color={colors.success} />
                  <Text style={[styles.statLabel, { color: themeColors.mutedForeground }]}>
                    Average
                  </Text>
                  <Text style={[styles.statValue, { color: themeColors.foreground }]}>
                    {metricData.length > 0
                      ? Math.round(
                          metricData.reduce((sum, r) => sum + r.value, 0) / metricData.length
                        )
                      : 0}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="arrow-up" size={20} color={colors.error} />
                  <Text style={[styles.statLabel, { color: themeColors.mutedForeground }]}>
                    Highest
                  </Text>
                  <Text style={[styles.statValue, { color: themeColors.foreground }]}>
                    {metricData.length > 0 ? Math.max(...metricData.map((r) => r.value)) : 0}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="arrow-down" size={20} color={colors.info} />
                  <Text style={[styles.statLabel, { color: themeColors.mutedForeground }]}>
                    Lowest
                  </Text>
                  <Text style={[styles.statValue, { color: themeColors.foreground }]}>
                    {metricData.length > 0 ? Math.min(...metricData.map((r) => r.value)) : 0}
                  </Text>
                </View>
              </View>
            </Card>

            {/* Recommendation */}
            {recommendation && (
              <Card isDarkMode={isDarkMode} style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <Icon name="lightbulb" size={20} color={colors.warning} />
                  <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>
                    Recommendation
                  </Text>
                </View>
                <Text style={[styles.recommendationText, { color: themeColors.foreground }]}>
                  {recommendation}
                </Text>
              </Card>
            )}

            <View style={styles.bottomPadding} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    height: '90%',
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  valueCard: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
  },
  chartCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  statsCard: {
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  recommendationCard: {
    marginBottom: spacing.md,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  recommendationText: {
    fontSize: fontSize.md,
    lineHeight: 22,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});
