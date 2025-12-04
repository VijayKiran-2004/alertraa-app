import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { colors, spacing, fontSize } from '../../lib/theme';
import type { Reading } from '../../types';

const { width } = Dimensions.get('window');

interface MetricChartProps {
  data: Reading[];
  height?: number;
  color?: string;
  isDarkMode?: boolean;
  showYAxis?: boolean;
}

export default function MetricChart({
  data,
  height = 150,
  color = colors.light.primary,
  isDarkMode = false,
  showYAxis = true,
}: MetricChartProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const chartWidth = width - spacing.xxxl * 2;
  const padding = showYAxis ? 40 : 20;

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text style={[styles.noData, { color: themeColors.mutedForeground }]}>
          No data available
        </Text>
      </View>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const valueRange = maxValue - minValue || 1;

  const points = data.map((reading, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - padding * 2);
    const y = height - padding - ((reading.value - minValue) / valueRange) * (height - padding * 2);
    return { x, y, value: reading.value, date: reading.date };
  });

  const pathData = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    const prevPoint = points[index - 1];
    const cpX1 = prevPoint.x + (point.x - prevPoint.x) / 3;
    const cpY1 = prevPoint.y;
    const cpX2 = point.x - (point.x - prevPoint.x) / 3;
    const cpY2 = point.y;
    return `${path} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${point.x} ${point.y}`;
  }, '');

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={height}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <Line
            key={index}
            x1={padding}
            y1={height - padding - ratio * (height - padding * 2)}
            x2={chartWidth - padding}
            y2={height - padding - ratio * (height - padding * 2)}
            stroke={themeColors.border}
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        ))}

        {/* Chart line */}
        <Path d={pathData} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Data points */}
        {points.map((point, index) => (
          <React.Fragment key={index}>
            <Line
              x1={point.x}
              y1={point.y}
              x2={point.x}
              y2={point.y}
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
            />
          </React.Fragment>
        ))}
      </Svg>

      {/* X-axis labels */}
      <View style={styles.xAxis}>
        {data.map((reading, index) => (
          <Text
            key={index}
            style={[
              styles.axisLabel,
              { color: themeColors.mutedForeground, width: chartWidth / data.length },
            ]}
          >
            {reading.date}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  noData: {
    fontSize: fontSize.md,
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'center',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  axisLabel: {
    fontSize: fontSize.xs,
    textAlign: 'center',
  },
});
