import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { colors, spacing, fontSize } from '../../lib/theme';

interface BloodPressureGaugeProps {
  systolic: number;
  diastolic?: number;
  width?: number;
  height?: number;
  color?: string;
}

export default function BloodPressureGauge({
  systolic,
  diastolic,
  width = 100,
  height = 40,
  color = colors.bloodPressure,
}: BloodPressureGaugeProps) {
  // Map systolic value to angle (0-180 degrees)
  // Normal: 90-120, High: >140
  const minValue = 80;
  const maxValue = 180;
  const normalizedValue = Math.min(Math.max(systolic, minValue), maxValue);
  const percentage = (normalizedValue - minValue) / (maxValue - minValue);
  const angle = -90 + percentage * 180; // -90 to 90 degrees

  const radius = Math.min(width, height) / 2 - 5;
  const centerX = width / 2;
  const centerY = height - 5;

  // Calculate needle endpoint
  const needleLength = radius * 0.8;
  const angleRad = (angle * Math.PI) / 180;
  const needleX = centerX + needleLength * Math.cos(angleRad);
  const needleY = centerY + needleLength * Math.sin(angleRad);

  // Determine color based on value
  const getColor = () => {
    if (systolic < 90) return colors.info;
    if (systolic <= 120) return colors.success;
    if (systolic <= 140) return colors.warning;
    return colors.error;
  };

  const gaugeColor = getColor();

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        {/* Gauge arc background */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={colors.light.border}
          strokeWidth="4"
          strokeDasharray={`${Math.PI * radius} ${Math.PI * radius}`}
          strokeDashoffset={Math.PI * radius / 2}
          rotation="-90"
          origin={`${centerX}, ${centerY}`}
        />

        {/* Gauge arc colored */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={gaugeColor}
          strokeWidth="4"
          strokeDasharray={`${Math.PI * radius * percentage} ${Math.PI * radius}`}
          strokeDashoffset={Math.PI * radius / 2}
          rotation="-90"
          origin={`${centerX}, ${centerY}`}
          strokeLinecap="round"
        />

        {/* Center dot */}
        <Circle cx={centerX} cy={centerY} r="3" fill={gaugeColor} />

        {/* Needle */}
        <Line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke={gaugeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
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
