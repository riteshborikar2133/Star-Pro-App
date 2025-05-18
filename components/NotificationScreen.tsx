import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
            // paddingHorizontal: 5,
            padding: 5,
            // paddingVertical: 5,
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: theme.subheading,
              borderRadius: 11,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", gap: 15, alignItems: "baseline" }}
          >
            <Text
              style={{
                color: theme.heading,
                fontSize: hp(2),
                fontFamily: theme.starArenaFont,
              }}
            >
              Username started a live
            </Text>
            <Text
              style={{
                color: theme.subheading,
                fontSize: hp(1.6),
                fontFamily: theme.starArenaFont,
                marginHorizontal: 0,
              }}
            >
              4m
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            // borderColor: "white",
            // borderWidth: 1,
            padding: 5,
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: theme.subheading,
              borderRadius: 11,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", gap: 15, alignItems: "baseline" }}
          >
            <Text
              style={{
                color: theme.heading,
                fontSize: hp(2),
                fontFamily: theme.starArenaFont,
              }}
            >
              Username started following you
            </Text>
            <Text
              style={{
                color: theme.subheading,
                fontSize: hp(1.6),
                fontFamily: theme.starArenaFont,
                marginHorizontal: 0,
              }}
            >
              7m
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            // borderColor: "white",
            // borderWidth: 1,
            padding: 5,
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: theme.subheading,
              borderRadius: 11,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", gap: 15, alignItems: "baseline" }}
          >
            <Text
              style={{
                color: theme.heading,
                fontSize: hp(2),
                fontFamily: theme.starArenaFont,
              }}
            >
              Username started following you
            </Text>
            <Text
              style={{
                color: theme.subheading,
                fontSize: hp(1.6),
                fontFamily: theme.starArenaFont,
                marginHorizontal: 0,
              }}
            >
              17m
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  notificationContainer: {
    paddingTop: 5,
    // marginHorizontal: 10,
  },
  cardContainer: {
    // flex: 1,
    // paddingTop: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 60,
  },
});
