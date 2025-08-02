import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
// import MomentScreen from '../../components/MomentScreen';
// import TabBar from '../../components/tabBar';
// import VlogScreen from '../../components/VlogScreen';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import MomentScreen from '../Profile/MomentScreen';
import ClipScreen from '../Profile/ClipScreen';
import TabBar from '../../components/TabBar';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RootStackParamList} from '../../navigation/RootNavigator';
import CustomTabBar from '../../components/CustomTabBar';
import ExploreTabBar from '../../components/ExploreTabBar';
import axios from 'axios';
import {useAuth} from '../../context/AuthContext';
// import {SafeAreaView} from 'react-native-safe-area-context';

import {Share} from 'react-native';

type ExploreUserRouteProp = RouteProp<RootStackParamList, 'ExploreUser'>;

const ExploreUser: React.FC = () => {
  const route = useRoute<ExploreUserRouteProp>();

  const {username, id} = route.params;
  const {user} = useAuth();
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState('Moments');
  const [postCount, setPostCount] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const fetchProfilePic = async ({code}) => {
    console.log('pic');
    if (!user?.code || !user?.jwt) return;

    try {
      console.log(
        `Fetching: https://shubhamkohad.site/auth/user/profilepic/${code}`,
      );

      const res = await axios.get(
        `https://shubhamkohad.site/auth/user/profilepic/${code}`,
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

  const fetchUserInfo = async (userId: string) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://shubhamkohad.site/auth/user/getByid`,
        {
          params: {id: userId},
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        },
      );
      setUserInfo(res.data);
      if (res?.data?.code) {
        fetchProfilePic({code: res.data.code});
      }
      console.log('Fetched user info:', res.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async (followerId: string, followingId: string) => {
    try {
      const res = await axios.get(
        `https://shubhamkohad.site/api/follow/isFollowing/${followerId}/${followingId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        },
      );
      setIsFollowing(res.data || false);
      console.log(res.data);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleFollow = async () => {
    if (!userInfo?.code || !user?.code) return;

    try {
      const url = `https://shubhamkohad.site/api/follow/${user.code}/${userInfo.code}`;

      if (isFollowing) {
        // If already following, unfollow
        const res = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        });

        if (res.status === 200) {
          setIsFollowing(false);
          fetchUserInfo(id); // Refresh user data
        }
      } else {
        // If not following, follow
        const res = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.jwt}`,
            },
          },
        );

        if (res.status === 200) {
          setIsFollowing(true);
          fetchUserInfo(id); // Refresh user data
        }
      }
    } catch (error) {
      console.error('Error in follow/unfollow:', error);
    }
  };

  const handleShareProfile = async () => {
    try {
      const link = `starenaarena://profile?id=${userInfo?.code}&username=${username}`;
      const message = `Hey! Check out this profile on Star Arena\n\n@${username} (ID: ${userInfo?.code})\n\nTap this link to view their profile in the app:\n${link}`;

      await Share.share({
        message,
        url: link, // iOS uses this in some share sheets
      });
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserInfo(id);
      checkFollowStatus(user?.id.toString(), id.toString());
    }
  }, [id]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: theme.background}]}>
        <View
          style={{
            borderWidth: 0,
            borderColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            gap: wp(4),
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>
              <Image
                source={require('../../../assets/Icon/back.png')}
                style={{height: hp(2), width: wp(2)}}
                // style={styles.logo}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={[
              styles.title,
              {color: theme.primary, fontFamily: theme.starArenaFontSemiBold},
            ]}>
            @{username}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <Image
            source={require('../../../assets/Menu-right.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
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
            <View>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 18,
                  fontFamily: theme.starArenaFontSemiBold,
                  textAlign: 'center',
                }}>
                {username}
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
                  Id - {userInfo?.code} |{' '}
                </Text>
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 15,
                  }}>
                  India
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

                <TouchableOpacity>
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
                onPress={handleFollow}
                style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                {/* <Image source={require('../../../assets/Icon/edit.png')} /> */}
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => navigation.navigate('UserChatInterface')}
                onPress={() =>
                  navigation.navigate('UserChatInterface', {
                    username: username,
                  })
                }
                style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                <Image source={require('../../../assets/Icon/chat.png')} />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  Chat
                </Text>
              </TouchableOpacity>

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
          <ExploreTabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            postCount={postCount}
          />

          {activeTab === 'Moments' && (
            <MomentScreen setPostCount={setPostCount} />
          )}
          {activeTab === 'Blogs' && <ClipScreen />}
        </ScrollView>
      </View>

      {/* Custom Tab Bar */}
      {/* <CustomTabBar /> */}
    </SafeAreaView>
  );
};

export default ExploreUser;

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
