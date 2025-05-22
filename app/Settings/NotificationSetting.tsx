import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import OtherHeader from "../../components/OtherPageHeader";
import { useTheme } from "../../constants/ThemeContext";
import { router } from "expo-router";

const NotificationSetting = () => {
  const { theme } = useTheme();

  // State for toggles
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);

  return (
    <>
      <OtherHeader title="Notification" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={{ paddingVertical: 5, paddingHorizontal: 12 }}>
          <Text style={{ color: theme.subheading, fontSize: 15 }}>
            Live Streams
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                router.push("/Settings/LiveNotificationSetting");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  alignItems: "center",
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
                    Live Notification
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: 14,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    Get notified when your friends are live
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/forward.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sound & Vibration Settings */}
        <View style={{ paddingVertical: 5, paddingHorizontal: 12 }}>
          <Text style={{ color: theme.subheading, fontSize: 15 }}>
            Preferences
          </Text>

          {/* In-App Sound Toggle */}
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 18,
                  fontFamily: theme.starArenaFont,
                }}
              >
                In-App Sound
              </Text>
              <Switch
                value={isSoundEnabled}
                onValueChange={setIsSoundEnabled}
                trackColor={{ false: "#767577", true: theme.accent2 }}
                thumbColor={isSoundEnabled ? theme.accent1 : "#f4f3f4"}
              />
            </View>
          </View>

          {/* In-App Vibration Toggle */}
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 18,
                  fontFamily: theme.starArenaFont,
                }}
              >
                In-App Vibrations
              </Text>
              <Switch
                value={isVibrationEnabled}
                onValueChange={setIsVibrationEnabled}
                trackColor={{ false: "#767577", true: theme.accent2 }}
                thumbColor={isVibrationEnabled ? theme.accent1 : "#f4f3f4"}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default NotificationSetting;

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
