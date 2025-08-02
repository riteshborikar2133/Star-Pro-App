import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import VlogScreen from '../../components/VlogScreen';
// import MomentScreen from '../../components/MomentScreen';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
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
import axios from 'axios';

const ProfileScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('Post');
  const [postCount, setPostCount] = useState(0);
  const {user} = useAuth();
  const [userInfo, setUserInfo] = useState<{
    bio?: string;
    diamond?: number;
    coins?: number;
    mefollowing?: number;
    myfollowers?: number;
    level?: number;
  }>();

  const [profilePic, setProfilePic] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        'https://shubhamkohad.site/auth/user/getByid',
        {
          params: {
            id: user?.id || 0,
          },
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        },
      );

      console.log('s', response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfilePic = async () => {
    console.log('pic');
    if (!user?.code || !user?.jwt) return;

    try {
      console.log(
        `Fetching: https://shubhamkohad.site/auth/user/profilepic/${user.code}`,
      );

      const res = await axios.get(
        `https://shubhamkohad.site/auth/user/profilepic/${user.code}`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            Cookie: `accessToken=${user.jwt}`,
          },
        },
      );

      console.log(res);
      const imageUrl = res.data; // assuming the backend returns a plain URL string

      if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
        setProfilePic(imageUrl);
      }
    } catch (error) {
      console.error('Error fetching profile pic:', error?.response || error);
    }
  };

  const handleShareProfile = async () => {
    try {
      const link = `starenaarena://profile?id=${userInfo?.code}&username=${user?.name}`;
      const message = `Hey! Check out this profile on Star Arena\n\n@${user?.name} (ID: ${userInfo?.code})\n\nTap this link to view their profile in the app:\n${link}`;

      await Share.share({
        message,
        url: link, // iOS uses this in some share sheets
      });
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
      fetchProfilePic();
    }, [user]),
  );

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
            // flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'center',
            gap: wp(5),
            // borderWidth: 1,
            // borderColor: 'red',
            position: 'absolute',
            right: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Image
              source={require('../../../assets/Menu-right.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* source={require('../../../assets/Menu-right.png')} */}
      {/* @{user?.name || ''} */}

      {/* Profile Screen */}
      <View
        style={[
          styles.container,
          {backgroundColor: theme.background, paddingTop: hp(1)},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}>
          {/* Profile Header */}
          <View style={[styles.profileHeader]}>
            <View
              style={{
                borderWidth: 0,
                borderColor: 'red',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: wp(5),
                // width:wp(100)
              }}>
              {/* <View
                style={{position: 'relative', top: hp(5), borderRadius: 50}}>
                <Text
                  style={{
                    color: '#035171',
                    position: 'absolute',
                    top: '41%',
                    left: '36%',
                    zIndex: 2,
                    fontFamily: theme.starArenaFontSemiBold,
                  }}>
                  54
                </Text>
                <Image
                  source={require('../../../assets/Icon/Crown.png')}
                  style={{height: hp(8), width: hp(8), borderRadius: 50}}
                />
              </View> */}
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 3,
                  borderRadius: 15,
                  height: 72,
                  width: 72,
                  // position: 'relative',
                }}>
                <Image
                  // source={require('../../../assets/person.png')}
                  source={
                    profilePic
                      ? {uri: profilePic}
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
              {/* <View
                style={{position: 'relative', top: hp(5), borderRadius: 50}}>
                <Text
                  style={{
                    color: '#FFAD00',
                    position: 'absolute',
                    top: '30%',
                    left: '42%',
                    zIndex: 2,
                  }}>
                  54
                </Text>
                <Image
                  source={require('../../../assets/Icon/Royal.png')}
                  style={{height: hp(10), width: hp(10), borderRadius: 50}}
                />
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
                {userInfo?.bio || ''}
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
                      // backgroundColor: theme.accent1,
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: theme.heading,
                      // padding:hp(0.5)
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        textAlign: 'center',
                        fontFamily: theme.starArenaFontSemiBold,
                      }}>
                      {userInfo?.level}
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
                    {userInfo?.diamond}
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
                        // backgroundColor: theme.accent1,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: theme.heading,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          textAlign: 'center',
                          fontFamily: theme.starArenaFontSemiBold,
                        }}>
                        {userInfo?.level}
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
                      {userInfo?.coins}
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
                      {userInfo?.mefollowing}
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
                      {userInfo?.myfollowers}
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
          <View style={[styles.editLayeroutHeader]}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfileScreen')}
                style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                <Image source={require('../../../assets/Icon/edit.png')} />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>

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

              <TouchableOpacity
                onPress={handleShareProfile}
                style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
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
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <TabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // theme={theme}
            postCount={postCount}
          />

          {activeTab === 'Post' && <MomentScreen setPostCount={setPostCount} />}
          {activeTab === 'Clips' && <ClipScreen />}
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
