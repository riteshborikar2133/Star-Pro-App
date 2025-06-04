import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CountriesSettings from '../screens/Settings/CountriesSettings';
import ExploreUser from '../screens/Explore/ExploreUser';

export type RootStackParamList = {
  MainTabs: undefined;
  CountriesSettings: undefined;
  ExploreUser: {username: string}; // add param if ExploreUser expects username
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CountriesSettings" component={CountriesSettings} />
      <Stack.Screen name="ExploreUser" component={ExploreUser} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
