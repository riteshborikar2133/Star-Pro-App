import {
  StyleSheet,
  View,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "../components/CustomHeader";
import { ThemeProvider, useTheme } from "../constants/ThemeContext";
import { useFonts } from "expo-font";
import { Text, TextInput } from "react-native"; // Import Text and TextInput

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    starArenaFont: require("../assets/fonts/StarArena.ttf"), // Ensure this path and filename are correct!
  });
  const pathname = usePathname();
  // const globalTextStyle = fontsLoaded ? { fontFamily: "starArenaFont" } : {};

  if (!fontsLoaded && !fontError) {
    return null; // Or replace with a loading indicator component
  }

  if (fontError) {
    console.error("Failed to load fonts:", fontError);
    return (
      <View style={styles.root}>
        <Text style={{ color: "red" }}>Font loading error!</Text>
        {/* Optionally display more detailed error information */}
      </View>
    );
  }

  const shouldShowHeader = !pathname.startsWith("/explore/");
  const username = pathname.startsWith("/explore/")
    ? pathname.split("/")[2]
    : "";

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={[styles.root]}>
          <StatusBar style="light" />
          {<CustomHeader username={username} />}
          {/* <Text style={{ color: "red" }}>{pathname}</Text> */}
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="explore/[username]"
              options={{ headerShown: false }}
            />
          </Stack>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
});
