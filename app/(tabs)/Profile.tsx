import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../constants/ThemeContext";
import OtherHeader from "../../components/OtherPageHeader";
import VlogScreen from "../../components/VlogScreen";
import MomentScreen from "../../components/MomentScreen";
import TabBar from "../../components/tabBar";

const Profile = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("Moments");
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* <CustomHeader username={activeTab} /> */}
      <OtherHeader title={"John"} source="UserProfile" />
      <ScrollView
        // stickyHeaderIndices={[4]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Follower */}
        <View style={[styles.profileHeader, { height: 100 }]}>
          {/* Image */}
          <View
            style={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 15,
              position: "relative",
            }}
          >
            <Image
              source={require("../../assets/person.png")}
              style={{ height: 65, width: 65 }}
            />
            <View
              style={{
                height: 18,
                width: 18,
                // padding:5,
                backgroundColor: theme.accent1,
                borderRadius: 5,
                position: "absolute",
                bottom: 0,
                right: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  textAlign: "center",
                  fontFamily: theme.starArenaFontSemiBold,
                }}
              >
                15
              </Text>
            </View>
          </View>
          {/* text */}
          <View
            style={{
              // borderWidth: 1,
              // borderColor: "white",
              // flex:1,
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-evenly",
              // alignItems: "center",
              // gap: 10,
              width: "65%",
            }}
          >
            <Text
              style={{
                color: theme.heading,
                fontSize: 18,
                fontFamily: theme.starArenaFontSemiBold,
                textAlign: "center",
              }}
            >
              {"John Doe"}
            </Text>
            <View
              style={{
                width: "100%",
                // borderWidth: 1,
                // borderColor: "white",
                flexDirection: "row",
                justifyContent: "space-between",
                // gap: 5,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 15,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  12k
                </Text>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 13,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Friends
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 15,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  1k
                </Text>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 13,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Followings
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 15,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  12.3L
                </Text>
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 13,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Followers
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Live status */}
        <View
          style={[
            styles.editLayeroutHeader,
            {
              justifyContent: "space-between",
              width: "100%",
              // borderBottomColor: "white",
              // paddingVertical: 15,
              // borderBottomWidth: 1,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/Icon/diamond.png")}
              style={{
                height: 12,
                width: 12,
              }}
            />
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: 15,
              }}
            >
              2500
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: 15,
              }}
            >
              Id - 1003420
            </Text>
            <Image
              source={require("../../assets/Icon/copy.png")}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </View>
        </View>

        {/* Bio */}
        <View
          style={[
            {
              // height: "%",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: theme.accent1,
              paddingHorizontal: 10,
              // paddingVertical: 10,
              paddingBottom: 10,
            },
          ]}
        >
          {/* <View
          style={{
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
            // width: "30%",
            gap: 5,
          }}
        >
          {[
            require("../../assets/Icon/pinkCrown.png"),
            require("../../assets/Icon/pinkShield.png"),
          ].map((icon, index) => (
            <View
              key={index}
              style={{
                borderWidth: 1,
                borderColor: theme.accent1,
                borderRadius: 8,
                height: 38,
                width: 38,
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <Image
                source={icon}
                resizeMode="contain"
                style={{ width: 15, height: 15 }}
              />
              <Text
                style={{
                  color: theme.accent1,
                  fontFamily: theme.starArenaFontSemiBold,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                10
              </Text>
            </View>
          ))}
        </View> */}
          <View
            style={[
              {
                // height: "100%",
                width: "100%",
                // paddingVertical:6,
                // borderWidth: 1,
                // borderColor: "white",
              },
            ]}
          >
            <Text style={{ color: theme.subheading, fontSize: 16 }}>
              Creator | Digital Artist | Actor | Photoholic
            </Text>
          </View>
        </View>
        {/* Edit and Inbox button */}
        <View style={[styles.editLayeroutHeader]}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 10,
              justifyContent: "space-between",
              // borderWidth: 1,
              // borderColor: "red",
            }}
          >
            {/* Edit */}
            <View style={[styles.button, { width: "30%", height: 35, gap: 8 }]}>
              <Image source={require("../../assets/Icon/edit.png")} />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: 16,
                }}
              >
                Edit
              </Text>
            </View>
            {/* Inbox */}
            <View style={[styles.button, { width: "30%", height: 35, gap: 8 }]}>
              <Image source={require("../../assets/Icon/chat.png")} />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: 16,
                }}
              >
                Inbox
              </Text>
            </View>
            <View style={[styles.button, { width: "30%", height: 35, gap: 8 }]}>
              <Image
                source={require("../../assets/Icon/share.png")}
                style={{ height: 15, width: 15 }}
              />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: 16,
                }}
              >
                Share
              </Text>
            </View>
          </View>
          {/* Share */}
          {/* <View
          style={{
            flexDirection: "row",
            width: "25%",
            gap: 10,
            // borderWidth: 1,
            // borderColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("../../assets/Icon/share.png")} />
        </View> */}
        </View>

        {/* Moment and Blogs */}
        <TabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
        />
        {activeTab == "Moments" && <MomentScreen />}
        {activeTab == "Blogs" && <VlogScreen />}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileHeader: {
    flexDirection: "row",
    paddingHorizontal: 10,
    // paddingVertical: 10,
    alignItems: "center",
    // justifyContent: "center",
    gap: 20,
  },
  editLayeroutHeader: {
    // borderColor: "red",
    // borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  button: {
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  momentandBlog: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 10,
  },
});
