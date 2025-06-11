import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator'; // Adjust path accordingly
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

// Define props type to get route params via React Navigation
type Props = NativeStackScreenProps<RootStackParamList, 'HostSettingScreen'>;

const HostSettingScreen: React.FC<Props> = ({route}) => {
  const {theme} = useTheme();

  // Get hostname param from route.params (React Navigation way)
  const hostTitle = route.params?.hostName ?? 'Host';

  const earningsData = [
    {id: '1', month: 'This Month', myEarnings: 2333, redeemed: 22333},
    {id: '2', month: 'Last Month', myEarnings: 120, redeemed: 123333},
    {id: '3', month: 'May', myEarnings: 22233, redeemed: 123333},
    {id: '4', month: 'March', myEarnings: 2233, redeemed: 123333},
    {id: '5', month: 'February', myEarnings: 2233, redeemed: 123333},
    {id: '6', month: 'January', myEarnings: 2233, redeemed: 123333},
    {id: '7', month: 'December', myEarnings: 2233, redeemed: 123333},
    {id: '8', month: 'November', myEarnings: 2233, redeemed: 123333},
    {id: '9', month: 'October', myEarnings: 2233, redeemed: 123333},
    {id: '10', month: 'September', myEarnings: 2233, redeemed: 123333},
    {id: '11', month: 'August', myEarnings: 2233, redeemed: 123333},
    {id: '12', month: 'July', myEarnings: 2233, redeemed: 123333},
  ];

  return (
    <View style={{flex: 1}}>
      <OtherHeader title={hostTitle} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={styles.header}>
            <View
              style={{
                height: hp(10),
                width: wp(22),
                borderWidth: 1,
                borderColor: theme.subheading,
                backgroundColor: theme.subheading,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: theme.starArenaFontSemiBold,
                    color: theme.heading,
                    fontSize: hp(2.5),
                  }}>
                  {hostTitle}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.starArenaFont,
                    color: theme.subheading,
                    fontSize: hp(2),
                  }}>
                  # 001122
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  color: theme.subheading,
                  fontSize: hp(2),
                }}>
                Joined May 23, 2024
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.accent1,
                borderRadius: 30,
                backgroundColor: theme.accent1,
              }}>
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  color: theme.heading,
                  fontSize: hp(1.6),
                  paddingHorizontal: wp(2),
                  paddingVertical: hp(0.5),
                }}>
                Remove
              </Text>
            </View>
          </View>

          <View style={{paddingTop: hp(2)}}>
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: theme.heading,
                fontSize: hp(2.5),
                paddingBottom: hp(2),
              }}>
              Host History
            </Text>

            <View style={{paddingHorizontal: wp(5.5)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    color: theme.subheading,
                    fontFamily: theme.starArenaFont,
                    fontSize: hp(2),
                    width: wp(30),
                  }}>
                  Month
                </Text>
                <Text
                  style={{
                    color: theme.subheading,
                    fontSize: hp(2),
                    width: wp(30),
                    fontFamily: theme.starArenaFont,
                    textAlign: 'center',
                  }}>
                  My Earning
                </Text>
                <Text
                  style={{
                    color: theme.subheading,
                    fontFamily: theme.starArenaFont,
                    fontSize: hp(2),
                    width: wp(30),
                    textAlign: 'center',
                  }}>
                  Redeemed
                </Text>
              </View>

              <View>
                {earningsData.map(item => (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      paddingVertical: hp(2),
                    }}>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: hp(2),
                        width: wp(30),
                        fontFamily: theme.starArenaFont,
                      }}>
                      {item.month}
                    </Text>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: hp(2),
                        width: wp(30),
                        textAlign: 'center',
                        fontFamily: theme.starArenaFont,
                      }}>
                      {item.myEarnings}
                    </Text>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: hp(2),
                        width: wp(30),
                        textAlign: 'center',
                        fontFamily: theme.starArenaFont,
                      }}>
                      {item.redeemed}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HostSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
  },
});
