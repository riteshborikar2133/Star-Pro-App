import {
  Image,
  StyleSheet,
  Switch,
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
const Chat = () => {
  const { theme } = useTheme();
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [enableReceipts, setEnableReceipts] = useState(false);

  return (
    <>
      <OtherHeader title="Chat" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 12,
          }}
        >
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
                    In-App Sound
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: hp(1.7),
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    Others will see when you were last online
                  </Text>
                </View>
                <Switch
                  value={isSoundEnabled}
                  onValueChange={setIsSoundEnabled}
                  trackColor={{ false: "#767577", true: theme.accent2 }}
                  thumbColor={isSoundEnabled ? theme.accent1 : "#f4f3f4"}
                />
              </View>
            </TouchableOpacity>
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
                    Read Receipts
                  </Text>
                  <Text
                    style={{
                      color: theme.subheading,
                      fontSize: hp(1.7),
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    Others will know when you read messages
                  </Text>
                </View>
                <Switch
                  value={enableReceipts}
                  onValueChange={setEnableReceipts}
                  trackColor={{ false: "#767577", true: theme.accent2 }}
                  thumbColor={enableReceipts ? theme.accent1 : "#f4f3f4"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Chat;

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
