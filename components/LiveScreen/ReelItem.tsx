import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "../../constants/ThemeContext";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ReelItemProps {
  videoUri: string;
}

const ReelItem: React.FC<ReelItemProps> = ({ videoUri }) => {
  const { theme } = useTheme();

  const [showLike, setShowLike] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  const handleDoubleTap = () => {
    setShowLike(true);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowLike(false));
  };

  let lastTap: number | null = null;

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      handleDoubleTap(); // double tap detected
    }
    lastTap = now;
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View
          style={{
            backgroundColor: theme.card,
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: theme.starArenaFont,
              color: theme.heading,
            }}
          >
            Video :{videoUri}
          </Text>
        </View>

        {/* ❤️ Like animation overlay */}
        {showLike && (
          <Animated.Image
            source={require("../../assets/Icon/Post/like.png")}
            style={[
              styles.heartIcon,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
            resizeMode="contain"
          />
        )}

        {/* Action buttons */}
        <View style={[styles.actionButton]}>
          <View style={styles.button}>
            <Image
              source={require("../../assets/Icon/Post/heart.png")}
              style={{ width: 32, height: 32 }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: theme.heading,
                textAlign: "center",
              }}
            >
              25k
            </Text>
          </View>
          <View style={styles.button}>
            <Image
              source={require("../../assets/Icon/Post/comment.png")}
              style={{ height: 35, width: 35 }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: theme.heading,
                textAlign: "center",
              }}
            >
              5k
            </Text>
          </View>
          <View style={styles.button}>
            <Image
              source={require("../../assets/Icon/Post/share.png")}
              style={{ width: 32, height: 32 }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ReelItem;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    position: "relative",
  },
  actionButton: {
    position: "absolute",
    bottom: 180,
    right: 8,
  },
  button: {
    marginVertical: 10,
  },
  heartIcon: {
    position: "absolute",
    top: "35%",
    left: "35%",
    width: 100,
    height: 100,
    opacity: 0.9,
  },
  heartGif: {
    position: "absolute",
    top: "35%",
    left: "35%",
    width: 120,
    height: 120,
    zIndex: 10,
  },
});
