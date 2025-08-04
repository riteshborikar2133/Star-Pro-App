// src/screens/Settings/RechargeScreen.tsx

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

interface RechargePlan {
  coins: number;
  price: number;
  originalPrice?: number;
  planprice?: number;
}

const RechargeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();
  const {user} = useAuth();
  const [plans, getPlans] = useState<RechargePlan[]>([]);
  const getRechargePlan = async () => {
    try {
      const res = await axios.get(
        'https://shubhamkohad.site/auth/user/getAllPlans',
        {
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
        },
      );
      console.log(res.data);
      if (res?.data) {
        getPlans(res.data); // update the plans state
      }
    } catch (error) {
      console.error('Error fetching recharge plans:', error || error);
    }
  };

  useEffect(() => {
    getRechargePlan();
  }, []);

  const renderCard = () => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.background,
          borderColor: theme.subheading,
        },
      ]}>
      <View style={styles.cardL1}>
        <Image
          source={require('../../../assets/Icon/Settings/coin.png')}
          style={{width: wp(6)}}
        />
        <Text
          style={{
            fontSize: wp(5),
            color: theme.heading,
            fontFamily: theme.starArenaFont,
          }}>
          250
        </Text>
      </View>
      <Image
        source={require('../../../assets/Icon/Settings/mediumCoin.png')}
        style={{
          width: '100%',
          height: '40%',
        }}
      />
      <Text
        style={{
          fontSize: wp(5),
          color: theme.heading,
          fontFamily: theme.starArenaFont,
        }}>
        ₹1200.99
      </Text>
      <Text
        style={{
          fontSize: wp(4),
          color: theme.subheading,
          textDecorationLine: 'line-through',
          fontFamily: theme.starArenaFont,
        }}>
        ₹1200.99
      </Text>
    </View>
  );

  return (
    <>
      <OtherHeader title="Recharge" />
      <ScrollView
        style={[styles.container, {backgroundColor: theme.background}]}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          // source={require('../../../assets/Recharge.png')}
          style={styles.backgroundImage}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* <View
              style={{
                borderColor: theme.subheading,
                borderWidth: 1,
                flexDirection: 'row',
                paddingHorizontal: wp(1.5),
                paddingVertical: hp(0.3),
                alignItems: 'center',
                borderRadius: 12,
                gap: 5,
              }}>
              <Image source={require('../../../assets/Icon/Settings/coin.png')} />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: wp(4),
                }}>
                12k
              </Text>
            </View> */}

            {/* <View
              style={{
                borderColor: theme.subheading,
                borderWidth: 1,
                flexDirection: 'row',
                paddingHorizontal: wp(2),
                paddingVertical: hp(0.3),
                alignItems: 'center',
                borderRadius: 12,
                gap: 5,
              }}>
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: wp(4),
                }}>
                Cur
              </Text>
              <Image source={require('../../../assets/Icon/Settings/down.png')} />
            </View> */}
          </View>

          <View
            style={{
              // height: hp(68),
              // borderWidth: 1,
              // borderColor: 'red',
              justifyContent: 'center',
              gap: 20,
              borderBottomWidth: 1,
              borderBottomColor: theme.subheading,
              paddingVertical: hp(3),
            }}>
            {/* Level */}
            <View
              style={{
                // height: hp(13),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: wp(2),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RoyalPoint')} // 👈 this line navigates
                style={{
                  height: wp(12),
                  width: wp(12),
                  borderRadius: wp(6),
                  borderWidth: 1,
                  borderColor: theme.heading,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: theme.starArenaFontSemiBold,
                    color: theme.heading,
                    textAlign: 'center',
                    fontSize: hp(2.5),
                  }}>
                  {user?.level}
                </Text>
              </TouchableOpacity>
            </View>

            {/* total coins */}
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.heading,
                borderRadius: 12,
                height: hp(13),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: wp(2),
              }}>
              <Image
                source={require('../../../assets/Icon/Settings/coin.png')}
                style={{
                  width: '10%',
                  height: '30%',
                  // borderWidth: 1,
                  // borderColor: 'red',
                }}
              />
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  color: theme.heading,
                  textAlign: 'center',
                  fontSize: hp(3),
                  // position: 'relative',
                  // right: wp(8),
                }}>
                {user?.coins}
              </Text>
            </View>
            {/* {[1].map((row, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                {renderCard()}
                {renderCard()}
                {renderCard()}
              </View>
            ))} */}
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: wp(2),
              }}>
              {plans.map((plan, index) => (
                <View
                  key={index}
                  style={[
                    styles.card,
                    {
                      backgroundColor: theme.background,
                      borderColor: theme.subheading,
                    },
                  ]}>
                  <View style={styles.cardL1}>
                    <Image
                      source={require('../../../assets/Icon/Settings/coin.png')}
                      style={{width: wp(6)}}
                    />
                    <Text
                      style={{
                        fontSize: wp(5),
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                      }}>
                      {plan.coins}
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/Icon/Settings/mediumCoin.png')}
                    style={{
                      width: '100%',
                      height: '40%',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: wp(5),
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                    }}>
                    ₹{plan.planprice}
                  </Text>
                  {plan.originalPrice && (
                    <Text
                      style={{
                        fontSize: wp(4),
                        color: theme.subheading,
                        textDecorationLine: 'line-through',
                        fontFamily: theme.starArenaFont,
                      }}>
                      ₹{plan.originalPrice}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
          {/* <View style={{backgroundColor: theme.subheading, height: hp(0.1)}} /> */}
          <View style={{marginTop: hp(2)}}>
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: theme.heading,
                marginBottom: hp(1),
                fontSize: hp(1.5),
              }}>
              Recharge History
            </Text>
            {/* Table Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(4),
                paddingVertical: hp(1),
                borderBottomWidth: 1,
                borderColor: theme.subheading,
                backgroundColor: theme.background,
              }}>
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  fontSize: wp(4),
                  color: theme.heading,
                  width: '50%',
                }}>
                Coins
              </Text>
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  fontSize: wp(4),
                  color: theme.heading,
                  width: '50%',
                }}>
                Date & Time
              </Text>
            </View>

            {/* Table Rows */}
            {[
              {coins: 250, datetime: '2025-07-21 12:30 PM'},
              {coins: 100, datetime: '2025-07-19 4:45 PM'},
              {coins: 100, datetime: '2025-07-19 4:45 PM'},
              {coins: 100, datetime: '2025-07-19 4:45 PM'},
              {coins: 500, datetime: '2025-07-15 9:10 AM'},
              {coins: 500, datetime: '2025-07-15 9:10 AM'},
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(4),
                  paddingVertical: hp(1),
                  // borderBottomWidth: 0.5,
                  // borderColor: theme.subheading,
                }}>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    gap: wp(2),
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/coin.png')}
                  />
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      fontSize: wp(4),
                      color: theme.subheading,
                    }}>
                    {item.coins}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: theme.starArenaFont,
                    fontSize: wp(3.8),
                    color: theme.subheading,
                    width: '50%',
                  }}>
                  {item.datetime}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RechargeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    paddingHorizontal: hp(1.8),
    paddingVertical: wp(1.5),
  },
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    height: hp(22),
    width: wp(31),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardL1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
