// components/CustomHeader.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../constants/ThemeContext";

interface CustomHeaderProps {
  username?: string; // Make username optional
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ username }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <Image source={require("../assets/Menu-left.png")} style={styles.logo} />
      <Text style={[styles.title, { color: theme.primary }]}>
        {!username ? "Pro Star" : "@" + username}
      </Text>
      <Image source={require("../assets/Menu-right.png")} style={styles.logo} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    // backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    // fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    fontFamily: "starArenaFont",
  },
});
