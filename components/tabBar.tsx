import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";

const TabBar = ({
  activeTab,
  setActiveTab,
  theme,
  postCount,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: any; // Replace `any` with your actual theme type if available
  postCount: number;
}) => {
  const [count, setCount] = useState(0);
  const handleTabPress = useCallback((tab: string) => {
    setActiveTab(tab);
    setCount((prev) => prev + 1);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "black",
        // display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        // backgroundColor: "black", // must be opaque
        // flexDirection: "row",
        // justifyContent: "space-around",
        // paddingVertical: 10,
        zIndex: 10,
        elevation: 10, // important for Android
      }}
    >
      <TouchableOpacity
        onPress={() => handleTabPress("Moments")}
        style={[
          styles.button,
          {
            width: "48%",
            paddingVertical: 8,
            paddingHorizontal: 8,
            backgroundColor: activeTab === "Moments" ? "white" : theme.card,
            borderColor: activeTab === "Moments" ? "white" : theme.card,
          },
        ]}
      >
        <Text
          style={{
            color: activeTab === "Moments" ? "black" : theme.heading,
            fontFamily: theme.starArenaFont,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Posts {postCount}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTabPress("Blogs")}
        style={[
          styles.button,
          {
            width: "48%",
            paddingVertical: 8,
            backgroundColor: activeTab === "Blogs" ? "white" : theme.card,
            borderColor: activeTab === "Blogs" ? "white" : theme.card,
          },
        ]}
      >
        <Text
          style={{
            color: activeTab === "Blogs" ? "black" : theme.heading,
            fontFamily: theme.starArenaFont,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Clips
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
