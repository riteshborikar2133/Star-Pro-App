import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';

const NotificationTabScreen = () => {
  const {theme} = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <View style={styles.notificationContainer}>
        {/* Notification 1 */}
        <NotificationCard
          message="Username started a live"
          time="4m"
          theme={theme}
        />

        {/* Notification 2 */}
        <NotificationCard
          message="Username started following you"
          time="7m"
          theme={theme}
        />

        {/* Notification 3 */}
        <NotificationCard
          message="Username started following you"
          time="17m"
          theme={theme}
        />
      </View>
    </ScrollView>
  );
};

// 👇 You can extract reusable card for cleaner code
const NotificationCard = ({
  message,
  time,
  theme,
}: {
  message: string;
  time: string;
  theme: any;
}) => (
  <View style={styles.notificationRow}>
    <View
      style={{
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: theme.subheading,
          height: 50,
          width: 50,
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
          height: hp(2.2),
          width: hp(2.2),
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
          55
        </Text>
      </View>
    </View>
    <View style={{flexDirection: 'row', gap: 15, alignItems: 'baseline'}}>
      <Text
        style={{
          color: theme.heading,
          fontSize: hp(1.7),
          fontFamily: theme.starArenaFont,
        }}>
        {message}
      </Text>
      <Text
        style={{
          color: theme.subheading,
          fontSize: hp(1.4),
          fontFamily: theme.starArenaFont,
        }}>
        {time}
      </Text>
    </View>
  </View>
);

export default NotificationTabScreen;

const styles = StyleSheet.create({
  notificationContainer: {
    paddingTop: 5,
  },
  cardContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 60,
  },
  notificationRow: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    gap: 12,
  },
});
