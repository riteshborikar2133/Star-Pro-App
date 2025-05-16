import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../constants/ThemeContext";
import OtherHeader from "../../components/OtherPageHeader";
import { router } from "expo-router";

const GeneralSetting = () => {
  const { theme } = useTheme();
  return (
    <>
      <OtherHeader title="General" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: theme.subheading, fontSize: 15 }}>
            Live Streams
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity
            // onPress={() => router.push("/Settings/AccountSetting")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    Language Settings
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: 14,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    English (US)
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/forward.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other */}
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: theme.subheading, fontSize: 15 }}>Other</Text>
          <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity
            // onPress={() => router.push("/Settings/AccountSetting")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      Clean Up Space
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 14,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      Clearable cache: 21.23 mb{" "}
                    </Text>
                  </View>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/forward.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
            // onPress={() => router.push("/Settings/AccountSetting")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      Support
                    </Text>
                    {/* <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 14,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      +91 8562468520
                    </Text> */}
                  </View>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/forward.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default GeneralSetting;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
