import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../constant/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OtherHeader from '../../components/OtherHeader';
import {background} from '../../constant/colors';
import {useAuth} from '../../context/AuthContext';
const RoyalPoint = () => {
  const {theme} = useTheme();
  const {user} = useAuth();
  return (
    <>
      <OtherHeader title="Royal Point" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.subheading,
            borderRadius: 12,
            width: wp(90),
            // height: hp(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: wp(5),
            paddingVertical: hp(3),
          }}>
          {/* userinfo */}
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: wp(3)}}>
            {/* profile pic and level */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.subheading,
                  height: wp(15),
                  width: wp(15),
                  borderRadius: 50,
                }}></View>
              <View
                style={{
                  height: wp(6),
                  width: wp(6),
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
                    fontSize: hp(1.3),
                  }}>
                  13
                </Text>
              </View>
            </View>
            {/* Username and code */}
            <View>
              <Text
                style={{color: theme.heading, fontFamily: theme.starArenaFont}}>
                {user?.name}
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}>
                #{user?.code}
              </Text>
            </View>
          </View>
          {/* Royal Point Level */}
          <View
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
              13
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default RoyalPoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 20,
    paddingTop: hp(2),
    paddingHorizontal: 10,
  },
});
