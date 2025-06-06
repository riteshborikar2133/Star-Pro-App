import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../constant/ThemeContext';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SettingScreen'
>;

const SettingsScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  return (
    <>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: theme.background}]}>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/Menu-left.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={[styles.title, {color: theme.primary}]}>Pro Star</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/Close.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        {/* Recharge */}
        <TouchableOpacity onPress={() => navigation.navigate('RechargeScreen')}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'red',
              // borderWidth: 1,
              paddingVertical: 12,
              paddingHorizontal: 12,
              justifyContent: 'space-between',
            }}>
            <Text style={{color: theme.heading, fontSize: 18}}>Recharge</Text>

            <View style={{flexDirection: 'row', gap: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: theme.card,
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  borderRadius: 12,
                  gap: 5,
                }}>
                <Image
                  source={require('../../../assets/Icon/Settings/coin.png')}
                  // source={require('../../../as')}
                />
                <Text style={{color: theme.heading}}>12k</Text>
              </View>
              <Image
                source={require('../../../assets/Icon/Settings/forward.png')}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderColor: 'red',
            // borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}>
          <Text style={{color: theme.subheading, fontSize: 15}}>Settings</Text>
          <View style={{paddingVertical: 10}}>
            {/* Account */}
            <TouchableOpacity
              onPress={() => navigation.navigate('AccountScreen')}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    // source={require('../.../../assets/Icon/Settings/profile.png')}
                    source={require('../../../assets/Icon/Settings/profile.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Account
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>

            {/* Notification */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NotificationScreen');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/notification.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Notification
                  </Text>
                </View>
                {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
              /> */}
              </View>
            </TouchableOpacity>

            {/* Privacy */}
            <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate('/Settings/Privacy');
            // }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/privacy.png')}
                    style={{height: 18, width: 18}}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Privacy
                  </Text>
                </View>
                {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
              /> */}
              </View>
            </TouchableOpacity>

            {/* Chat */}
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('/Settings/Chat');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/chat.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Chat
                  </Text>
                </View>
                {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
              /> */}
              </View>
            </TouchableOpacity>

            {/* General */}
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('/Settings/GeneralSetting');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/settings.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    General
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/Icon/Settings/forward.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderColor: 'red',
            // borderWidth: 1,
            paddingHorizontal: 12,
          }}>
          <Text style={{color: theme.subheading, fontSize: 15}}>
            Creator Tool
          </Text>
          <View style={{paddingVertical: 10}}>
            {/* Agency Portal */}
            <TouchableOpacity
            // onPress={() => navigation.navigate('/Settings/AgencyPortal')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/agency.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}>
                    Agency Portal
                  </Text>
                </View>
                {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
                /> */}
              </View>
            </TouchableOpacity>

            {/* CashOut */}
            <TouchableOpacity
            // onPress={() => navigation.navigate('/Settings/CashOut')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/cashout.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text style={{color: theme.heading, fontSize: 18}}>
                    Cashout
                  </Text>
                </View>
                {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
              /> */}
              </View>
            </TouchableOpacity>

            {/* Manage Admin */}
            <TouchableOpacity
            // onPress={() => navigation.navigate('/Settings/ManageAdmin')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/Icon/Settings/key.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text style={{color: theme.heading, fontSize: 18}}>
                    Manage Admins
                  </Text>
                </View>
                {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
              /> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderColor: 'red',
            // borderWidth: 1,
            paddingHorizontal: 12,
          }}>
          <Text style={{color: theme.subheading, fontSize: 15}}>Accounts</Text>
          <View style={{paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View
                style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/Icon/Settings/add.png')}
                  style={{height: 15, width: 15}}
                />
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 18,
                    fontFamily: theme.starArenaFont,
                  }}>
                  Add Account
                </Text>
              </View>
              {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
              /> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View
                style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/Icon/Settings/logout.png')}
                  style={{height: 15, width: 15}}
                />
                <Text style={{color: theme.heading, fontSize: 18}}>Logout</Text>
              </View>
              {/* <Image
                source={require("../../assets/Icon/Settings/forward.png")}
              /> */}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontFamily: 'starArenaFont',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  item: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'starArenaFont',
  },
});
