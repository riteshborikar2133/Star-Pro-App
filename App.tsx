import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/constant/ThemeContext';
import RootNavigator, {
  RootStackParamList,
} from './src/navigation/RootNavigator';
import {AuthProvider} from './src/context/AuthContext';

const AppWrapper = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['starenaarena://'], // Custom scheme
    config: {
      screens: {
        ExploreUser: {
          path: 'profile', // e.g., starenaarena://profile?id=PH103&username=johndoe
          parse: {
            id: (id: string) => id,
            username: (username: string) => username,
          },
        },
        // You can add other screens here if needed
      },
    },
  };

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        // backgroundColor={colorScheme === 'dark' ? '#000000' : 'white'}
      />
      <NavigationContainer linking={linking}>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppWrapper />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
