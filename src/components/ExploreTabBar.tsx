import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../constant/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  postCount: number;
}

const ExploreTabBar: React.FC<TabBarProps> = ({
  activeTab,
  setActiveTab,
  // theme,
  postCount,
}) => {
  const [count, setCount] = useState(0);
  const {theme} = useTheme();
  const handleTabPress = useCallback((tab: string) => {
    setActiveTab(tab);
    setCount(prev => prev + 1);
  }, []);

  return (
    <View style={[styles.tabHeader, {borderColor: theme.card}]}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          {
            // backgroundColor: 'red',
            width: wp(45),
            // borderColor: theme.card,
            // backgroundColor:
            //   activeTab === 'Notification' ? theme.accent1 : theme.card,
          },
        ]}
        onPress={() => handleTabPress('Post')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'Post'
              ? styles.activeTabText
              : styles.unactiveTabText,
            {
              fontFamily: theme.starArenaFont,
              // borderWidth: 1,
              // borderColor: 'red',
            },
          ]}>
          {' '}
          Posts {postCount}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={{
          // width: 1,
          height: '60%',
          // backgroundColor: theme.accent1,
          alignSelf: 'center',
          // marginHorizontal: wp(2),
        }}>
        <View
          style={{
            //   // width: 1,
            //   height: '60%',
            backgroundColor: theme.accent1,
            padding: hp(0.1),
            width:wp(5),
              alignSelf: 'center',
            //   marginHorizontal: wp(2),
          }}>
          <Text style={{color: 'white', fontSize: hp(2)}}>+</Text>
        </View>
      </TouchableOpacity> */}
      <View
        style={{
          width: 1,
          height: '60%',
          backgroundColor: theme.subheading,
          alignSelf: 'center',
          marginHorizontal: wp(2),
        }}
      />

      <TouchableOpacity
        style={[
          styles.tabButton,
          {
            // backgroundColor: 'red',
            width: wp(45),
            // borderColor: theme.card,
            // backgroundColor:
            //   activeTab === 'Chats' ? theme.accent1 : theme.card,
          },
        ]}
        onPress={() => handleTabPress('Clips')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'Clips'
              ? styles.activeTabText
              : styles.unactiveTabText,
            {fontFamily: theme.starArenaFont},
          ]}>
          Clips
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExploreTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    zIndex: 10,
    elevation: 10,
  },
  button: {
    width: '48%',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: hp(0.5),
    // gap: 10,
    borderTopWidth: 1,
    // borderBottomWidth: 2,
    // borderBottomColor: 'red', // Default; will be overridden with theme
  },
  tabButton: {
    // borderWidth: 1,
    // borderColor: 'white', // Default; will be overridden with theme
    // flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabText: {
    textAlign: 'center',
    fontSize: hp(1.7),
    fontFamily: 'starArenaFont', // Make sure this is properly linked
  },
  activeTabText: {
    color: '#fff', // or theme.heading if you want
    textShadowColor: 'rgba(255, 255, 255, 0.8)', // white glow color
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    fontWeight: '700',
  },
  unactiveTabText: {
    color: 'white',
  },
});
