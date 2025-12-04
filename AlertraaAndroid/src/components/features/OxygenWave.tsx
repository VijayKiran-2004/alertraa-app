import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../lib/theme';

interface OxygenWaveProps {
  percentage: number;
  width?: number;
  height?: number;
  color?: string;
}

export default function OxygenWave({
  percentage,
  width = 100,
  height = 40,
  color = colors.bloodOxygen,
}: OxygenWaveProps) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [animValue]);

  // Sine wave pattern for oxygen flow
  const amplitude = height * 0.3;
  const frequency = 3;
  const points: string[] = [];

  for (let x = 0; x <= width; x += 2) {
    const y = height / 2 + amplitude * Math.sin((x / width) * frequency * Math.PI * 2);
    points.push(`${x},${y}`);
  }

  const pathData = `M ${points.join(' L ')}`;

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        <Path
          d={pathData}
          fill="none"
          stroke={color}
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
