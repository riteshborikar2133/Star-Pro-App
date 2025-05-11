import React from "react";
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

const UserProfile: React.FC = () => {
  const { username } = useLocalSearchParams<{ username: string }>();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ padding: 20 }}
    >
      <View style={styles.profileHeader}>
        <View style={[styles.avatar, { backgroundColor: theme.subheading }]} />
        <Text style={[styles.username, { color: theme.heading }]}>
          {username}
        </Text>
        <Text style={[styles.userId, { color: theme.subheading }]}>
          #1000231
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Image
            source={require("../../assets/Icon/diamond.png")}
            style={styles.icon}
          />
          <Text style={{ color: theme.heading }}>11.4M</Text>
        </View>
        <View style={styles.stat}>
          <Image
            source={require("../../assets/Icon/duoProfile.png")}
            style={styles.icon}
          />
          <Text style={{ color: theme.heading }}>8.2M</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.followBtn, { borderColor: theme.accent1 }]}
      >
        <Text style={[styles.followText, { color: theme.accent1 }]}>
          Follow
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 30,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontFamily: "System",
  },
  userId: {
    fontSize: 14,
    marginTop: 5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 5,
  },
  followBtn: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  followText: {
    fontSize: 16,
    fontFamily: "System",
  },
});
