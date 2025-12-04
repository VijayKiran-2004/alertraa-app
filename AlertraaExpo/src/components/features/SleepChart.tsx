import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { colors, spacing, fontSize, fontWeight } from '../../lib/theme';
import type { Reading } from '../../types';

interface SleepChartProps {
  data: Reading[];
  isDarkMode?: boolean;
  width?: number;
  height?: number;
}

export default function SleepChart({
  data,
  isDarkMode = false,
  width = 100,
  height = 40,
}: SleepChartProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  
  if (!data || data.length === 0) {
    return null;
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = width / data.length - 2;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {data.map((reading, index) => {
          const barHeight = (reading.value / maxValue) * height;
          const x = index * (barWidth + 2);
          const y = height - barHeight;

          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={colors.sleep}
              opacity={0.7}
              rx={2}
            />
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
