import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/RootNavigator'; // update the path as needed

const tabs = [
  {name: 'Feed', icon: require('../../assets/Icon/HomeButton.png')},
  {name: 'Explore', icon: require('../../assets/Icon/Searchbutton.png')},
  {name: 'Live', icon: require('../../assets/Icon/clip.png')},
  {
    name: 'Notifications',
    icon: require('../../assets/Icon/Notificationbutton.png'),
  },
  {name: 'Profile', icon: require('../../assets/Icon/Profilebutton.png')},
];

const CustomTabBar = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          onPress={() =>
            navigation.navigate('MainTabs', {screen: tab.name as any})
          }>
          <Image source={tab.icon} style={styles.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
});

export default CustomTabBar;
