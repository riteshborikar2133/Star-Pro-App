import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ForYouCard from './ForYouCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootNavigator';

type Navigation = NavigationProp<RootStackParamList, 'GoLiveInterface'>;

const ForYouScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, {paddingBottom: bottom + 60}]}>
        {/* <Text style={{color: 'white'}}>For You Screen Content</Text> */}
        <View style={[styles.container, {paddingBottom: bottom + 60}]}>
          <ForYouCard
            onPress={() =>
              navigation.navigate('ForYouLiveScreen', {username: 'user123'})
            }
          />
          <ForYouCard />
          <ForYouCard />
          <ForYouCard />
        </View>
      </View>
    </ScrollView>
  );
};

export default ForYouScreen;

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
