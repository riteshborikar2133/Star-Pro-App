import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../constant/ThemeContext';
import axios from 'axios';

interface Post {
  id: number;
  author: string;
  download_url: string;
}

const screenWidth = Dimensions.get('window').width;
const BATCH_SIZE = 5;

const PostScreen = () => {
  const {theme} = useTheme();
  const {bottom, top} = useSafeAreaInsets();

  const [allData, setAllData] = useState<Post[]>([]);
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://picsum.photos/v2/list');
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

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    const nextPage = page + 1;
    const start = page * BATCH_SIZE;
    const end = start + BATCH_SIZE;
    const nextBatch = allData.slice(start, end);
    if (nextBatch.length > 0) {
      setData(prev => [...prev, ...nextBatch]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  const renderItem = ({item}: {item: Post}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.card,
          borderRadius: 10,
          marginBottom: hp(3),
          overflow: 'hidden',
          backgroundColor: theme.card,
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: hp(1.5),
            paddingHorizontal: wp(3.5),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
            <Image
              source={require('../../../assets/person.png')}
              style={{height: hp(5), width: wp(11), borderRadius: 30}}
            />
            <View>
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFontSemiBold,
                }}>
                {item.author || 'Unknown Author'}
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}>
                India
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/Icon/Post/menu.png')}
              style={{height: hp(2), width: wp(5)}}
            />
          </TouchableOpacity>
        </View>

        {/* Post Image */}
        <Image
          source={{uri: item.download_url}}
          style={{
            width: screenWidth - wp(10),
            height: hp(50),
            alignSelf: 'center',
            borderRadius: 10,
            marginBottom: hp(1),
            backgroundColor: 'black',
          }}
          resizeMode="contain"
        />

        {/* Footer Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: hp(0.5),
            paddingBottom: hp(1.5),
            paddingHorizontal: wp(4),
            backgroundColor: theme.card,
            gap: 15,
          }}>
          <FooterIcon
            label="25"
            icon={require('../../../assets/Icon/Post/heart.png')}
          />
          <FooterIcon
            label="25"
            icon={require('../../../assets/Icon/Post/comment.png')}
          />
          <FooterIcon
            label="25"
            icon={require('../../../assets/Icon/Post/share.png')}
          />
        </View>

        {/* Caption */}
        <View style={styles.captionSection}>
          <Text
            style={[
              styles.captionAuthor,
              {fontFamily: theme.starArenaFontSemiBold, color: theme.heading},
            ]}>
            {item.author}
          </Text>
          <Text
            style={[
              styles.captionText,
              {fontFamily: theme.starArenaFont, color: theme.heading},
            ]}>
            Daily Stop!
          </Text>
        </View>

        {/* Time */}
        <View style={styles.timeSection}>
          <Text
            style={[
              styles.timeText,
              {fontFamily: theme.starArenaFont, color: theme.subheading},
            ]}>
            12th May
          </Text>
        </View>
      </View>
    );
  };

  const FooterIcon = ({label, icon}: {label: string; icon: any}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
      <Image source={icon} style={{height: hp(3), width: wp(7)}} />
      <Text
        style={{
          color: theme.heading,
          fontSize: hp(2),
          fontFamily: theme.starArenaFont,
        }}>
        {label}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingHorizontal: wp(3),
          paddingBottom: bottom + 60,
          paddingTop: hp(2),
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color={theme.heading} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  captionSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  captionAuthor: {
    // fontFamily: theme.starArenaFontSemiBold,
    // color: theme.heading,
    fontSize: hp(1.5),
  },
  captionText: {
    // fontFamily: theme.starArenaFont,
    // color: theme.heading,
    fontSize: hp(1.5),
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(4),
    paddingBottom: hp(1.5),
  },
  timeText: {
    // fontFamily: theme.starArenaFont,
    // color: theme.subheading,
    fontSize: hp(1.5),
  },
});

export default PostScreen;
