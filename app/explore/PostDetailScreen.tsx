import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

interface Post {
  id: number;
  author: string;
  download_url: string;
}

const screenWidth = Dimensions.get("window").width;

const PostDetailScreen = () => {
  const { index, data } = useLocalSearchParams();
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const flatListRef = useRef<FlatList>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const parsedIndex = parseInt(index as string);
  const parsedData: Post[] = JSON.parse(decodeURIComponent(data as string));
  console.log(index);

  useEffect(() => {
    if (parsedData?.length) {
      setPostList(parsedData);
      setLoading(false);

      // Scroll to the tapped item
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: parsedIndex,
          animated: false,
        });
      }, 50);
    }
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.card,
        borderRadius: 10,
        marginBottom: hp(3),
        overflow: "hidden",
        backgroundColor: theme.card,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: hp(1.5),
          paddingHorizontal: wp(3.5),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.card,
            gap: 15,
          }}
        >
          <Image
            source={require("../../assets/person.png")}
            style={{ height: hp(5), width: wp(11), borderRadius: 30 }}
          />
          <View>
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFontSemiBold,
              }}
            >
              {item.author || "Unknown Author"}
            </Text>
            <Text
              style={{
                color: theme.subheading,
                fontFamily: theme.starArenaFont,
              }}
            >
              India
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../../assets/Icon/Post/menu.png")}
            style={{ height: hp(2), width: wp(5) }}
          />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image
        source={{ uri: item.download_url }}
        style={{
          width: screenWidth - wp(10),
          height: 200,
          marginHorizontal: wp(5),
          borderRadius: 10,
          marginBottom: hp(1),
        }}
        resizeMode="cover"
      />

      {/* Footer */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: hp(0.5),
          paddingBottom: hp(1.5),
          paddingHorizontal: wp(4),
          backgroundColor: theme.card,
          gap: 15,
        }}
      >
        {/* Like */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image
            source={require("../../assets/Icon/Post/heart.png")}
            style={{ height: hp(3), width: wp(7) }}
          />
          <Text
            style={{
              color: theme.heading,
              fontSize: hp(2),
              fontFamily: theme.starArenaFont,
            }}
          >
            25
          </Text>
        </View>

        {/* Comment */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image
            source={require("../../assets/Icon/Post/comment.png")}
            style={{ height: hp(3), width: wp(7) }}
          />
          <Text
            style={{
              color: theme.heading,
              fontSize: hp(2),
              fontFamily: theme.starArenaFont,
            }}
          >
            25
          </Text>
        </View>

        {/* Share */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image
            source={require("../../assets/Icon/Post/share.png")}
            style={{ height: hp(3), width: wp(7) }}
          />
          <Text
            style={{
              color: theme.heading,
              fontSize: hp(2),
              fontFamily: theme.starArenaFont,
            }}
          >
            25
          </Text>
        </View>
      </View>
    </View>
  );

  return loading ? (
    <ActivityIndicator
      size="large"
      color={theme.heading}
      style={{ marginTop: hp(10) }}
    />
  ) : (
    <FlatList
      ref={flatListRef}
      data={postList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: wp(3),
        paddingTop: hp(2),
        paddingBottom: bottom + 60,
        backgroundColor: theme.background,
      }}
      showsVerticalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: 300 + hp(12),
        offset: (300 + hp(12)) * index,
        index,
      })}
    />
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
