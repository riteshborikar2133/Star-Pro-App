import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import OtherHeader from "../../components/OtherHeader";
import { useTheme } from "../../constant/ThemeContext";

const ChatSettingScreen: React.FC = () => {
  const { theme } = useTheme();
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
  const [enableReceipts, setEnableReceipts] = useState<boolean>(false);

  return (
    <>
      <OtherHeader title="Chat" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.innerContainer}>
          <View style={{ paddingVertical: 10 }}>
            {/* In-App Sound Toggle */}
            <TouchableOpacity>
              <View style={styles.settingRow}>
                <View>
                  <Text style={[styles.title, { color: theme.heading, fontFamily: theme.starArenaFont }]}>
                    In-App Sound
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.subheading, fontFamily: theme.starArenaFont }]}>
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

            {/* Read Receipts Toggle */}
            <TouchableOpacity>
              <View style={styles.settingRow}>
                <View>
                  <Text style={[styles.title, { color: theme.heading, fontFamily: theme.starArenaFont }]}>
                    Read Receipts
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.subheading, fontFamily: theme.starArenaFont }]}>
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

export default ChatSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  innerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: hp(1.7),
  },
});
