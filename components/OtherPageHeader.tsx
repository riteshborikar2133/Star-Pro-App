// components/CustomHeader.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../constants/ThemeContext";
import { useNavigation, useRouter } from "expo-router";

interface CustomHeaderProps {
  title?: string; // Make username optional
  source?: string;
}

const OtherHeader: React.FC<CustomHeaderProps> = ({ title, source }) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={[
          styles.backButton,
          // { backgroundColor: theme.background, position: "absolute" },
        ]}
        activeOpacity={0.7} // Provide touch feedback
      >
        <Image
          source={require("../assets/Icon/back.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      {/* <Image source={require("../assets/Icon/back.png")} style={styles.logo} /> */}
      <Text
        style={[
          styles.title,
          { color: theme.primary, fontFamily: theme.starArenaFontSemiBold },
        ]}
      >
        {title}
      </Text>
      {/* <Image source={require("../assets/Menu-right.png")} style={styles.logo} /> */}
    </View>
  );
};

export default OtherHeader;

const styles = StyleSheet.create({
  header: {
    height: 50,
    // backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    borderWidth: 1,
    // borderColor: "red",
    position: "relative",
  },
  // logo: {
  //   position: "absolute",
  //   width: 30,
  //   height: 25,
  //   resizeMode: "contain",
  // },
  backButton: {
    width: 40,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    // fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    fontFamily: "starArenaFont",
    // borderColor: "red",
    // borderWidth: 1,
    height: "50%",
    marginRight: 20,
  },
});
