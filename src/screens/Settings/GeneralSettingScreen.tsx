import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../constant/ThemeContext";
import OtherHeader from "../../components/OtherHeader";
// Use react-navigation for routing in CLI-based apps
// import { useNavigation } from "@react-navigation/native";

const GeneralSettingScreen: React.FC = () => {
  const { theme } = useTheme();
  // const navigation = useNavigation(); // Optional if using navigation

  return (
    <>
      <OtherHeader title="General" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Live Streams */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.subheading }]}>
            Live Streams
          </Text>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('LanguageSettings')}
            >
              <View style={styles.row}>
                <View>
                  <Text style={[styles.title, { color: theme.heading, fontFamily: theme.starArenaFont }]}>
                    Language Settings
                  </Text>
                  <Text style={[styles.subtitle, { color: theme.subheading, fontFamily: theme.starArenaFont }]}>
                    English (US)
                  </Text>
                </View>
                <Image source={require("../../../assets/Icon/Settings/forward.png")} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Other */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.subheading }]}>
            Other
          </Text>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              // onPress={() => navigation.navigate('Cleanup')}
            >
              <View style={styles.row}>
                <View style={styles.iconRow}>
                  <View>
                    <Text style={[styles.title, { color: theme.heading, fontFamily: theme.starArenaFont }]}>
                      Clean Up Space
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.subheading, fontFamily: theme.starArenaFont }]}>
                      Clearable cache: 21.23 mb
                    </Text>
                  </View>
                </View>
                <Image source={require("../../../assets/Icon/Settings/forward.png")} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.navigate('Support')}
            >
              <View style={styles.row}>
                <View style={styles.iconRow}>
                  <View>
                    <Text style={[styles.title, { color: theme.heading, fontFamily: theme.starArenaFont }]}>
                      Support
                    </Text>
                  </View>
                </View>
                <Image source={require("../../../assets/Icon/Settings/forward.png")} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default GeneralSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  section: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 15,
  },
  itemContainer: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
  },
});
