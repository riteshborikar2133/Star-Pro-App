import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
// import MomentScreen from '../../components/MomentScreen';
// import TabBar from '../../components/tabBar';
// import VlogScreen from '../../components/VlogScreen';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

const ExploreUser: React.FC = () => {
  const route = useRoute();
  const {username} = route.params as {username: string};

  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState('Moments');
  const [postCount, setPostCount] = useState(0);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      {/* <CustomHeader username={activeTab} /> */}
      <OtherHeader title={username} source="UserProfile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Follower */}
        <View style={[styles.profileHeader, {height: 100}]}>
          {/* Image */}
          <View
            style={{
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 15,
              position: 'relative',
            }}>
            <Image
              source={require('../../../assets/person.png')}
              style={{height: 65, width: 65}}
            />
            <View
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
            </View>
          </View>
          {/* text */}
          <View
            style={{
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              width: '65%',
            }}>
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
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
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
              <View style={{alignItems: 'center'}}>
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

        {/* Live status */}
        <View
          style={[
            styles.editLayeroutHeader,
            {
              justifyContent: 'space-between',
              width: '100%',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/Icon/diamond.png')}
              style={{
                height: 12,
                width: 12,
              }}
            />
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: 15,
              }}>
              2500
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: 15,
              }}>
              Id - 1003420
            </Text>
            <Image
              source={require('../../../assets/Icon/copy.png')}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </View>
        </View>

        {/* Bio */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <Text style={{color: theme.subheading, fontSize: 16}}>
              Creator | Digital Artist | Actor | Photoholic
            </Text>
          </View>
        </View>

        {/* Edit and Inbox button */}
        <View style={[styles.editLayeroutHeader]}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            {/* Follow */}
            <View style={[styles.button, {width: '30%', height: 35, gap: 8}]}>
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: 16,
                }}>
                Follow
              </Text>
            </View>

            {/* Chat */}
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
        </View>

        {/* Moment and Blogs Tabs */}
        {/* <TabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          postCount={postCount}
        /> */}
        {/* {activeTab == 'Moments' && <MomentScreen setPostCount={setPostCount} />} */}
        {/* {activeTab == 'Blogs' && <VlogScreen />} */}
      </ScrollView>
    </View>
  );
};

export default ExploreUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 20,
  },
  editLayeroutHeader: {
    paddingVertical: 7,
    paddingHorizontal: 10,
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
});
