import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

const ManageAdminScreen = () => {
  const {theme} = useTheme();
  const admin = [
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
      <OtherHeader title="Manage Admin" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {admin.map(item => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: hp(1),
                }}>
                <View style={styles.row}>
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
                <Image
                  source={require('../../../assets/Icon/Settings/delete.png')}
                  style={{width: 24, height: 24}}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ManageAdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});
