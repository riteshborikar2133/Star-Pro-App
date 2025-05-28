import React from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import { useTheme } from "../../constants/ThemeContext";
import ReelItem from "./ReelItem"; // Separate component for each reel

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const DATA = [
  { id: "1", videoUri: "https://example.com/video1.mp4" },
  { id: "2", videoUri: "https://example.com/video2.mp4" },
  { id: "3", videoUri: "https://example.com/video3.mp4" },
  { id: "4", videoUri: "https://example.com/video3.mp4" },
  { id: "5", videoUri: "https://example.com/video3.mp4" },
];

const ForYouClips = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderWidth: 0, borderColor: "red" },
      ]}
    >
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReelItem videoUri={item.videoUri} />}
        pagingEnabled
        showsVerticalScrollIndicator={true}
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
      />
    </View>
  );
};

export default ForYouClips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
