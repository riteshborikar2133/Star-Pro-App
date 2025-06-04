import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/constant/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator'; // <-- Updated

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator /> {/* <-- Updated */}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
