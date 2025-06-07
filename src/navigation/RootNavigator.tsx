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
import ChatInterface from '../screens/ChatInterface/ChatInterface';
import MomentScreen from '../screens/Profile/MomentScreen';
import PostDetailScreen from '../screens/Profile/PostDetailScreen';
import PrivacyScreen from '../screens/Settings/PrivacyScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  CountriesSettings: undefined;
  ExploreUser: {username: string}; // add param if ExploreUser expects username
  SettingScreen: undefined;
  RechargeScreen: undefined;
  AccountScreen: undefined;
  NotificationScreen: undefined;
  LiveNotificationScreen: undefined;
  ChatInterface: {username: string};
  PostDetailScreen: {index: string; data: string}; // ✅ updated
  PrivacyScreen: undefined;
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
      <Stack.Screen name="ChatInterface" component={ChatInterface} />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
