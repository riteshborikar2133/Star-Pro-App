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
import Modal from "react-native-modal";

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

  const [allData, setAllData] = useState<Post[]>([]);
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://picsum.photos/v2/list");
        setAllData(res.data);
        setData(res.data.slice(0, BATCH_SIZE));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loadMore = () => {
    if (loading) return;
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
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
        <TouchableOpacity
          onPress={() => {
            setSelectedPost(item);
            toggleModal();
          }}
        >
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
          alignSelf: "center",
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

      {/* Caption */}
      <View
        style={{
          flexDirection: "row",
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

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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

      {/* Bottom Sheet Style Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: theme.card,
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("Report");
              toggleModal();
            }}
          >
            <Text
              style={{
                paddingVertical: 12,
                fontSize: hp(2),
                fontFamily: theme.starArenaFontSemiBold,
                color: theme.heading,
              }}
            >
              Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("Not Interested");
              toggleModal();
            }}
          >
            <Text
              style={{
                paddingVertical: 12,
                fontSize: hp(2),
                fontFamily: theme.starArenaFontSemiBold,
                color: theme.heading,
              }}
            >
              Not Interested
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("Add to Favorites");
              toggleModal();
            }}
          >
            <Text
              style={{
                paddingVertical: 12,
                fontSize: hp(2),
                fontFamily: theme.starArenaFontSemiBold,
                color: theme.heading,
              }}
            >
              Add to Favorites
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                paddingVertical: 12,
                fontSize: hp(2),
                fontFamily: theme.starArenaFont,
                textAlign: "center",
                color: theme.subheading,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostScreen;
