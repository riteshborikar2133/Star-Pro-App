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
  const {user, token} = useAuth();
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
        'https://proxstream.online/auth/user/getByid',
        {
          params: {
            id: user?.id || 0,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('s', response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  };

  const fetchProfilePic = async () => {
    // console.log('pic');
    if (!user?.code || !user?.jwt) return;

    try {
      console.log(
        `Fetching: https://proxstream.online/auth/user/profilepic/${user.code}`,
      );

      const res = await axios.get(
        `https://proxstream.online/auth/user/profilepic/${user.code}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `accessToken=${token}`,
          },
        },
      );

      const imageUrl = res.data; // assuming the backend returns a plain URL string

      if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
        setProfilePic(imageUrl);
      }
      console.log(res.data);
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

  console.log(token);

  return (
    <>
      {/* source={require('../../../assets/Menu-right.png')} */}
      {/* @{user?.name || ''} */}
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            // borderBottomColor: theme.subheading,
          },
        ]}>
        <Text
          style={[
            styles.title,
            {color: theme.primary, fontFamily: 'Onest-SemiBold'},
          ]}>
          @ {user?.username || user?.name}
        </Text>

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

      {/* Profile Screen */}
      <View
        style={[
          styles.container,
          {backgroundColor: theme.background, paddingTop: hp(2)},
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
              {/* Profile Pic */}
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 3,
                  borderRadius: 60,
                  height: hp(9),
                  width: hp(9),
                  position: 'relative',
                  borderWidth: 0,
                  borderColor: 'red',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  // source={require('../../../assets/person.png')}
                  source={
                    profilePic
                      ? {uri: profilePic}
                      : require('../../../assets/person.png')
                  }
                  style={{
                    height: hp(8),
                    width: hp(8),
                    borderRadius: 60,

                    // position: 'relative',
                  }}
                />
                {/* <View
                  style={{
                    // height: hp(1),
                    // width: hp(5),
                    // borderRadius: 5,
                    position: 'absolute',
                    bottom: 0,
                    // right: 0,
                  }}> */}
                <Image
                  source={require('../../../assets/Icon/iconlabel.png')}
                  style={{
                    height: hp(7),
                    width: hp(9),
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    right: 0,
                    borderWidth: 0,
                    borderColor: 'black',
                  }}
                />
                {/* </View> */}
              </View>
              <View>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 18,
                    fontFamily: theme.starArenaFontSemiBold,
                    textAlign: 'left',
                  }}>
                  {user?.username || user?.name || 'User'}
                </Text>
                <View style={{borderWidth: 0, borderColor: 'red'}}>
                  {/* followers */}
                  <View
                    style={{
                      // width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      gap: wp(8),
                      paddingVertical: hp(1),
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        // width: wp(20),
                        borderWidth: 0,
                        borderColor: 'red',
                      }}>
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
                  {/* id */}
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
                      ID - {user?.code}
                    </Text>
                    <Text
                      style={{
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                        fontSize: 15,
                      }}>
                      Code - {user?.hosttoagnc}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* bio */}
          <Text
            style={{
              color: theme.heading,
              fontSize: hp(2.2),
              // textAlign: 'center',
              paddingVertical: hp(0.8),
              paddingHorizontal: wp(1),
            }}>
            {userInfo?.bio || ''}
          </Text>

          {/* coins , diamonds */}
          <View
            style={{
              marginBottom: hp(0.8),
              paddingHorizontal: wp(1),
              flexDirection: 'row',
              justifyContent: 'flex-start',
              // gap: wp(10),
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CrownPoint')}
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
                alignItems: 'center',
                gap: wp(1.5),
              }}>
              <Image
                source={require('../../../assets/Icon/profile/crown.png')}
                style={{height: hp(2.4), width: hp(2.4)}}
              />
              <Text style={{color: theme.heading, fontSize: hp(1.8)}}>
                {userInfo?.level}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RoyalPoint')}
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
                alignItems: 'center',
                gap: wp(1.5),
              }}>
              <Image
                source={require('../../../assets/Icon/profile/shield.png')}
                style={{height: hp(2.4), width: hp(2.4)}}
              />
              <Text style={{color: theme.heading, fontSize: hp(1.8)}}>
                {userInfo?.level}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('CashoutScreen')}
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/Icon/profile/diamond.png')}
                style={{height: hp(2.3), width: hp(2.3), marginRight: wp(1.3)}}
              />
              <Text style={{color: theme.heading, fontSize: hp(1.8)}}>
                {userInfo?.diamond}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RechargeScreen')}
              style={{
                flexDirection: 'row',
                width: wp(22),
                justifyContent: 'center',
                alignItems: 'center',
                gap: wp(1.3),
              }}>
              <Image
                source={require('../../../assets/Icon/profile/coin.png')}
                style={{height: hp(2.5), width: hp(2.5)}}
              />
              <Text style={{color: theme.heading, fontSize: hp(1.8)}}>
                {userInfo?.coins}
              </Text>
            </TouchableOpacity>
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
    height: hp(6.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    borderBottomWidth: 0.51,
    borderBottomColor: '#D6D6D680',
    // marginBottom:hp(2)
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
    flexDirection: 'row',
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
