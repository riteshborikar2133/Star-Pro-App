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
import ChatSettingScreen from '../screens/Settings/ChatSettingScreen';
import GeneralSettingScreen from '../screens/Settings/GeneralSettingScreen';
import AgencyPortalScreen from '../screens/Settings/AgencyPortalScreen';
import AgencyDataScreen from '../screens/Settings/AgencyDataScreen';
import HostSettingScreen from '../screens/Settings/HostSettingScreen';
import CashoutScreen from '../screens/Settings/CashoutScreen';
import ManageAdminScreen from '../screens/Settings/ManageAdminScreen';
import EditProfileScreen from '../screens/Settings/EditProfileScreen';
import {useAuth} from '../context/AuthContext';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: {screen: 'Feed' | 'Explore' | 'Live' | 'Notifications' | 'Profile'};
  CountriesSettings: undefined;
  ExploreUser: {username: string};
  SettingScreen: undefined;
  RechargeScreen: undefined;
  AccountScreen: undefined;
  NotificationScreen: undefined;
  LiveNotificationScreen: undefined;
  ChatInterface: {username: string};
  PostDetailScreen: {index: string; data: string};
  PrivacyScreen: undefined;
  ChatSettingScreen: undefined;
  GeneralSettingScreen: undefined;
  AgencyPortalScreen: undefined;
  AgencyDataScreen: {agencyName: string};
  HostSettingScreen: {hostName: string};
  CashoutScreen: undefined;
  ManageAdminScreen: undefined;
  EditProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {user} = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // Smooth iOS-like animation
        gestureEnabled: true, // Swipe back gesture
        fullScreenGestureEnabled: true, // Edge-to-edge feel
        animationDuration: 250, // Faster transition
      }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen
            name="CountriesSettings"
            component={CountriesSettings}
          />
          <Stack.Screen name="ExploreUser" component={ExploreUser} />
          <Stack.Screen name="SettingScreen" component={SettingsScreen} />
          <Stack.Screen name="RechargeScreen" component={RechargeScreen} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen
            name="LiveNotificationScreen"
            component={LiveNotificationScreen}
          />
          <Stack.Screen name="ChatInterface" component={ChatInterface} />
          <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
          <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
          <Stack.Screen
            name="ChatSettingScreen"
            component={ChatSettingScreen}
          />
          <Stack.Screen
            name="GeneralSettingScreen"
            component={GeneralSettingScreen}
          />
          <Stack.Screen
            name="AgencyPortalScreen"
            component={AgencyPortalScreen}
          />
          <Stack.Screen name="AgencyDataScreen" component={AgencyDataScreen} />
          <Stack.Screen
            name="HostSettingScreen"
            component={HostSettingScreen}
          />
          <Stack.Screen name="CashoutScreen" component={CashoutScreen} />
          <Stack.Screen
            name="ManageAdminScreen"
            component={ManageAdminScreen}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
