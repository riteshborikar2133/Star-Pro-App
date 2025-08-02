import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native'; // ✅ React Navigation hook
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '../../constant/ThemeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Define your navigation stack types
type RootStackParamList = {
  ChatInterface: {username: string};
};

const ChatScreeen = () => {
  const {theme} = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const chatList = [
    {
      username: 'Priyanka Gandhi',
      message: 'Hey! How are you?',
      time: '3d',
      hasUnread: true,
    },
    {
      username: 'Rahul Sharma',
      message: "Let's catch up!",
      time: '1d',
      hasUnread: true,
    },
    {
      username: 'Ananya Verma',
      message: 'Call me later',
      time: '5h',
      hasUnread: false,
    },
    {
      username: 'Neha Rao',
      message: 'Meeting at 3 PM',
      time: '2h',
      hasUnread: false,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      {chatList.map((chat, index) => (
        <TouchableOpacity
          key={index}
          style={styles.chatScreenContainer}
          onPress={() =>
            navigation.navigate('ChatInterface', {username: chat.username})
          }>
          <View style={styles.chatRow}>
            <View style={styles.chatInfo}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: theme.subheading,
                  borderRadius: 11,
                }}
              />
              <View>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: hp(1.7),
                    fontFamily: theme.starArenaFont,
                  }}>
                  {chat.username}
                </Text>
                <View style={styles.messageRow}>
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: hp(1.4),
                      fontFamily: theme.starArenaFont,
                    }}>
                    {chat.message}
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: hp(1.4),
                      fontFamily: theme.starArenaFont,
                    }}>
                    {chat.time}
                  </Text>
                </View>
              </View>
            </View>

            {chat.hasUnread && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: theme.accent2,
                  borderRadius: 30,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ChatScreeen;

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 5,
    flexDirection: 'column',
    paddingBottom: 60,
    // gap: 10,
  },
  chatScreenContainer: {
    // paddingHorizontal: 10,
  },
  chatRow: {
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatInfo: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  messageRow: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'baseline',
  },
});
