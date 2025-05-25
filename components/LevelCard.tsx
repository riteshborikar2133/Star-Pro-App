import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = 250;

const CARDS = [
  {
    title: "SILVER",
    percent: "10%",
    description: "REACH THE GOAL TO UNLOCK",
    colors: ["#C0C0C0", "#A9A9A9"],
    borderColor: "#d3d3d3",
  },
  {
    title: "GOLD",
    percent: "12%",
    description: "REACH THE GOAL TO UNLOCK",
    colors: ["#FFD700", "#FFA500"],
    borderColor: "#FFCC00",
  },
  {
    title: "PLATINUM",
    percent: "15%",
    description: "REACH THE GOAL TO UNLOCK",
    colors: ["#E5E4E2", "#B0C4DE"],
    borderColor: "#F8F8FF",
  },
];

export default function LevelCard() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={CARD_HEIGHT}
        autoPlay={false}
        data={CARDS}
        scrollAnimationDuration={1000}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: "left",
          stackInterval: 30,
        }}
        renderItem={({ item, index, animationValue }) => {
          const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              animationValue.value,
              [-1, 0, 1],
              [0.85, 1, 0.85]
            );
            return {
              transform: [{ scale }],
            };
          });

          return (
            <Animated.View style={[styles.cardContainer, animatedStyle]}>
              <LinearGradient
                colors={item.colors}
                style={[styles.card, { borderColor: item.borderColor }]}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.percent}>{item.percent}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.lockedBtn}>
                  <Text style={styles.lockedText}>LOCKED</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  percent: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  lockedBtn: {
    backgroundColor: "#00000070",
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
  },
  lockedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
