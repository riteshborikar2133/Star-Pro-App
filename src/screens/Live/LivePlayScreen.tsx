import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import {ScrollView} from 'react-native';
import ForYouScreen from './ForYouScreen';
import FollowingScreen from './FollowingScreen';
import VsScreen from './VsScreen';
import AudioScreen from './AudioScreen';

type TabOption = 'For you' | 'Following' | 'Vs' | 'Audio' | 'New';

const LivePlayScreen: React.FC = () => {
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState<TabOption>('For you');
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      {/* <OtherHeader title="Live" /> */}
      <View style={[styles.header, {backgroundColor: theme.background}]}>
        {/* <TouchableOpacity> */}
        {/* <View
              style={{
                flexDirection: 'row',
                backgroundColor: theme.card,
                alignItems: 'center',
                paddingHorizontal: 8,
                borderRadius: 12,
                gap: 5,
              }}>
              <Image source={require('../../../assets/Icon/Settings/coin.png')} />
              <Text style={{color: theme.heading}}>12k</Text>
            </View> */}
        {/* </TouchableOpacity> */}

        <View style={{borderWidth: 0, borderColor: 'red'}}>
          <Text
            style={[
              styles.title,
              {color: theme.primary, fontFamily: theme.starArenaFontSemiBold},
            ]}>
            Live
          </Text>
        </View>
        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'center',
            gap: wp(5),
            // borderWidth: 1,
            // borderColor: 'red',
            position: 'absolute',
            right: 6,
          }}>
          <TouchableOpacity
          // onPress={() => navigation.navigate('SettingScreen')}
          >
            <Image
              source={require('../../../assets/rank.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.tabScrollContainer,
            {
              backgroundColor: 'transparent',
              // borderBottomWidth: 0,
              // borderBottomColor: theme.subheading,
            },
          ]}>
          {['For you', 'Following', 'Vs', 'Audio', 'New'].map((tab, index) => (
            <React.Fragment key={tab}>
              <TouchableOpacity
                onPress={() => setActiveTab(tab as TabOption)}
                style={styles.tabTouchable}
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.tabButton,
                    // activeTab === tab && styles.activeTabButton, // add active style here
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      {fontFamily: theme.starArenaFont},
                      activeTab === tab
                        ? [
                            styles.activeTabText,
                            {fontFamily: theme.starArenaFontSemiBold},
                          ]
                        : styles.unactiveTabText,
                    ]}>
                    {tab}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Add separator after first tab only */}
              {index !== 4 && (
                <View
                  style={{
                    width: 1,
                    height: '60%',
                    backgroundColor: theme.subheading,
                    alignSelf: 'center',
                    marginHorizontal: wp(2),
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </ScrollView>
        <View style={{height: hp(78), borderWidth: 0, borderColor: 'red'}}>
          {activeTab === 'For you' && <ForYouScreen />}
          {activeTab === 'Following' && <FollowingScreen />}
          {activeTab === 'Vs' && <VsScreen />}
          {activeTab === 'Audio' && <AudioScreen />}
          {activeTab === 'New' && <FollowingScreen />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LivePlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(1),
  },
  tabScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    // paddingVertical: hp(1),
    width: '100%',
  },
  tabTouchable: {
    // width: '48%',
    // marginRight: wp(2.5),
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.49)', // slight white transparent bg
    // shadowColor: 'rgba(255, 255, 255, 0.7)', // white glow color
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10, // for Android shadow (approximate)
  },
  tabButton: {
    // borderWidth: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 10,
  },
  tabText: {
    fontSize: hp(1.7),
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabText: {
    color: '#fff', // or theme.heading if you want
    textShadowColor: 'rgba(255, 255, 255, 0.8)', // white glow color
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    // fontWeight: '700',
  },
  unactiveTabText: {
    color: 'white',
  },

  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
});
