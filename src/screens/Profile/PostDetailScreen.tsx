import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';

interface Post {
  id: number;
  author: string;
  download_url: string;
}

const screenWidth = Dimensions.get('window').width;

// Static imports for icons to avoid dynamic require errors
const icons = {
  heart: require('../../../assets/Icon/Post/heart.png'),
  comment: require('../../../assets/Icon/Post/comment.png'),
  share: require('../../../assets/Icon/Post/share.png'),
};

const PostDetailScreen = () => {
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isListReady, setIsListReady] = useState(false);

  const route = useRoute();
  const {index, data} = route.params as {
    index: string;
    data: string;
  };

  const parsedIndex = Number(index);
  const parsedData: Post[] = JSON.parse(decodeURIComponent(data));

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

  const renderItem = ({item}: {item: Post}) => (
    <View
      style={[
        styles.card,
        {borderColor: theme.card, backgroundColor: theme.card},
      ]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.authorContainer, {backgroundColor: theme.card}]}>
          <Image
            source={require('../../../assets/person.png')}
            style={styles.avatar}
          />
          <View>
            <Text
              style={[
                styles.author,
                {color: theme.heading, fontFamily: theme.starArenaFontSemiBold},
              ]}>
              {item.author || 'Unknown Author'}
            </Text>
            <Text
              style={[
                styles.location,
                {color: theme.subheading, fontFamily: theme.starArenaFont},
              ]}>
              India
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/Icon/Post/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image
        source={{uri: item.download_url}}
        style={[styles.postImage, {width: screenWidth - wp(10)}]}
        resizeMode="contain"
      />

      {/* Footer */}
      <View style={[styles.footer, {backgroundColor: theme.card}]}>
        {(['heart', 'comment', 'share'] as const).map(
          (icon: 'heart' | 'comment' | 'share', idx) => (
            <View key={idx} style={styles.footerIcon}>
              <Image source={icons[icon]} style={styles.icon} />
              <Text
                style={[
                  styles.iconText,
                  {color: theme.heading, fontFamily: theme.starArenaFont},
                ]}>
                25
              </Text>
            </View>
          ),
        )}
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
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
      <View style={styles.timeContainer}>
        <Text
          style={[
            styles.timeText,
            {color: theme.subheading, fontFamily: theme.starArenaFont},
          ]}>
          12th May
        </Text>
      </View>
    </View>
  );

  return loading ? (
    <ActivityIndicator
      size="large"
      color={theme.heading}
      style={{marginTop: hp(10)}}
    />
  ) : (
    <>
      <OtherHeader title="Post" />
      <FlatList
        ref={flatListRef}
        data={postList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onLayout={onListLayout}
        getItemLayout={(_, index) => ({
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
  card: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: hp(3),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3.5),
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  avatar: {
    height: hp(5),
    width: wp(11),
    borderRadius: 30,
  },
  author: {
    fontSize: hp(2),
  },
  location: {
    fontSize: hp(1.5),
  },
  menuIcon: {
    height: hp(2),
    width: wp(5),
  },
  postImage: {
    height: hp(50),
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: hp(1),
    backgroundColor: 'black',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(0.5),
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(4),
    gap: 15,
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    height: hp(3),
    width: wp(7),
  },
  iconText: {
    fontSize: hp(2),
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  captionAuthor: {
    fontSize: hp(1.5),
  },
  captionText: {
    fontSize: hp(1.5),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(4),
  },
  timeText: {
    fontSize: hp(1.5),
  },
});
