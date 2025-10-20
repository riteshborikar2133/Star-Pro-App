import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import NotificationTabScreen from './NotificationTabScreen';
import ChatScreeen from './ChatScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const NotificationScreen = () => {
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState<'Notification' | 'Chats'>(
    'Notification',
  );

  return (
    <>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            // borderBottomColor: theme.subheading,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <Text
          style={[
            styles.title,
            {color: theme.primary, fontFamily: 'Onest-SemiBold'},
          ]}>
          {activeTab}
        </Text>
        {activeTab == 'Notification' && (
          <Image
            source={require('../../../assets/Icon/bannericon.png')}
            style={{height: hp(3.5), width: hp(4)}}
          />
        )}
      </View>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        {/* <OtherHeader title={activeTab} /> */}

        {/* Tabs */}
        <View style={styles.tabHeader}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              {
                width: wp(45),
                // borderColor: theme.card,
                // backgroundColor:
                //   activeTab === 'Notification' ? theme.accent1 : theme.card,
              },
            ]}
            onPress={() => setActiveTab('Notification')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Notification'
                  ? styles.activeTabText
                  : styles.unactiveTabText,
                {fontFamily: theme.starArenaFont},
              ]}>
              {' '}
              Notification
            </Text>
          </TouchableOpacity>
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
                width: wp(45),

                // borderColor: theme.card,
                // backgroundColor:
                //   activeTab === 'Chats' ? theme.accent1 : theme.card,
              },
            ]}
            onPress={() => setActiveTab('Chats')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Chats'
                  ? styles.activeTabText
                  : styles.unactiveTabText,
                {fontFamily: theme.starArenaFont},
              ]}>
              Chats
            </Text>
          </TouchableOpacity>
        </View>

        {/* Screens */}
        {activeTab === 'Notification' && <NotificationTabScreen />}
        {activeTab === 'Chats' && <ChatScreeen />}
      </View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: hp(0.5),
    // gap: 10,
    // borderWidth: 1,
    // borderColor: 'white', // Default; will be overridden with theme
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

  header: {
    height: hp(6.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    borderBottomWidth: 0.51,
    borderBottomColor: '#D6D6D680',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',

    fontFamily: 'Onest SemiBold',
  },
});
