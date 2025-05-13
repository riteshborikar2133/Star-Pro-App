import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../constants/ThemeContext";
import CustomHeader from "../../components/CustomHeader";
import MomentScreen from "../../components/MomentScreen";

const UserProfile: React.FC = () => {
  const { username } = useLocalSearchParams<{ username: string }>();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("Moments");

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader username={username} />
      {/* Follower */}
      <View style={[styles.profileHeader, { height: "12%" }]}>
        {/* Image */}
        <View>
          <Image
            source={require("../../assets/person.png")}
            style={{ height: 65, width: 65 }}
          />
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
            }}
          >
            {username}
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
      {/* Bio */}
      <View
        style={[
          {
            height: "8%",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            // borderWidth: 1,
            // borderColor: theme.accent1,
            paddingHorizontal: 10,
          },
        ]}
      >
        <View
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
        </View>
        <View
          style={{
            // height: "100%",
            width: "65%",
            // borderWidth: 1,
            // borderColor: "white",
          }}
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
            width: "75%",
            gap: 10,
            // borderWidth: 1,
            // borderColor: "red",
          }}
        >
          {/* Edit */}
          <View style={[styles.button, { width: "45%", height: 35, gap: 8 }]}>
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
          <View style={[styles.button, { width: "45%", height: 35, gap: 8 }]}>
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
        </View>
        {/* Share */}
        <View
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
        </View>
      </View>
      {/* Live status */}
      <View
        style={[
          styles.editLayeroutHeader,
          {
            justifyContent: "space-between",
            width: "100%",
            borderBottomColor: "white",
            paddingVertical: 15,
            borderBottomWidth: 1,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/Icon/online.png")}
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
            Live 2hr ago
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

      {/* Moment and Blogs */}
      <View style={[styles.momentandBlog, { gap: 10 }]}>
        <TouchableOpacity
          onPress={() => setActiveTab("Moments")}
          style={[
            styles.button,
            {
              width: "48%",
              paddingVertical: 8,
              backgroundColor:
                activeTab === "Moments" ? "white" : "transparent",
            },
          ]}
        >
          <Text
            style={{
              color: activeTab === "Moments" ? "black" : theme.heading,
              fontFamily: theme.starArenaFont,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Moments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Blogs")}
          style={[
            styles.button,
            {
              width: "48%",
              paddingVertical: 8,
              backgroundColor: activeTab === "Blogs" ? "white" : "transparent",
            },
          ]}
        >
          <Text
            style={{
              color: activeTab === "Blogs" ? "black" : theme.heading,
              fontFamily: theme.starArenaFont,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Blogs
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab == "Moments" && <MomentScreen />}
    </View>
  );
};

export default UserProfile;

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
    // borderColor: "red",
    // borderWidth: 1,
  },
  editLayeroutHeader: {
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
    // borderWidth: 1,
    // borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
