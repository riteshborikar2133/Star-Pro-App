import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface ProgressBarProps {
  progress: number;
  max: number;
  height?: number;
  fillColor?: string;
  unfilledColor?: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  max,
  height = 16,
  fillColor = '#4CAF50',
  unfilledColor = '#E0E0E0',
  textStyle,
  style,
}) => {
  const ratio = Math.min(progress / max, 1);

  return (
    <View style={[styles.container, {height}, style]}>
      <View
        style={[styles.filled, {flex: ratio, backgroundColor: fillColor}]}
      />
      <View
        style={[
          styles.unfilled,
          {flex: 1 - ratio, backgroundColor: unfilledColor},
        ]}
      />
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Text style={[styles.text, textStyle]}>{`${progress}/${max}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  filled: {
    backgroundColor: '#4CAF50',
  },
  unfilled: {
    backgroundColor: '#E0E0E0',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    color: '#000',
  },
});

export default ProgressBar;
