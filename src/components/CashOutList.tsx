import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from '../constant/ThemeContext';
import {useAuth} from '../context/AuthContext';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const CashOutList = () => {
  const {theme} = useTheme();
  const {user} = useAuth();

  const data = [
    {name: 'Tom', date: '12 May 2025', ammount: 2345},
    {name: 'Sarah', date: '08 Apr 2025', ammount: 1890},
    {name: 'Liam', date: '22 Mar 2025', ammount: 4520},
    {name: 'Emma', date: '15 May 2025', ammount: 3175},
    {name: 'Noah', date: '01 Feb 2025', ammount: 2870},
    {name: 'Olivia', date: '28 Jan 2025', ammount: 3999},
    {name: 'James', date: '10 Mar 2025', ammount: 2280},
    {name: 'Ava', date: '17 May 2025', ammount: 3540},
    {name: 'Lucas', date: '05 Apr 2025', ammount: 4785},
    {name: 'Mia', date: '30 Mar 2025', ammount: 2040},
    {name: 'Elijah', date: '11 May 2025', ammount: 5100},
    {name: 'Sophia', date: '09 Feb 2025', ammount: 3895},
    {name: 'William', date: '14 Apr 2025', ammount: 2650},
    {name: 'Isabella', date: '06 Mar 2025', ammount: 1980},
    {name: 'Benjamin', date: '19 Jan 2025', ammount: 2995},
    {name: 'Emily', date: '23 Apr 2025', ammount: 3350},
    {name: 'Henry', date: '27 Mar 2025', ammount: 4080},
    {name: 'Charlotte', date: '18 Feb 2025', ammount: 2220},
    {name: 'Jack', date: '04 May 2025', ammount: 2750},
    {name: 'Amelia', date: '02 Apr 2025', ammount: 3595},
    {name: 'Alexander', date: '13 Mar 2025', ammount: 4900},
    {name: 'Harper', date: '16 Jan 2025', ammount: 1770},
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          paddingVertical: hp(1),
          borderRadius: 20,
        },
      ]}>
      <ScrollView>
        <View>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: hp(2),
                paddingHorizontal: wp(3),
                borderBottomColor: theme.subheading,
                paddingBottom: hp(1),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: wp(3),
                }}>
                {/* profile pic */}
                <View
                  style={{
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      user?.profilepic
                        ? {uri: user?.profilepic}
                        : require('../../assets/person.png')
                    }
                    style={{
                      backgroundColor: theme.subheading,
                      height: hp(5),
                      width: hp(5),
                      borderRadius: 40,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: theme.accent1,
                      // position: 'absolute',
                      // right: 0,
                      // top: 0,
                      // bottom: 0,
                      height: hp(2),
                      width: hp(2),
                      borderRadius: 50,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                        fontSize: hp(1),
                      }}>
                      {user.level}
                    </Text>
                  </View>
                </View>

                {/* username */}
                <View>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.heading,
                      fontSize: hp(1.8),
                      marginBottom: hp(0.3),
                    }}>
                    {user?.username || user?.name || 'User'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.subheading,
                      fontSize: hp(1.5),
                      // marginBottom: hp(1),
                    }}>
                    ID - {user?.code} | India
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center',
                    gap: wp(1),
                    marginBottom: hp(0.3),
                  }}>
                  <Image
                    source={require('../../assets/Icon/profile/diamond.png')}
                    style={{height: hp(2), width: hp(2)}}
                  />
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.heading,
                      fontSize: hp(2),
                    }}>
                    {item.ammount}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.subheading,
                      fontSize: hp(1.5),
                      // marginBottom: hp(0.3),
                    }}>
                    {item.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CashOutList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    // paddingTop: hp(2),
  },
});
