import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import LevelCard from '../../components/LevelCard';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {MyHostContent, MyHostHeader} from '../../components/myHostList';

type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const AgencyPortalScreen: React.FC = () => {
  const {theme} = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <>
      <OtherHeader title="Agency Portal" />
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <ScrollView stickyHeaderIndices={[5]}>
          {/* Level Card */}
          <View style={styles.levelCardWrapper}>
            <LevelCard />
          </View>

          {/* Goals */}
          <View>
            <Text
              style={[
                styles.sectionTitle,
                {color: theme.heading, fontFamily: theme.starArenaFontSemiBold},
              ]}>
              1/2 Goals Remaining
            </Text>
            <View style={styles.goalSection}>
              <Text
                style={{color: theme.heading, fontFamily: theme.starArenaFont}}>
                $1180 / $10000
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {backgroundColor: theme.accent1, width: '11.8%'},
                    ]}
                  />
                </View>
                <CheckBox
                  value={isChecked}
                  onValueChange={setIsChecked}
                  tintColors={{true: theme.accent1, false: '#d3d3d3'}}
                />
              </View>
            </View>
          </View>

          {/* Earning Cards */}
          <View style={styles.earningCards}>
            {['Last Month Earnings', 'Current Month Earnings'].map(
              (title, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.earningCard,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.subheading,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.earningTitle,
                      {
                        color: theme.heading,
                        fontFamily: theme.starArenaFontSemiBold,
                      },
                    ]}>
                    {title}
                  </Text>
                  <View style={styles.earningRow}>
                    <Image
                      source={require('../../../assets/Icon/diamond.png')}
                      style={styles.earningIcon}
                    />
                    <Text
                      style={[
                        styles.earningAmount,
                        {
                          color: theme.heading,
                          fontFamily: theme.starArenaFontSemiBold,
                        },
                      ]}>
                      12,380
                    </Text>
                  </View>
                </View>
              ),
            )}
          </View>

          {/* My Agency Card */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AgencyDataScreen', {agencyName: 'HIVE'});
            }}>
            <View
              style={[
                styles.agencyCard,
                {backgroundColor: theme.card, borderColor: theme.subheading},
              ]}>
              <View
                style={[styles.agencyAvatar, {backgroundColor: theme.heading}]}
              />
              <View style={styles.agencyInfo}>
                <Text
                  style={[
                    styles.agencyName,
                    {color: theme.heading, fontFamily: theme.starArenaFont},
                  ]}>
                  HIVE
                </Text>
                <Text
                  style={[
                    styles.agencyCode,
                    {color: theme.subheading, fontFamily: theme.starArenaFont},
                  ]}>
                  Code - 1001
                </Text>
              </View>
              <Image
                source={require('../../../assets/Icon/edit.png')}
                style={{height: hp(2.5), width: wp(5)}}
              />
            </View>
          </TouchableOpacity>

          {/* Invite Host */}
          <View style={styles.inviteSection}>
            <Text
              style={[
                styles.inviteText,
                {color: theme.heading, fontFamily: theme.starArenaFont},
              ]}>
              Invite Host
            </Text>
            <View
              style={[
                styles.inviteButton,
                {backgroundColor: theme.background},
              ]}>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}>
                Send Invite
              </Text>
            </View>
          </View>

          <MyHostHeader />
          <MyHostContent />
        </ScrollView>
      </View>
    </>
  );
};

export default AgencyPortalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  levelCardWrapper: {
    backgroundColor: '#ffffff0d',
    marginVertical: hp(2),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    paddingHorizontal: wp(3),
    fontSize: wp(4.5),
    paddingTop: hp(2),
  },
  goalSection: {
    paddingHorizontal: wp(3),
    paddingTop: hp(2),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: hp(1),
  },
  progressBackground: {
    height: hp(1.2),
    width: wp(85),
    backgroundColor: '#484848',
    borderRadius: 50,
  },
  progressFill: {
    height: '100%',
    borderRadius: 50,
  },
  earningCards: {
    paddingHorizontal: wp(1),
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(3),
    gap: 8,
  },
  earningCard: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    width: wp(45),
  },
  earningTitle: {
    fontSize: wp(3.5),
  },
  earningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: hp(1.2),
  },
  earningIcon: {
    height: hp(3),
    width: wp(6),
  },
  earningAmount: {
    fontSize: hp(2.5),
  },
  agencyCard: {
    marginHorizontal: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    gap: 23,
    width: '92%',
  },
  agencyAvatar: {
    height: hp(7),
    width: wp(14),
    borderRadius: 10,
  },
  agencyInfo: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 7,
  },
  agencyName: {
    fontSize: hp(2.1),
  },
  agencyCode: {
    fontSize: hp(1.6),
  },
  inviteSection: {
    marginHorizontal: wp(4),
    marginVertical: hp(3),
    borderRadius: 60,
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181818',
  },
  inviteText: {
    marginLeft: wp(6),
  },
  inviteButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.3),
    borderRadius: 60,
  },
});
