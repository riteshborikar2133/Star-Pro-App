import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTheme } from "../constants/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";

type MomentScreenProps = {
  setPostCount: (count: number) => void;
};

const MomentScreen: React.FC<MomentScreenProps> = ({ setPostCount }) => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://picsum.photos/v2/list?page=1&limit=50"
        );
        setData(res.data);
        setPostCount(res.data.length);
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handlePostClick = (index: number) => {
    if (isNavigating) return;
    setIsNavigating(true);

    router.push({
      pathname: "/explore/PostDetailScreen",
      params: {
        index: index.toString(),
        data: encodeURIComponent(JSON.stringify(data)),
      },
    });

    // Reset navigation flag after delay
    setTimeout(() => setIsNavigating(false), 1000);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePostClick(index)}
    >
      <Image
        source={{ uri: item.download_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardFooter}>
        <Image
          source={require("../assets/Icon/like.png")}
          style={styles.likeIcon}
        />
        <Text style={[styles.likeText, { fontFamily: theme.starArenaFont }]}>
          {item.height}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.heading} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={3}
      contentContainerStyle={{
        paddingHorizontal: wp(1),
        paddingTop: hp(2),
        paddingBottom: bottom + 60,
        backgroundColor: theme.background,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MomentScreen;

const styles = StyleSheet.create({
  card: {
    width: "32%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: wp(1),
    marginBottom: hp(1),
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    height: "85%",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardFooter: {
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 4,
  },
  likeIcon: {
    height: 15,
    width: 15,
  },
  likeText: {
    fontSize: 12,
    marginTop: 2,
  },
});
