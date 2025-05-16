// components/CustomHeader.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../constants/ThemeContext";
import { router } from "expo-router";

interface CustomHeaderProps {
  username?: string; // Make username optional
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ username }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => router.push("/Settings/Countries")}>
        <Image
          source={require("../assets/Menu-left.png")}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>
        {!username ? "Pro Star" : "@" + username}
      </Text>
      <TouchableOpacity onPress={() => router.push("/Settings/Settings")}>
        <Image
          source={require("../assets/Menu-right.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
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
