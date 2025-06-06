import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CountriesSettings from '../screens/Settings/CountriesSettings';
import ExploreUser from '../screens/Explore/ExploreUser';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import RechargeScreen from '../screens/Settings/RechargeScreen';
import AccountScreen from '../screens/Settings/AccountScreen';
import NotificationScreen from '../screens/Settings/NotificationScreen';
import LiveNotificationScreen from '../screens/Settings/LiveNotificationScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  CountriesSettings: undefined;
  ExploreUser: {username: string}; // add param if ExploreUser expects username
  SettingScreen: undefined;
  RechargeScreen: undefined;
  AccountScreen: undefined;
  NotificationScreen: undefined;
  LiveNotificationScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CountriesSettings" component={CountriesSettings} />
      <Stack.Screen name="ExploreUser" component={ExploreUser} />
      <Stack.Screen name="SettingScreen" component={SettingsScreen} />
      <Stack.Screen name="RechargeScreen" component={RechargeScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="LiveNotificationScreen"
        component={LiveNotificationScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
