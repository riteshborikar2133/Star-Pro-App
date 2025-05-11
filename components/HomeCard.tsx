import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";

const HomeCard = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.heading }]}>
      {/* gray card */}
      <View
        style={[styles.insidecardContainer, { backgroundColor: "#2B2B2B" }]}
      >
        <Text style={{ color: theme.subheading, flex: 1 }}>
          <Image
            source={require("../assets/Icon/Eye.png")}
            resizeMode="cover"
          />{" "}
          10k
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            paddingHorizontal: 3,
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: "white",
              borderRadius: 7,
            }}
          ></View>
          <View>
            <Text style={{ color: theme.heading, fontWeight: "700" }}>
              UserName
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
            >
              <Image
                source={require("../assets/Icon/diamond.png")}
                style={{ height: 13, width: 13 }}
              />
              <Text style={{ color: theme.subheading, fontSize:13 }}>11.4M</Text>
            </View>
          </View>
        </View>
      </View>
      {/* stars */}
      <View
        style={{
        //   backgroundColor: "red",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 5,
        }}
      >
        <Image
          source={require("../assets/Icon/StarFill.png")}
          style={{ height: 20, width: 20 }}
        />
        <Image
          source={require("../assets/Icon/StarFill.png")}
          style={{ height: 20, width: 20 }}
        />
        <Image
          source={require("../assets/Icon/StarFill.png")}
          style={{ height: 20, width: 20 }}
        />
        <Image
          source={require("../assets/Icon/Star.png")}
          style={{ height: 20, width: 20 }}
        />
        <Image
          source={require("../assets/Icon/Star.png")}
          style={{ height: 20, width: 20 }}
        />
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 280,
    width: "48%",
    borderRadius: 25,
    marginTop: 15,
  },
  insidecardContainer: {
    borderRadius: 20,
    backgroundColor: "red",
    height: "88%",
    padding: 10,
  },
});
