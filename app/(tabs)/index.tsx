import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../constants/ThemeContext";
import { useFonts } from "expo-font";
import HomeCard from "../../components/HomeCard";
import CustomHeader from "../../components/CustomHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("live"); // State to track the active tab
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <CustomHeader />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingBottom: bottom,
        }}
      >
        {/* Home Top tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal: 10 }} // Optional styling
        >
          <View style={[styles.headerStyle]}>
            <TouchableOpacity
              style={[
                styles.tabStyle,
                {
                  borderColor: theme.accent1,
                  backgroundColor:
                    activeTab == "Post" ? theme.accent1 : "transparent",
                },
              ]}
              onPress={() => setActiveTab("Post")}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "starArenaFont",
                    color: theme.heading,
                    // fontSize: 24,
                    textAlign: "center",
                    // fontWeight: "bold",
                  }}
                >
                  Post
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabStyle,
                {
                  borderColor: theme.accent1,
                  backgroundColor:
                    activeTab == "live" ? theme.accent1 : "transparent",
                },
              ]}
              onPress={() => setActiveTab("live")}
            >
              <View>
                <Text
                  style={{
                    color: theme.heading,
                    textAlign: "center",
                    fontFamily: "starArenaFont",
                  }}
                >
                  Live
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabStyle,
                {
                  borderColor: theme.accent1,
                  backgroundColor:
                    activeTab == "Vlogs" ? theme.accent1 : "transparent",
                },
              ]}
              onPress={() => setActiveTab("Vlogs")}
            >
              <View>
                <Text
                  style={{
                    color: theme.heading,
                    textAlign: "center",
                    fontFamily: "starArenaFont",
                  }}
                >
                  Clips
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabStyle,
                {
                  borderColor: theme.accent1,
                  backgroundColor:
                    activeTab == "following" ? theme.accent1 : "transparent",
                },
              ]}
              onPress={() => setActiveTab("following")}
            >
              <View>
                <Text
                  style={{
                    color: theme.heading,
                    textAlign: "center",
                    fontFamily: "starArenaFont",
                  }}
                >
                  Following
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {activeTab == "live" && (
          <ScrollView
            contentContainerStyle={[
              styles.cardContainer,
              { paddingBottom: bottom + 60 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    height: 55,
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "white",
  },
  tabStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 12,
    flex: 1,
    textAlign: "center",
    // borderColor:theme.accent1
  },
  cardContainer: {
    // flex: 1,
    paddingTop: 5,
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    // paddingBottom: 60,
  },
});
