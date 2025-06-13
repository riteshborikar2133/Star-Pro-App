// src/screens/Feed/FeedScreen.tsx

import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import PostScreen from '../../components/HomeScreen/PostScreen';
import CustomHeader from '../../components/CustomHeader';
import {useTheme} from '../../constant/ThemeContext';
import PostScreen from './PostScreen';
import LiveScreen from './LiveScreen';

type TabOption = 'Post' | 'Live' | 'Following';

const FeedScreen: React.FC = () => {
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState<TabOption>('Post');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={{flex: 1}}>
        <CustomHeader />
        <View style={[styles.container]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.tabScrollContainer,
              {backgroundColor: theme.background},
            ]}>
            {['Post', 'Live', 'Following'].map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as TabOption)}
                style={styles.tabTouchable}
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.tabButton,
                    {
                      borderColor: theme.accent1,
                      backgroundColor:
                        activeTab === tab ? theme.accent1 : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                      },
                    ]}>
                    {tab}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main content */}
        <View style={{flex: 1}}>
          {/* {activeTab === 'Post' && <PostScreen />} */}
          {activeTab == 'Post' && <PostScreen />}
          {activeTab === 'Live' && <LiveScreen />}
          {activeTab === 'Following' && (
            <View style={styles.placeholder}>
              <Text style={{color: theme.heading}}>
                Following content goes here.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  tabScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    // paddingVertical: hp(1),
  },
  tabTouchable: {
    marginRight: wp(2.5),
  },
  tabButton: {
    borderWidth: 1,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: 10,
  },
  tabText: {
    fontSize: hp(2),
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
