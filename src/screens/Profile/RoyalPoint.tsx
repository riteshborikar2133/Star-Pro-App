import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../constant/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import OtherHeader from '../../components/OtherHeader';
import {background} from '../../constant/colors';
import {useAuth} from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
const RoyalPoint = () => {
  const {theme} = useTheme();
  const {user} = useAuth();
  const levels = Array.from({length: 50}, (_, i) => ({
    level: i + 1,
    points: (i + 1) * 1000, // Example: Level 1 = 1000, Level 2 = 2000, etc.
    icon: require('../../../assets/Icon/profile/Royal.png'),
  }));
  return (
    <>
      <OtherHeader title="Royal Point" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={{marginHorizontal: wp(2)}}>
          <ImageBackground
            source={require('../../../assets/Icon/profile/royalpointbg.png')}
            resizeMode="cover" // or "contain", "stretch"
            style={{
              width: '100%',
              height: hp(15), // set a height, otherwise nothing will show
              justifyContent: 'center',
              alignItems: 'center',
            }}
            imageStyle={{borderRadius: 10}} // optional, styles for the background image itself
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: wp(5),
              }}>
              <Image
                source={require('../../../assets/Icon/profile/royalicon.png')}
                style={{height: hp(12), width: hp(12)}}
              />
              <Text
                style={{
                  fontFamily: theme.starArenaFontSemiBold,
                  color: '#FFAD00',
                  fontSize: hp(2),
                  // marginBottom: hp(1),
                }}>
                Royal Points
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.heading,
                  padding: hp(1),
                  borderRadius: 100,
                  marginLeft: wp(4),
                }}>
                <Text
                  style={{
                    fontFamily: theme.starArenaFontSemiBold,
                    color: theme.heading,
                    fontSize: hp(2),
                    // marginBottom: hp(1),
                  }}>
                  25
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'red',
            paddingHorizontal: wp(2),
            marginTop: hp(2),
          }}>
          <Text
            style={{
              fontFamily: theme.starArenaFontSemiBold,
              color: theme.heading,
              fontSize: hp(1.5),
              textAlign: 'center',
              // marginBottom: hp(1),
            }}>
            Grab Royal Points by sending gifts to increase level.
          </Text>
        </View>
        <View
          style={{marginTop: hp(2), paddingHorizontal: wp(2), height: hp(70)}}>
          <ScrollView
            showsVerticalScrollIndicator={false} // hide scrollbar
            contentContainerStyle={styles.gridContainer}>
            {levels.map(item => (
              <View key={item.level} style={styles.card}>
                <Text
                  style={[
                    styles.levelText,
                    {fontFamily: theme.starArenaFontSemiBold},
                  ]}>
                  Level {item.level}
                </Text>
                <Image
                  source={item.icon}
                  style={{height: hp(8), width: hp(8)}}
                />
                <Text
                  style={[
                    styles.pointsText,
                    {fontFamily: theme.starArenaFontSemiBold},
                  ]}>
                  {item.points}
                </Text>
              </View>
            ))}
          </ScrollView>
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    paddingBottom: hp(2),
    gap: wp(0.6),
  },
  card: {
    backgroundColor: '#181818',
    padding: hp(1.4),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(22), // ~4 per row (22% * 4 = 88% + margins)
    marginBottom: hp(2),
  },
  levelText: {
    color: '#FFAD00',
    fontSize: hp(1.6),
    marginBottom: hp(0.5),
  },
  pointsText: {
    color: '#FFAD00',
    fontSize: hp(1.6),
    marginTop: hp(0.5),
  },
});
