// src/screens/CashOut.tsx
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CashOutList from '../../components/CashOutList';
import {useTheme} from '../../constant/ThemeContext';
import {useAuth} from '../../context/AuthContext';

const CashoutScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {user} = useAuth();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Current Month');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('john');

  const getLast12Months = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const now = new Date();
    const months = [];

    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      let label =
        i === 0
          ? 'Current Month'
          : i === 1
          ? 'Last Month'
          : `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      months.push({
        label,
        value: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
      });
    }

    return months;
  };

  const months = getLast12Months();

  return (
    <>
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
          Cashout
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
                  //   navigation.navigate('History');
                }}
                style={styles.modalButton}>
                <Text
                  style={[
                    styles.modalText,
                    {color: theme.heading, fontFamily: theme.starArenaFont},
                  ]}>
                  History
                </Text>
              </TouchableOpacity>
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

        {/* Withdraw Modal */}
        <Modal
          visible={isWithdrawModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setWithdrawModalVisible(false)}>
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPressOut={() => setWithdrawModalVisible(false)}>
            <View style={[styles.withdrawModal, {backgroundColor: theme.card}]}>
              <View style={styles.withdrawHeader}>
                <View style={styles.minWithdraw}>
                  <Text
                    style={[
                      styles.minText,
                      {
                        color: theme.subheading,
                        fontFamily: theme.starArenaFont,
                      },
                    ]}>
                    Min. ₹1000 Withdraw
                  </Text>
                </View>
                <View
                  style={[
                    styles.minWithdraw,
                    {
                      borderColor: theme.accent1,
                      backgroundColor: theme.accent1,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.minText,
                      {color: theme.heading, fontFamily: theme.starArenaFont},
                    ]}>
                    Confirm
                  </Text>
                </View>
              </View>

              <View style={styles.accountSection}>
                <Text
                  style={[
                    styles.accountLabel,
                    {color: theme.subheading, fontFamily: theme.starArenaFont},
                  ]}>
                  Select bank account
                </Text>
                <View style={styles.accountRow}>
                  <View style={styles.accountInfo}>
                    <Image
                      source={require('../../../assets/Icon/sbi-bank.png')}
                    />
                    <View>
                      <Text
                        style={[
                          styles.headingText,
                          {
                            color: theme.heading,
                            fontFamily: theme.starArenaFont,
                          },
                        ]}>
                        John Do
                      </Text>
                      <Text
                        style={[
                          styles.subheadingText,
                          {
                            color: theme.subheading,
                            fontFamily: theme.starArenaFont,
                          },
                        ]}>
                        a/c - xxxxxxx5442
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => setSelectedAccount('john')}
                    style={[
                      styles.radio,
                      {borderColor: selectedAccount ? '#007AFF' : '#ccc'},
                    ]}>
                    {selectedAccount && <View style={styles.radioInner} />}
                  </Pressable>
                </View>
                <TouchableOpacity
                  style={[styles.addAccount, {paddingHorizontal: wp(8)}]}>
                  <View style={styles.addAccountRow}>
                    <Text
                      style={[
                        styles.headingText,
                        {color: theme.heading, fontFamily: theme.starArenaFont},
                      ]}>
                      Add another account
                    </Text>
                    <Image
                      source={require('../../../assets/Icon/Settings/add.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.cancelButton, {paddingHorizontal: wp(8)}]}
                onPress={() => setWithdrawModalVisible(false)}>
                <Text
                  style={[
                    styles.cancelText,
                    {
                      color: theme.heading,
                      backgroundColor: theme.accent1,
                      fontFamily: theme.starArenaFont,
                    },
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Level */}
          <View
            style={{
              // height: hp(13),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: wp(2),
            }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('RoyalPoint')} // 👈 this line navigates
              style={{
                height: wp(12),
                width: wp(12),
                borderRadius: wp(6),
                borderWidth: 1,
                borderColor: theme.heading,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: theme.starArenaFontSemiBold,
                  color: theme.heading,
                  textAlign: 'center',
                  fontSize: hp(2.5),
                }}>
                {user?.level}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.cashoutCard, {borderColor: theme.subheading}]}>
            <Text
              style={[
                styles.cashoutTitle,
                {color: theme.heading, fontFamily: theme.starArenaFontSemiBold},
              ]}>
              Cash Out
            </Text>
            <View style={styles.needRow}>
              <Text
                style={[
                  styles.needText,
                  {color: theme.subheading, fontFamily: theme.starArenaFont},
                ]}>
                Need 227
              </Text>
              <Image
                source={require('../../../assets/Icon/diamond.png')}
                style={styles.diamondIcon}
              />
              <Text
                style={[
                  styles.needText,
                  {color: theme.subheading, fontFamily: theme.starArenaFont},
                ]}>
                more to get
              </Text>
            </View>
            <Text
              style={[
                styles.amountText,
                {color: theme.heading, fontFamily: theme.starArenaFontSemiBold},
              ]}>
              ₹1000
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, {backgroundColor: theme.accent1}]}
              />
            </View>
            <TouchableOpacity
              style={[styles.withdrawBtn, {backgroundColor: theme.accent1}]}
              onPress={() => setWithdrawModalVisible(true)}>
              <Text
                style={[
                  styles.withdrawText,
                  {color: theme.heading, fontFamily: theme.starArenaFont},
                ]}>
                Withdraw Money
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transaction History */}
          <View style={styles.historyContainer}>
            <Text
              style={[
                styles.sectionHeader,
                {color: theme.heading, fontFamily: theme.starArenaFont},
              ]}>
              Transaction History
            </Text>
            <Text
              style={[
                styles.subHeader,
                {color: theme.subheading, fontFamily: theme.starArenaFont},
              ]}>
              Recent Cashout
            </Text>
            <View
              style={[
                styles.transactionRow,
                {borderBottomColor: theme.subheading},
              ]}>
              <View>
                <Text
                  style={[
                    styles.transactionAmount,
                    {color: theme.heading, fontFamily: theme.starArenaFont},
                  ]}>
                  ₹12,300
                </Text>
                <Text
                  style={[
                    styles.transactionTime,
                    {color: theme.subheading, fontFamily: theme.starArenaFont},
                  ]}>
                  12 May, 11:44 am
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Text
                  style={[
                    styles.statusText,
                    {color: theme.subheading, fontFamily: theme.starArenaFont},
                  ]}>
                  Requested
                </Text>
              </View>
            </View>
          </View>

          {/* Month Selector */}
          <View style={styles.monthRow}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                style={[
                  styles.monthButton,
                  {
                    backgroundColor: theme.heading,
                    color: theme.background,
                    fontFamily: theme.starArenaFont,
                  },
                ]}>
                {selectedMonth}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                style={[
                  styles.monthButtonSmall,
                  {
                    borderColor: theme.heading,
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  },
                ]}>
                Month
              </Text>
            </TouchableOpacity>
          </View>

          {/* Month Modal */}
          <Modal transparent visible={isModalVisible} animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}
              activeOpacity={1}>
              <View
                style={[
                  styles.monthModalContent,
                  {backgroundColor: theme.card},
                ]}>
                <FlatList
                  data={months}
                  keyExtractor={item => item.value}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.monthItem}
                      onPress={() => {
                        setSelectedMonth(item.label);
                        setModalVisible(false);
                      }}>
                      <Text
                        style={[
                          styles.monthText,
                          {fontFamily: theme.starArenaFont},
                        ]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>

          <CashOutList />
        </ScrollView>
      </View>
    </>
  );
};

export default CashoutScreen;

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

  withdrawModal: {
    height: hp(35),
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  withdrawHeader: {flexDirection: 'row', justifyContent: 'space-evenly'},
  minWithdraw: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: wp(2),
    borderRadius: 20,
    paddingHorizontal: wp(5),
  },
  minText: {fontSize: hp(1.8)},
  accountSection: {paddingHorizontal: wp(8), marginVertical: hp(2.5)},
  accountLabel: {fontSize: hp(2)},
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(50),
    gap: wp(3),
  },
  headingText: {fontSize: hp(2.1)},
  subheadingText: {fontSize: hp(2)},
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  addAccount: {marginTop: hp(2)},
  addAccountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {marginTop: hp(2)},
  cancelText: {
    fontSize: hp(2),
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
    borderRadius: 18,
  },

  cashoutCard: {
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: hp(35),
  },
  cashoutTitle: {fontSize: hp(3), textAlign: 'center'},
  needRow: {flexDirection: 'row', alignItems: 'center', gap: wp(1)},
  needText: {fontSize: hp(1.7)},
  diamondIcon: {height: hp(2), width: wp(4)},
  amountText: {fontSize: hp(4.5)},
  progressBar: {
    height: hp(2.4),
    backgroundColor: '#484848',
    width: '75%',
    borderRadius: 20,
  },
  progressFill: {height: '100%', width: '10%', borderRadius: 20},
  withdrawBtn: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1),
    marginTop: hp(2),
    borderRadius: 20,
  },
  withdrawText: {fontSize: hp(2)},

  historyContainer: {paddingHorizontal: wp(1)},
  sectionHeader: {fontSize: hp(2.4), marginVertical: hp(2)},
  subHeader: {fontSize: hp(2)},
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(2),
    borderBottomWidth: 1,
    paddingBottom: hp(2),
  },
  transactionAmount: {fontSize: hp(2.2)},
  transactionTime: {fontSize: hp(2)},
  statusBadge: {
    backgroundColor: '#181818',
    paddingHorizontal: wp(3),
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {fontSize: hp(1.9)},

  monthRow: {flexDirection: 'row', justifyContent: 'space-around'},
  monthButton: {
    fontSize: hp(2),
    width: wp(60),
    borderRadius: 8,
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  monthButtonSmall: {
    fontSize: hp(2),
    width: wp(30),
    borderRadius: 8,
    textAlign: 'center',
    paddingVertical: hp(1),
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  monthModalContent: {
    marginHorizontal: 40,
    borderRadius: 8,
    paddingVertical: 20,
    maxHeight: hp(50),
  },
  monthItem: {paddingVertical: 10, paddingHorizontal: 20},
  monthText: {fontSize: hp(2), color: '#fff'},
});
