import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { background } from "../../constants/colors";
const Tablayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true, // <--- Add this line
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: "absolute",
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
        name="Explore/Explore"
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
              source={require("../../assets/Icon/livebutton.png")}
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
