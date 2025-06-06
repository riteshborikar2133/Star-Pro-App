import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/RootNavigator'; // update path to your navigator types
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

// type AccountScreenScreenProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'AccountScreen'
// >;

const AccountScreen = () => {
  const {theme} = useTheme();
  //   const navigation = useNavigation<AccountScreenScreenProp>();

  return (
    <>
      <OtherHeader title="Account" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        {/* Personal Info */}
        <View
          style={{
            borderColor: 'red',
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}>
          <Text style={{color: theme.subheading, fontSize: 15}}>
            Personal Info
          </Text>
          <View style={{paddingVertical: 10}}>
            <TouchableOpacity
            //  onPress={() => navigation.navigate('EmailSetting')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Email
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: 14,
                      fontFamily: theme.starArenaFont,
                    }}>
                    abc@gmail.com
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Methods */}
        <View
          style={{
            borderColor: 'red',
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}>
          <Text style={{color: theme.subheading, fontSize: 15}}>
            Login Methods
          </Text>
          <View style={{paddingVertical: 10}}>
            <TouchableOpacity
            //   onPress={() => navigation.navigate('GoogleLogin')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image
                    source={require('../../../assets/Icon/Settings/google.png')}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}>
                      Google
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 14,
                        fontFamily: theme.starArenaFont,
                      }}>
                      abc@gmail.com
                    </Text>
                  </View>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
            // onPress={() => navigation.navigate('PhoneLogin')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image
                    source={require('../../../assets/Icon/Settings/phone.png')}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}>
                      Phone Number
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 14,
                        fontFamily: theme.starArenaFont,
                      }}>
                      +91 8562468520
                    </Text>
                  </View>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other */}
        <View
          style={{
            borderColor: 'red',
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}>
          <Text style={{color: theme.subheading, fontSize: 15}}>Other</Text>
          <View style={{paddingVertical: 10}}>
            <TouchableOpacity
            //   onPress={() => navigation.navigate('LinkedDevices')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image
                    source={require('../../../assets/Icon/Settings/linked.png')}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}>
                      Linked Devices
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 10,
                        fontFamily: theme.starArenaFont,
                      }}>
                      See all the devices connected to this account
                    </Text>
                  </View>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
            //   onPress={() => navigation.navigate('DeleteAccount')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image
                    source={require('../../../assets/Icon/Settings/delete.png')}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}>
                      Delete Account
                    </Text>
                  </View>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
