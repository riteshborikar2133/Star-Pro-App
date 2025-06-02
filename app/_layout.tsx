import {
  StyleSheet,
  View,
  Platform,
  StatusBar as RNStatusBar,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, usePathname } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../constants/ThemeContext";
import { useFonts } from "expo-font";
import { Text } from "react-native";

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    starArenaFont: require("../assets/fonts/StarArena.ttf"),
    starArenaFontSemiBold: require("../assets/fonts/StarArenaSemiBold.ttf"),
  });

  const pathname = usePathname();

  const shouldShowHeader = !pathname.startsWith("/explore/");
  const username = pathname.startsWith("/explore/")
    ? pathname.split("/")[2]
    : "";

  // Font loading handler
  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  if (fontError) {
    console.error("Font loading error:", fontError);
    return (
      <View style={styles.loader}>
        <Text style={[styles.loadingText, { color: "red" }]}>
          Font loading error!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={styles.root}>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              animation: "fade", // smoother than 'none'
              headerShown: false,
              gestureEnabled: true,
            }}
          >
            {/* Tab Screens */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Explore Profile */}
            <Stack.Screen
              name="explore/[username]"
              options={{ headerShown: false }}
            />

            {/* Settings Screens */}
            {[
              "Countries",
              "Settings",
              "AccountSetting",
              "GeneralSetting",
              "Recharge",
              "AgencyPortal",
              "CashOut",
              "AgencyData",
              "HostScreen",
              "ManageAdmin",
              "NotificationSetting",
              "Chat",
              "Privacy",
              "LiveNotificationSetting",
            ].map((screen) => (
              <Stack.Screen
                key={screen}
                name={`Settings/${screen}`}
                options={{
                  headerShown: false,
                  animation:
                    screen === "Settings" ? "slide_from_right" : "fade",
                }}
              />
            ))}

            {/* Post Details */}
            <Stack.Screen
              name="explore/PostDetailScreen"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Chat/ChatScreen"
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});
