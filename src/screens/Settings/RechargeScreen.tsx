// src/screens/Settings/RechargeScreen.tsx

import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

const RechargeScreen = () => {
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();

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
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ImageBackground
          source={require('../../../assets/Recharge.png')}
          style={styles.backgroundImage}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
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
            </View>

            <View
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
            </View>
          </View>

          <View
            style={{
              height: hp(75),
              justifyContent: 'center',
              gap: 20,
            }}>
            {[1, 2].map((row, index) => (
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
            ))}
          </View>
        </ImageBackground>
      </View>
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
