import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../constant/ThemeContext";

// Assuming you have the ThemeContext implemented similarly outside Expo

const ClipScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cardContainer}>
        {[...Array(30)].map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.innerCard}></View>
            <View style={styles.viewsContainer}>
              <Image
                source={require("../../../assets/Icon/Eye.png")}
                style={styles.eyeIcon}
              />
              <Text style={[styles.viewText, { fontFamily: theme.starArenaFont }]}>
                200k
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ClipScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "space-evenly",
  },
  card: {
    width: "32%",
    height: 150,
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 2,
    borderRadius: 8,
  },
  innerCard: {
    height: "85%",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  viewsContainer: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  eyeIcon: {
    height: 10,
    width: 15,
  },
  viewText: {
    fontSize: 12,
    marginTop: 2,
  },
});
