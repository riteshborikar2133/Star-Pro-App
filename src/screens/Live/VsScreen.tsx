import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FollowingCard from './FollowingCard';

const VsScreen = () => {
  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, {paddingBottom: bottom + 60}]}>
        {/* <Text style={{color: 'white'}}>For You Screen Content</Text> */}
        <FollowingCard type={'Vs'} />
        <FollowingCard type={'Vs'} />
        <FollowingCard type={'Vs'} />
        <FollowingCard type={'Vs'} />
      </View>
    </ScrollView>
  );
};

export default VsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(1),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
});
