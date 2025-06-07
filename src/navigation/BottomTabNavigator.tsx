import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import FeedScreen from '../screens/Feed/FeedScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import LiveScreen from '../screens/Live/LiveScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

type TabParamList = {
  Feed: undefined;
  Explore: undefined;
  Live: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const iconMap = {
  Feed: require('../../assets/Icon/HomeButton.png'),
  Explore: require('../../assets/Icon/Searchbutton.png'),
  Live: require('../../assets/Icon/clip.png'),
  Notifications: require('../../assets/Icon/Notificationbutton.png'),
  Profile: require('../../assets/Icon/Profilebutton.png'),
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({route}) => ({
        tabBarIcon: ({size}) => (
          <Image
            source={iconMap[route.name as keyof typeof iconMap]}
            style={[styles.icon, {width: size, height: size}]}
            resizeMode="contain"
          />
        ),
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    tintColor: '#000', // If you want to apply color tint
  },
});

export default BottomTabNavigator;
