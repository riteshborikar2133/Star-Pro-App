import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

interface User {
  id: number;
  name: string;
}

const LiveNotificationScreen: React.FC = () => {
  const {theme} = useTheme();

  const [liveNotification, setLiveNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);

  const user: User[] = [
    {id: 1, name: 'Tom Clam'},
    {id: 2, name: 'Sara Knight'},
    {id: 3, name: 'Mike Jensen'},
    {id: 4, name: 'Lena Adams'},
    {id: 5, name: 'David York'},
    {id: 6, name: 'Nina Brooks'},
    {id: 7, name: 'Chris Moore'},
    {id: 8, name: 'Ashley Green'},
    {id: 9, name: 'Brian Smith'},
    {id: 10, name: 'Olivia Carter'},
    {id: 11, name: 'Ethan Scott'},
    {id: 12, name: 'Sophia Bennett'},
    {id: 13, name: 'Jack Turner'},
    {id: 14, name: 'Emma Collins'},
    {id: 15, name: 'Ryan Lee'},
    {id: 16, name: 'Chloe Morris'},
    {id: 17, name: 'Nathan Ross'},
    {id: 18, name: 'Grace Watson'},
    {id: 19, name: 'Lucas Rivera'},
    {id: 20, name: 'Ava James'},
  ];

  return (
    <>
      <OtherHeader title="Live Notification" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView>
          {/* Search */}
          <View
            style={{
              paddingVertical: hp(2),
              borderBottomWidth: 1,
              borderColor: theme.subheading,
            }}>
            <View
              style={{
                backgroundColor: theme.heading,
                height: hp(5.5),
                width: wp(90),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 25,
                paddingHorizontal: wp(4),
                gap: 5,
              }}>
              <Image
                source={require('../../../assets/Icon/Searchbutton.png')}
                style={{height: hp(2.5), width: wp(6)}}
              />
              <TextInput
                placeholder="@username / #userid"
                placeholderTextColor={theme.subheading}
                style={{color: theme.heading, flex: 1}}
              />
            </View>
          </View>

          {/* Live Notification Toggle */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp(4),
              borderBottomWidth: 1,
              borderColor: theme.subheading,
              paddingVertical: hp(2),
            }}>
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: theme.heading,
                fontSize: hp(2),
              }}>
              Get live notifications from all
            </Text>
            <Switch
              value={liveNotification}
              onValueChange={setLiveNotification}
              trackColor={{false: '#767577', true: theme.accent2}}
              thumbColor={liveNotification ? theme.accent1 : '#f4f3f4'}
            />
          </View>

          {/* User List */}
          <View style={{marginHorizontal: wp(4), marginVertical: hp(3)}}>
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: theme.heading,
                fontSize: hp(2),
              }}>
              Receive notifications from
            </Text>

            <View style={{marginVertical: hp(0.5)}}>
              {user.map(item => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: hp(1),
                  }}>
                  <View style={styles.userDetails}>
                    <View
                      style={{
                        height: hp(6),
                        width: wp(13),
                        backgroundColor: theme.subheading,
                        borderRadius: 10,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: theme.starArenaFont,
                          color: theme.heading,
                          fontSize: hp(2),
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: theme.starArenaFont,
                          color: theme.subheading,
                          fontSize: hp(1.8),
                        }}>
                        # {item.id}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notification}
                    onValueChange={setNotification}
                    trackColor={{false: '#767577', true: theme.accent2}}
                    thumbColor={notification ? theme.accent1 : '#f4f3f4'}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default LiveNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});
