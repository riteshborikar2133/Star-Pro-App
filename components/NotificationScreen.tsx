import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";

const NotificationScreen = () => {
  const { theme } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <View style={styles.notificationContainer}>
        <View
          style={{
            flexDirection: "row",
            // borderColor: "white",
            // borderWidth: 1,
            padding: 10,
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: theme.subheading,
              borderRadius: 11,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", gap: 15, alignItems: "baseline" }}
          >
            <Text style={{ color: theme.heading, fontSize: 15 }}>
              Username started a live
            </Text>
            <Text style={{ color: theme.subheading, fontSize: 12 }}>4m</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // borderColor: "white",
            // borderWidth: 1,
            padding: 10,
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: theme.subheading,
              borderRadius: 11,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", gap: 15, alignItems: "baseline" }}
          >
            <Text style={{ color: theme.heading, fontSize: 15 }}>
              Username started following you
            </Text>
            <Text style={{ color: theme.subheading, fontSize: 12 }}>7m</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // borderColor: "white",
            // borderWidth: 1,
            padding: 10,
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: theme.subheading,
              borderRadius: 11,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", gap: 15, alignItems: "baseline" }}
          >
            <Text style={{ color: theme.heading, fontSize: 15 }}>
              Username started following you
            </Text>
            <Text style={{ color: theme.subheading, fontSize: 12 }}>17m</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  notificationContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  cardContainer: {
    // flex: 1,
    paddingTop: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 60,
  },
});
