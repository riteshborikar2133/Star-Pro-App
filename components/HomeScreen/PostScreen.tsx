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
import React, { useEffect, useState } from "react";
import { useTheme } from "../../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Post {
  id: number;
  author: string;
  download_url: string;
}
const screenWidth = Dimensions.get("window").width;
const BATCH_SIZE = 5;

const PostScreen = () => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const [allData, setAllData] = useState<Post[]>([]); // To store all the fetched data
  const [data, setData] = useState<Post[]>([]); // Paginated data to show in FlatList
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // To show loading indicator

  // Fetch the initial batch of data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://picsum.photos/v2/list");
        setAllData(res.data);
        setData(res.data.slice(0, BATCH_SIZE));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to load more data when scrolled near the end
  const loadMore = () => {
    if (loading) return; // Prevent multiple requests at the same time
    setLoading(true);
    const nextPage = page + 1;
    const start = page * BATCH_SIZE;
    const end = start + BATCH_SIZE;
    const nextBatch = allData.slice(start, end);
    if (nextBatch.length > 0) {
      setData((prev) => [...prev, ...nextBatch]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  // Render the post item
  const renderItem = ({ item }: { item: Post }) => {
    return (
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
              style={{
                height: hp(2),
                width: wp(5),
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Post Image */}
        <Image
          source={{ uri: item.download_url }}
          style={{
            width: screenWidth - wp(10),
            height: 200, // You can calculate the dynamic height here if needed
            margin: "auto",
            borderRadius: 10,
            marginBottom: hp(1),
          }}
          resizeMode="cover"
        />

        {/* Footer (Like Section) */}
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
          {/* Like Button */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              // borderWidth:1,
              // borderColor:'red'
            }}
          >
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
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
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={loadMore} // Trigger load more when user reaches the end
      onEndReachedThreshold={0.5} // Trigger when 50% of the screen is scrolled
      contentContainerStyle={{
        paddingHorizontal: wp(3),
        paddingTop: hp(2),
        paddingBottom: bottom + 60,
        backgroundColor: theme.background,
      }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="small" color={theme.heading} />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostScreen;
