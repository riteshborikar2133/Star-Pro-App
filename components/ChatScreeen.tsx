import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";
import { useRouter } from "expo-router";

const ChatScreeen = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const chatList = [
    {
      username: "Priyanka Gandhi",
      message: "Hey! How are you?",
      time: "3d",
      hasUnread: true,
    },
    {
      username: "Rahul Sharma",
      message: "Let's catch up!",
      time: "1d",
      hasUnread: true,
    },
    {
      username: "Ananya Verma",
      message: "Call me later",
      time: "5h",
      hasUnread: false,
    },
    {
      username: "Neha Rao",
      message: "Meeting at 3 PM",
      time: "2h",
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
            router.push({
              pathname: "/Chat/ChatScreen",
              params: { username: chat.username },
            })
          }
        >
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
                    fontSize: 15,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  {chat.username}
                </Text>
                <View style={styles.messageRow}>
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 14,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    {chat.message}
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: 14,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
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
    flexDirection: "column",
    paddingBottom: 60,
    gap: 10,
  },
  chatScreenContainer: {
    paddingHorizontal: 10,
  },
  chatRow: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatInfo: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  messageRow: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "baseline",
  },
});
