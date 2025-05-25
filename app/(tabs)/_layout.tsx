import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { background } from "../../constants/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const Tablayout = () => {
  const { bottom } = useSafeAreaInsets(); // Get bottom safe area inset

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true, // <--- Add this line
        lazy: false, // 👈 Preload all tabs
        tabBarStyle: {
          backgroundColor: "#ffffff",
          // height: 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: "absolute",
          bottom: 0,
          paddingBottom: Platform.OS === "android" ? bottom : 0, // Add padding for Android
        },
        tabBarIconStyle: {
          flex: 1,
          // backgroundColor: "green",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              source={require("../../assets/Icon/HomeButton.png")}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarShowLabel: false,
          // headerShown: true,
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/Icon/Searchbutton.png")}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Live"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/Icon/clip.png")}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Notification"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/Icon/Notificationbutton.png")}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/Icon/Profilebutton.png")}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Tablayout;

const styles = StyleSheet.create({});
