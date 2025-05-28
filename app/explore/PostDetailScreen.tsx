import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import OtherHeader from "../../components/OtherPageHeader";

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

  const [isListReady, setIsListReady] = useState(false);

  const parsedIndex = Number(index);
  const parsedData: Post[] = JSON.parse(decodeURIComponent(data as string));

  useEffect(() => {
    if (parsedData.length) {
      setPostList(parsedData);
      setLoading(false);
    }
  }, []);

  const onListLayout = () => {
    if (flatListRef.current && !loading && !isListReady) {
      flatListRef.current.scrollToIndex({
        index: parsedIndex,
        animated: false,
      });
      setIsListReady(true);
    }
  };

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
          height: hp(50),
          marginHorizontal: "auto",
          borderRadius: 10,
          marginBottom: hp(1),
          backgroundColor: "black",
        }}
        resizeMode="contain"
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

      {/* Liked By */}
      {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 6,
                  paddingVertical: hp(1),
                  paddingHorizontal: wp(4),
                }}
              >
                <Text
                  style={{
                    fontFamily: theme.starArenaFont,
                    color: theme.heading,
                    fontSize: hp(1.5),
                  }}
                >
                  Liked by
                </Text>
      
                <Text
                  style={{
                    fontFamily: theme.starArenaFontSemiBold,
                    color: theme.heading,
                    fontSize: hp(1.5),
                  }}
                >
                  {item.author}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.starArenaFont,
                    color: theme.heading,
                    fontSize: hp(1.5),
                  }}
                >
                  and
                </Text>
                <Text
                  style={{
                    fontFamily: theme.starArenaFontSemiBold,
                    color: theme.heading,
                    fontSize: hp(1.5),
                  }}
                >
                  24 other
                </Text>
              </View> */}

      {/* Caption */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
          paddingVertical: hp(1),
          paddingHorizontal: wp(4),
        }}
      >
        <Text
          style={{
            fontFamily: theme.starArenaFontSemiBold,
            color: theme.heading,
            fontSize: hp(1.5),
          }}
        >
          {item.author}
        </Text>
        <Text
          style={{
            fontFamily: theme.starArenaFont,
            color: theme.heading,
            fontSize: hp(1.5),
          }}
        >
          Daily Stop!
        </Text>
      </View>

      {/* Time */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
          paddingVertical: hp(0.5),
          paddingHorizontal: wp(4),
          paddingBottom: hp(1.5),
        }}
      >
        <Text
          style={{
            fontFamily: theme.starArenaFont,
            color: theme.subheading,
            fontSize: hp(1.5),
          }}
        >
          12th May
        </Text>
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
    <>
      <OtherHeader title="Post" />
      <FlatList
        ref={flatListRef}
        data={postList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onLayout={onListLayout}
        getItemLayout={(data, index) => ({
          length: hp(80),
          offset: hp(80) * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: wp(3),
          paddingTop: hp(2),
          paddingBottom: bottom + 60,
          backgroundColor: theme.background,
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
