import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../constants/ThemeContext";
import OtherHeader from "../../components/OtherPageHeader";
import { router } from "expo-router";

const AccountSetting = () => {
  const { theme } = useTheme();
  return (
    <>
      <OtherHeader title="Account" />
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
            Personal Info
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
                    Email
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: 14,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    abc@gmail.com
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/forward.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Method */}
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: theme.subheading, fontSize: 15 }}>
            Login Methods
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={require("../../assets/Icon/Settings/google.png")}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      Google
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 14,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      abc@gmail.com
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
                  <Image
                    source={require("../../assets/Icon/Settings/phone.png")}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      Phone Number
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 14,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      +91 8562468520
                    </Text>
                  </View>
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
                  <Image
                    source={require("../../assets/Icon/Settings/linked.png")}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      Linked Devices
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontSize: 10,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      See all the devices connected to this account
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
                  <Image
                    source={require("../../assets/Icon/Settings/delete.png")}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontSize: 18,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      Delete Accoung
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

export default AccountSetting;

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
