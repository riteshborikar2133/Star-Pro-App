import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeCard from "../HomeCard";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LiveScreen = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <ScrollView>
      <View style={[styles.container, { paddingBottom: bottom + 60 }]}>
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </View>
    </ScrollView>
  );
};

export default LiveScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(2),
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  },
});
