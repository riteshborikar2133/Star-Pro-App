import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
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
  const {bottom} = useSafeAreaInsets();

  const [allData, setAllData] = useState<Post[]>([]);
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [imageHeights, setImageHeights] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://picsum.photos/v2/list');
        const posts: Post[] = res.data;

        const heightMap: {[key: number]: number} = {};
        await Promise.all(
          posts.map(
            post =>
              new Promise<void>((resolve, reject) => {
                Image.getSize(
                  post.download_url,
                  (width, height) => {
                    const scaledHeight =
                      (screenWidth - wp(10)) * (height / width);
                    heightMap[post.id] = scaledHeight;
                    resolve();
                  },
                  error => {
                    console.warn(
                      `Failed to get image size for ${post.download_url}`,
                      error,
                    );
                    heightMap[post.id] = hp(50); // fallback height
                    resolve();
                  },
                );
              }),
          ),
        );

        setAllData(posts);
        setData(posts.slice(0, BATCH_SIZE));
        setImageHeights(heightMap);
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

  const toggleModal = (post: Post | null = null) => {
    setSelectedPost(post);
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({item}: {item: Post}) => (
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
        <TouchableOpacity onPress={() => toggleModal(item)}>
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
          height: imageHeights[item.id] || hp(50), // fallback height
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
    <View style={{flex: 1, backgroundColor: theme.background}}>
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

      {/* Bottom Sheet Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => toggleModal()}>
        <TouchableWithoutFeedback onPress={() => toggleModal()}>
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheet}>
              <Text style={styles.modalTitle}>Report</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleModal();
                  console.log('Report Profile:', selectedPost?.author);
                }}>
                <Text style={styles.modalText}>Report Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleModal();
                  console.log('Report Post ID:', selectedPost?.id);
                }}>
                <Text style={styles.modalText}>Report Post</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleModal()}>
                <Text style={[styles.modalText, {color: 'red'}]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
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
    fontSize: hp(1.5),
  },
  captionText: {
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
    fontSize: hp(1.5),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: hp(2.2),
    fontWeight: '600',
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: hp(1.5),
  },
  modalText: {
    fontSize: hp(2),
  },
});

export default PostScreen;
