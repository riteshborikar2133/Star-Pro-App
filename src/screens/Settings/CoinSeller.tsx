import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '../../constant/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import axios from 'axios';

const CoinSeller = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {user, token} = useAuth();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);

  const fetchHistory = async () => {
    const res = await axios.get(
      `https:/proxstream.online/auth/user/sell-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res);
  };
  useEffect(() => {
    fetchHistory();
  }, []);
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
    <View style={{backgroundColor: theme.background, flex: 1}}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: theme.background}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}>
          <Image
            source={require('../../../assets/Icon/back.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.title,
            {color: theme.primary, fontFamily: theme.starArenaFontSemiBold},
          ]}>
          Coin Seller
        </Text>

        <TouchableOpacity onPressOut={() => setMenuVisible(true)}>
          <Image
            source={require('../../../assets/Icon/menu.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Menu Modal */}
        <Modal
          visible={isMenuVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setMenuVisible(false)}>
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPressOut={() => setMenuVisible(false)}>
            <View style={[styles.menuContent, {backgroundColor: theme.card}]}>
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  //   navigation.navigate('ReportIssue');
                }}
                style={styles.modalButton}>
                <Text
                  style={[
                    styles.modalText,
                    {color: theme.heading, fontFamily: theme.starArenaFont},
                  ]}>
                  Report Issue
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(5)}}>
        {/* Wallet */}
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.heading,
            marginHorizontal: wp(5),
            marginVertical: wp(5),
            paddingVertical: wp(4),
            borderRadius: 12,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: wp(2),
          }}>
          <Text
            style={{
              color: theme.heading,
              fontFamily: theme.starArenaFont,
              fontSize: hp(2),
            }}>
            Wallet
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: wp(1.5),
            }}>
            {/* <Image source={require('../../../assets/Icon/Settings/coin.png')} /> */}
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: hp(2.5),
              }}>
              🪙
            </Text>
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: hp(3),
              }}>
              {user?.coins}
            </Text>
          </View>
        </View>
        {/* Search User */}
        <View
          style={{
            marginHorizontal: wp(5),
            paddingVertical: wp(2),
          }}>
          <Text
            style={{
              color: theme.heading,
              fontFamily: theme.starArenaFont,
              fontSize: hp(1.5),
            }}>
            Search User
          </Text>
          <View
            style={{
              marginVertical: hp(1),
              borderWidth: 1,
              borderColor: theme.subheading,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <TextInput
              style={{
                width: wp(80),
                paddingHorizontal: wp(5),
              }}
              placeholder="Enter User id"
            />
            <Image
              source={require('../../../assets/Icon/Chat/sendArrow.png')}
              style={{width: wp(8)}}
            />
          </View>
        </View>

        {/* User info */}
        <View>
          {/* Profile pic and info */}
          <View
            style={{
              marginHorizontal: wp(5),
              padding: wp(5),
              marginVertical: hp(2),
              backgroundColor: theme.card,
              borderRadius: 12,
              flexDirection: 'row',
              // justifyContent: 'flex-start'
              alignItems: 'center',
              gap: wp(5),
            }}>
            <Image
              source={require('../../../assets/person.png')}
              style={{width: wp(20), height: wp(20)}}
            />
            <View style={{}}>
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFontSemiBold,
                  fontSize: hp(2),
                  marginBottom: hp(1),
                }}>
                Search User
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(1.5),
                }}>
                id 1212
              </Text>
            </View>
          </View>

          {/* Coin Transfer */}
          <View
            style={{
              marginHorizontal: wp(5),
              padding: wp(5),
              marginVertical: hp(1),
              backgroundColor: theme.card,
              borderRadius: 12,
            }}>
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: hp(2),
                marginBottom: hp(1),
              }}>
              Transfer Coin
            </Text>
            <View
              style={{
                marginVertical: hp(1),
                borderWidth: 1,
                borderColor: theme.subheading,
                borderRadius: 20,
              }}>
              <TextInput
                style={{
                  width: wp(80),
                  paddingHorizontal: wp(5),
                }}
                placeholder="Enter coin amount"
              />
            </View>
            <TouchableOpacity
              style={{
                width: wp(80),
                marginVertical: hp(1),
                borderRadius: 20,
                backgroundColor: theme.heading,
                padding: wp(3),
              }}>
              <Text
                style={{
                  color: theme.background,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(2),
                  // marginBottom: hp(1),
                  textAlign: 'center',
                }}>
                Transfer
              </Text>
            </TouchableOpacity>
          </View>

          {/* Recharge History */}
          <View
            style={{
              marginHorizontal: wp(5),
              paddingVertical: wp(2),
            }}>
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: hp(1.5),
              }}>
              Recharge History
            </Text>

            <View
              style={{
                backgroundColor: theme.card,
                marginVertical: hp(1),
                paddingVertical: hp(1),
                borderRadius: 12,
              }}>
              {/* Table Header */}
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: theme.subheading,
                    fontFamily: theme.starArenaFont,
                    fontSize: hp(1.8),
                    width: wp(40),
                    padding: wp(2),
                    paddingHorizontal: wp(4),
                  }}>
                  Coins
                </Text>
                <Text
                  style={{
                    color: theme.subheading,
                    fontFamily: theme.starArenaFont,
                    fontSize: hp(1.8),
                    width: wp(50),
                    padding: wp(2),
                    paddingHorizontal: wp(4),
                    textAlign: 'right',
                  }}>
                  Date & Time
                </Text>
              </View>

              {/* Data Rows */}
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
                              : require('../../../assets/person.png')
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
                          justifyContent: 'center',
                          gap: wp(1),
                          marginBottom: hp(0.3),
                        }}>
                        <Image
                          source={require('../../../assets/Icon/profile/coin.png')}
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
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CoinSeller;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 10},
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  backButton: {
    width: 40,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {width: 24, height: 24, resizeMode: 'contain', marginRight: wp(2)},
  title: {fontSize: 18, textAlign: 'center', flex: 1, marginRight: 20},
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContent: {
    paddingVertical: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalButton: {padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee'},
  modalText: {fontSize: 16, textAlign: 'center'},
});
