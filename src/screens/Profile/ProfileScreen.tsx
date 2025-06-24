import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import VlogScreen from '../../components/VlogScreen';
// import MomentScreen from '../../components/MomentScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';
import TabBar from '../../components/TabBar';
import MomentScreen from './MomentScreen';
import {RootStackParamList} from '../../navigation/RootNavigator';
import ClipScreen from './ClipScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../context/AuthContext';

const ProfileScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('Moments');
  const [postCount, setPostCount] = useState(0);
  const {user} = useAuth();

  console.log(user);

  return (
    <>
      {/* Header */}
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
            @{user?.name || ''}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: wp(5),
          }}>
          <TouchableOpacity
          // onPress={() => navigation.navigate('SettingScreen')}
          >
            <Image
              source={require('../../../assets/rank.png')}
              style={styles.logo}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Image
              source={require('../../../assets/Menu-right.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}>
          {/* Profile Header */}
          <View style={[styles.profileHeader]}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 15,
                position: 'relative',
              }}>
              <Image
                // source={require('../../../assets/person.png')}
                source={
                  user?.photo
                    ? {uri: user.photo}
                    : require('../../../assets/person.png')
                }
                style={{height: 65, width: 65, borderRadius: 10}}
              />
              {/* <View
                style={{
                  height: 18,
                  width: 18,
                  backgroundColor: theme.accent1,
                  borderRadius: 5,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    textAlign: 'center',
                    fontFamily: theme.starArenaFontSemiBold,
                  }}>
                  15
                </Text>
              </View> */}
            </View>
            <View>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 18,
                  fontFamily: theme.starArenaFontSemiBold,
                  textAlign: 'center',
                }}>
                {user?.name || 'User'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: hp(0.5),
                }}>
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 15,
                  }}>
                  Id - {user?.code}
                </Text>
              </View>
              <Text
                style={{
                  color: theme.subheading,
                  fontSize: hp(2.2),
                  textAlign: 'center',
                  paddingVertical: hp(0.5),
                }}>
                Creator | Digital Artist | Actor | Photoholic
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingVertical: hp(1),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      backgroundColor: theme.accent1,
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        textAlign: 'center',
                        fontFamily: theme.starArenaFontSemiBold,
                      }}>
                      15
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/Icon/diamond.png')}
                    style={{
                      height: 14,
                      width: 13,
                    }}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                      fontSize: 18,
                    }}>
                    {user?.diamond}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('RechargeScreen')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 18,
                        width: 18,
                        backgroundColor: theme.accent1,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          textAlign: 'center',
                          fontFamily: theme.starArenaFontSemiBold,
                        }}>
                        15
                      </Text>
                    </View>
                    <Image
                      source={require('../../../assets/Icon/Settings/coin.png')}
                      style={{
                        height: 15,
                        width: 15,
                      }}
                    />
                    <Text
                      style={{
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                        fontSize: 18,
                      }}>
                      {user?.coins}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    gap: wp(5),
                    paddingVertical: hp(1),
                  }}>
                  <View style={{alignItems: 'center', width: wp(28)}}>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 15,
                        fontFamily: theme.starArenaFont,
                      }}>
                      12k
                    </Text>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 13,
                        fontFamily: theme.starArenaFont,
                      }}>
                      Friends
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', width: wp(28)}}>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 15,
                        fontFamily: theme.starArenaFont,
                      }}>
                      1k
                    </Text>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 13,
                        fontFamily: theme.starArenaFont,
                      }}>
                      Followings
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', width: wp(28)}}>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 15,
                        fontFamily: theme.starArenaFont,
                      }}>
                      12.3L
                    </Text>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 13,
                        fontFamily: theme.starArenaFont,
                      }}>
                      Followers
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Edit, Inbox, Share Buttons */}
          {/* <View style={[styles.editLayeroutHeader]}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              <View style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                <Image source={require('../../../assets/Icon/edit.png')} />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  Edit
                </Text>
              </View>

              <View style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                <Image source={require('../../../assets/Icon/chat.png')} />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  Inbox
                </Text>
              </View>

              <View style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                <Image
                  source={require('../../../assets/Icon/share.png')}
                  style={{height: 15, width: 15}}
                />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  Share
                </Text>
              </View>
            </View>
          </View> */}

          {/* Tabs */}
          <TabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            theme={theme}
            postCount={postCount}
          />

          {activeTab === 'Moments' && (
            <MomentScreen setPostCount={setPostCount} />
          )}
          {activeTab === 'Blogs' && <ClipScreen />}
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // borderWidth: 1,
    // borderColor: 'red',
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
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  profileHeader: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    alignItems: 'center',
    gap: 20,
  },
  editLayeroutHeader: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  momentandBlog: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
  },
});
