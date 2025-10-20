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
import ExploreUserPosts from './ExploreUserPosts';

type ExploreUserRouteProp = RouteProp<RootStackParamList, 'ExploreUser'>;

const ExploreUser: React.FC = () => {
  const route = useRoute<ExploreUserRouteProp>();

  const {username, id} = route.params;
  const {user, token} = useAuth();
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState('Moments');
  const [postCount, setPostCount] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  console.log(token);

  const fetchProfilePic = async ({code}) => {
    console.log('pic');
    if (!user?.code || !user?.jwt) return;

    try {
      console.log(
        `Fetching: https:/proxstream.online/auth/user/profilepic/${code}`,
      );

      const res = await axios.get(
        `https://proxstream.online/auth/user/profilepic/${code}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `accessToken=${token}`,
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
        `https:/proxstream.online/auth/user/getByid`,
        {
          params: {id: userId},
          headers: {
            Authorization: `Bearer ${token}`,
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
        `https:/proxstream.online/api/follow/isFollowing/${followerId}/${followingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    console.log(userInfo.code, user.code, token);
    try {
      const url = `https:/proxstream.online/api/follow/${user.code}/${userInfo.code}`;

      if (isFollowing) {
        // If already following, unfollow
        const res = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
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
      </View>

      <View style={[styles.container, {backgroundColor: theme.background}]}>
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
              }}>
              {/* Profile Pic */}
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 3,
                  borderRadius: 60,
                  height: hp(9),
                  width: hp(9),
                  position: 'relative',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    profilePic
                      ? {uri: profilePic}
                      : require('../../../assets/person.png')
                  }
                  style={{
                    height: hp(8),
                    width: hp(8),
                    borderRadius: 60,
                  }}
                />
                {/* Icon Label Overlay */}
                <Image
                  source={require('../../../assets/Icon/iconlabel.png')}
                  style={{
                    height: hp(7),
                    width: hp(9),
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    right: 0,
                  }}
                />
              </View>

              {/* User Info */}
              <View>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 18,
                    fontFamily: theme.starArenaFontSemiBold,
                    textAlign: 'left',
                  }}>
                  {userInfo?.username || userInfo?.name || 'User'}
                </Text>

                <View>
                  {/* Followers / Followings / Friends */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      gap: wp(8),
                      paddingVertical: hp(1),
                    }}>
                    <View style={{alignItems: 'center'}}>
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

                    <View style={{alignItems: 'center'}}>
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

                    <View style={{alignItems: 'center'}}>
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

                  {/* ID & Code */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      paddingVertical: hp(0.5),
                      gap: wp(5),
                    }}>
                    <Text
                      style={{
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                        fontSize: 15,
                      }}>
                      ID - {userInfo?.code}
                    </Text>
                    <Text
                      style={{
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                        fontSize: 15,
                      }}>
                      Code - {userInfo?.hosttoagnc}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Bio */}
          <Text
            style={{
              color: theme.heading,
              fontSize: hp(2.2),
              paddingVertical: hp(0.8),
              paddingHorizontal: wp(1),
            }}>
            {userInfo?.bio || ''}
          </Text>

          {/* Coins , Diamonds , Level */}
          <View
            style={{
              marginBottom: hp(0.8),
              paddingHorizontal: wp(1),
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assets/Icon/profile/crown.png')}
              />
              <Text style={{color: theme.heading, fontSize: hp(2.2)}}>
                {userInfo?.level}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assets/Icon/profile/shield.png')}
              />
              <Text style={{color: theme.heading, fontSize: hp(2.2)}}>
                {userInfo?.level}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/Icon/profile/diamond.png')}
                style={{height: hp(2.5), width: hp(2.5)}}
              />
              <Text style={{color: theme.heading, fontSize: hp(2.2)}}>
                {userInfo?.diamond}
              </Text>
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/Icon/profile/coin.png')}
                style={{height: hp(2.5), width: hp(2.5)}}
              />
              <Text style={{color: theme.heading, fontSize: hp(2.2)}}>
                {userInfo?.coins}
              </Text>
            </View> */}
          </View>

          {/* Edit, Inbox, Share Buttons */}
          {/* Edit, Inbox, Share Buttons */}
          <View style={[styles.editLayeroutHeader]}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              {/* Follow Button */}
              <TouchableOpacity
                onPress={handleFollow}
                style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>

              {/* Inbox */}
              <View style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
                <Image source={require('../../../assets/Icon/chat.png')} />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: 16,
                  }}>
                  Chat
                </Text>
              </View>

              {/* Share */}
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
            <ExploreUserPosts setPostCount={setPostCount} userInfo={userInfo} />
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
    height: hp(6.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    borderBottomWidth: 0.51,
    borderBottomColor: '#D6D6D680',
    marginBottom: hp(2),
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
