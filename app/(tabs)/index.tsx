import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../constants/ThemeContext";
import CustomHeader from "../../components/CustomHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LiveScreen from "../../components/HomeScreen/LiveScreen";
import PostScreen from "../../components/HomeScreen/PostScreen";

const index = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("Post");
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomHeader />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Horizontal Menu */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            gap: wp(2.5),
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
            backgroundColor: theme.background,
          }}
        >
          {/* Post */}
          <TouchableOpacity
            onPress={() => {
              setActiveTab("Post");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.accent1,
                paddingHorizontal: wp(5),
                paddingVertical: hp(1),
                borderRadius: 10,
                backgroundColor:
                  activeTab == "Post" ? theme.accent1 : "transparent",
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(2),
                }}
              >
                Post
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveTab("Live");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.accent1,
                paddingHorizontal: wp(5),
                paddingVertical: hp(1),
                borderRadius: 10,
                backgroundColor:
                  activeTab == "Live" ? theme.accent1 : "transparent",
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(2),
                }}
              >
                Live
              </Text>
            </View>
          </TouchableOpacity>

          {/* Clip */}
          <TouchableOpacity
            onPress={() => {
              setActiveTab("Clip");
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.accent1,
                paddingHorizontal: wp(5),
                paddingVertical: hp(1),
                borderRadius: 10,
                backgroundColor:
                  activeTab == "Clip" ? theme.accent1 : "transparent",
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(2),
                }}
              >
                Clips
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
                }}
              >
                Following
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {activeTab == "Post" && <PostScreen />}
      {activeTab == "Live" && <LiveScreen />}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 10,
  },
});
