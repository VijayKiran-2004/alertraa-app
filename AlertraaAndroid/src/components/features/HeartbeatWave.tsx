import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { colors } from '../../lib/theme';

interface HeartbeatWaveProps {
  bpm: number;
  width?: number;
  height?: number;
  color?: string;
}

export default function HeartbeatWave({
  bpm,
  width = 100,
  height = 40,
  color = colors.heartRate,
}: HeartbeatWaveProps) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = (60 / bpm) * 1000; // Duration based on BPM

    Animated.loop(
      Animated.timing(animValue, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      })
    ).start();
  }, [bpm, animValue]);

  // ECG wave pattern points
  const points = [
    { x: 0, y: height / 2 },
    { x: width * 0.2, y: height / 2 },
    { x: width * 0.25, y: height * 0.9 },
    { x: width * 0.3, y: height * 0.1 },
    { x: width * 0.35, y: height / 2 },
    { x: width * 0.4, y: height * 0.4 },
    { x: width * 0.45, y: height / 2 },
    { x: width, y: height / 2 },
  ];

  const pointsString = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        <Polyline
          points={pointsString}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
