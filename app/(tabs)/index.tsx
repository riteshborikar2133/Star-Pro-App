import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../constants/ThemeContext";
import CustomHeader from "../../components/CustomHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LiveScreen from "../../components/HomeScreen/LiveScreen";
import PostScreen from "../../components/HomeScreen/PostScreen";

const Index = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("Post");

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomHeader />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
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
          {["Post", "Live", "Following"].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: activeTab === tab ? theme.accent1 : theme.card,
                  paddingHorizontal: wp(5),
                  paddingVertical: hp(1),
                  borderRadius: 10,
                  backgroundColor:
                    activeTab === tab ? theme.accent1 : theme.card,
                }}
              >
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    fontSize: hp(2),
                  }}
                >
                  {tab === "Following" ? "Following" : tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Keep both screens mounted, just hide inactive one */}
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.screenContainer,
            { display: activeTab === "Post" ? "flex" : "none" },
          ]}
        >
          <PostScreen />
        </View>
        <View
          style={[
            styles.screenContainer,
            { display: activeTab === "Live" ? "flex" : "none" },
          ]}
        >
          <LiveScreen />
        </View>
        {/* You can add FollowingScreen here similarly */}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  screenContainer: {
    flex: 1,
  },
});
