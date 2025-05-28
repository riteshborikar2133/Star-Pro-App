import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../constants/ThemeContext";
import OtherHeader from "../../components/OtherPageHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ForYouClips from "../../components/LiveScreen/ForYouClips";
const Live = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("foryou");
  return (
    <View style={{ flex: 1 }}>
      <OtherHeader title="Live" />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            // alignItems: "center",
            gap: wp(2.5),
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
            backgroundColor: theme.background,
            justifyContent: "center",
            width: wp(100),
          }}
        >
          {/* Post */}
          <TouchableOpacity
            onPress={() => {
              setActiveTab("foryou");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.accent1,
                width: wp(46),
                paddingHorizontal: wp(5),
                paddingVertical: hp(1),
                borderRadius: 10,
                backgroundColor:
                  activeTab == "foryou" ? theme.accent1 : "transparent",
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(2),
                  textAlign: "center",
                }}
              >
                For You
              </Text>
            </View>
          </TouchableOpacity>

          {/* Following */}
          <TouchableOpacity
            onPress={() => {
              setActiveTab("Following");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.accent1,
                paddingHorizontal: wp(5),
                paddingVertical: hp(1),
                width: wp(46),
                borderRadius: 10,
                backgroundColor:
                  activeTab == "Following" ? theme.accent1 : "transparent",
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(2),
                  textAlign: "center",
                }}
              >
                Following
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {activeTab == "foryou" && (
        <View style={{ flex: 1 }}>
          <ForYouClips />
        </View>
      )}
    </View>
  );
};

export default Live;

const styles = StyleSheet.create({});
