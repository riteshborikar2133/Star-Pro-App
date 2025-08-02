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
import React, {useState} from 'react';
import {useTheme} from '../../constant/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';

const CoinSeller = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {user} = useAuth();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);

  const transactionData = [
    {id: 1, coins: 120, dateTime: '2025-07-20 14:30'},
    {id: 2, coins: 250, dateTime: '2025-07-19 10:15'},
    {id: 3, coins: 75, dateTime: '2025-07-18 18:45'},
    {id: 4, coins: 250, dateTime: '2025-07-19 10:15'},
    {id: 5, coins: 75, dateTime: '2025-07-18 18:45'},
    {id: 6, coins: 75, dateTime: '2025-07-18 18:45'},
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
              {transactionData.map(item => (
                <View
                  key={item.id}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: wp(40),
                      padding: wp(2),
                      paddingHorizontal: wp(4),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/Icon/Settings/coin.png')}
                      style={{width: 16, height: 16, marginRight: 8}}
                      resizeMode="contain"
                    />

                    <Text
                      style={{
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                        fontSize: hp(1.7),
                      }}>
                      {item.coins}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: wp(50),
                      padding: wp(2),
                      paddingHorizontal: wp(4),
                      textAlign: 'right',
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                      fontSize: hp(1.7),
                    }}>
                    {item.dateTime}
                  </Text>
                </View>
              ))}
            </View>
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
