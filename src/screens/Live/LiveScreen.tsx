import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LiveScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Live Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default LiveScreen;
