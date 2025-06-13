import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeCard from '../../components/HomeCard';

const LiveScreen = () => {
  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, {paddingBottom: bottom + 60}]}>
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </View>
    </ScrollView>
  );
};

export default LiveScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
});
