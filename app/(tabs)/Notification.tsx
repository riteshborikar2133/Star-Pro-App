import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../constants/ThemeContext";
import NotificationScreen from "../../components/NotificationScreen";
import ChatScreeen from "../../components/ChatScreeen";

const Notification = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("Notification"); // State to track the active tab

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Notification and chat tabs */}
      <View style={[styles.headerStyle]}>
        <TouchableOpacity
          style={[
            styles.tabStyle,
            {
              borderColor: theme.accent1,
              backgroundColor:
                activeTab == "Notification" ? theme.accent1 : "transparent",
            },
          ]}
          onPress={() => setActiveTab("Notification")}
        >
          <View>
            <Text
              style={{
                fontFamily: "starArenaFont",
                color: theme.heading,
                // fontSize: 24,
                textAlign: "center",
                // fontWeight: "bold",
              }}
            >
              Notification
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabStyle,
            {
              borderColor: theme.accent1,
              backgroundColor:
                activeTab == "Chats" ? theme.accent1 : "transparent",
            },
          ]}
          onPress={() => setActiveTab("Chats")}
        >
          <View>
            <Text
              style={{
                color: theme.heading,
                textAlign: "center",
                fontFamily: "starArenaFont",
              }}
            >
              Chats
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {activeTab == "Notification" && <NotificationScreen />}
      {activeTab == "Chats" && <ChatScreeen />}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "white",
  },
  tabStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 12,
    flex: 1,
    textAlign: "center",
    // borderColor:theme.accent1
  },
});
