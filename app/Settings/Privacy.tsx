import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import OtherHeader from "../../components/OtherPageHeader";
import { useTheme } from "../../constants/ThemeContext";

const Privacy = () => {
  const { theme } = useTheme();
  return (
    <>
      <OtherHeader title="Privacy" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}
        >
          <View style={{ paddingVertical: 5}}>
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
                    source={require("../../assets/Icon/Settings/password.png")}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    Passcode Lock
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/forward.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 5}}>
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
                    source={require("../../assets/Icon/Settings/block.png")}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontSize: 18,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    Passcode Lock
                  </Text>
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

export default Privacy;

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
