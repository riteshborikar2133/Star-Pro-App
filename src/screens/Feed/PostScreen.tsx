import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  // Modal,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  RefreshControl,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../constant/ThemeContext';
import axios from 'axios';
import {useAuth} from '../../context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';
// import {TextInput} from 'react-native-gesture-handler';
// import Modal as RNModal from 'react-native-modal';
import Modal from 'react-native-modal';

interface Post {
  id: number;
  caption: string;
  imagePath: string;
  createdAt: string;
  user: {
    name: string;
    code: string;
  };
  likeCount: number;
  isLikedByUser: boolean;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  username: string;
  userId?: number;
  user?: any;
}

const screenWidth = Dimensions.get('window').width;
const BATCH_SIZE = 5;

const PostScreen = () => {
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();
  const {user, token} = useAuth();
  const [allData, setAllData] = useState<Post[]>([]);
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [imageHeights, setImageHeights] = useState<{[key: number]: number}>({});

  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [commentsByPostId, setCommentsByPostId] = useState<{
    [key: number]: Comment[];
  }>({});
  const [commentText, setCommentText] = useState('');
  const [commentPosting, setCommentPosting] = useState(false);

  const getLikeStatus = async (
    userCode: string,
    postId: number,
    token: string,
  ): Promise<boolean> => {
    try {
      const res = await fetch(
        `https://proxstream.online/auth/post/likesbyusercodeAndPostid?usercode=${userCode}&postid=${postId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `accessToken=${token}`,
          },
        },
      );
      const text = await res.text();
      return text.trim() === 'true';
    } catch (err) {
      console.warn(`❌ Failed to get like status for post ${postId}:`, err);
      return false;
    }
  };

  const fetchComments = async (postId: number, token: string) => {
    try {
      const response = await axios.get(
        'https://proxstream.online/auth/post/allCommentsBypost',
        {
          params: {postid: postId},
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `accessToken=${token}`,
          },
        },
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const openCommentsModal = async (postId: number) => {
    setSelectedPostId(postId);
    setCommentModalVisible(true);

    if (token) {
      const comments = await fetchComments(postId, token);
      setCommentsByPostId(prev => ({...prev, [postId]: comments}));
    }
  };

  const postComment = async (
    postId: number,
    content: string,
    token: string,
    userCode: string,
  ) => {
    try {
      setCommentPosting(true);
      const formData = new FormData();
      formData.append('usercode', userCode);
      formData.append('content', content);

      const response = await axios.post(
        `https://proxstream.online/auth/post/${postId}/comment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `accessToken=${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setCommentPosting(false);
      return response.data;
    } catch (error) {
      setCommentPosting(false);
      console.error('❌ Error posting comment:', error);
      return null;
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://proxstream.online/auth/post/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `accessToken=${token}`,
        },
      });

      console.log('22', res.data);
      const rawPosts: Post[] = res.data;

      const imageHeightsMap: {[key: number]: number} = {};

      const updatedPosts: Post[] = await Promise.all(
        rawPosts.map(async post => {
          const height = await new Promise<number>(resolve => {
            Image.getSize(
              post.imagePath,
              (w, h) => resolve((screenWidth - wp(10)) * (h / w)),
              () => resolve(hp(50)),
            );
          });

          imageHeightsMap[post.id] = height;

          const likeStatus = await getLikeStatus(
            user?.code || '',
            post.id,
            token || '',
          );

          return {
            ...post,
            isLikedByUser: likeStatus,
          };
        }),
      );

      setImageHeights(imageHeightsMap);
      setAllData(updatedPosts);
      setData(updatedPosts.slice(0, BATCH_SIZE));
      console.log({data});
      setPage(1);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, user?.code]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const loadMore = () => {
    if (loading) return;
    const nextPage = page + 1;
    const start = page * BATCH_SIZE;
    const batch = allData.slice(start, start + BATCH_SIZE);
    if (batch.length) {
      setData(prev => [...prev, ...batch]);
      setPage(nextPage);
    }
  };

  const toggleModal = (post: Post | null = null) => {
    setSelectedPost(post);
    setModalVisible(!isModalVisible);
  };

  const toggleLike = async (postId: number, userCode: string) => {
    // Find current post like state
    const currentPost = data.find(post => post.id === postId);
    if (!currentPost) return;

    const previousLikeStatus = currentPost.isLikedByUser;
    const previousLikeCount = currentPost.likeCount;

    // Optimistic update
    setData(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLikedByUser: !post.isLikedByUser,
              likeCount: post.isLikedByUser
                ? post.likeCount - 1
                : post.likeCount + 1,
            }
          : post,
      ),
    );

    const formData = new FormData();
    formData.append('usercode', userCode);

    try {
      const response = await fetch(
        `https://proxstream.online/auth/post/${postId}/like`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Cookie: `accessToken=${token}`,
          },
          body: formData,
        },
      );
      const text = await response.text();
      console.log('Like status response:', text);
    } catch (err) {
      console.error('Error liking post:', err);
      // Revert like if failed
      setData(prev =>
        prev.map(post =>
          post.id === postId
            ? {
                ...post,
                isLikedByUser: previousLikeStatus,
                likeCount: previousLikeCount,
              }
            : post,
        ),
      );
    }
  };

  const renderItem = ({item}: {item: Post}) => (
    <View style={[styles.card, {borderColor: '#D6D6D680'}]}>
      <View style={styles.header}>
        <View style={styles.authorContainer}>
          <Image
            source={require('../../../assets/person.png')}
            // style={styles.avatar}
            style={{height: wp(10), width: wp(10), borderRadius: 40}}
          />
          <View>
            <Text
              style={[
                styles.author,
                {color: theme.heading, fontFamily: theme.starArenaFont},
              ]}>
              {item.user.name || 'Unknown'}
            </Text>
            {/* <Text style={[styles.timeText, {color: theme.subheading}]}>
              {new Date(item.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text> */}
            <Text style={[styles.timeText, {color: theme.subheading}]}>
              {formatDateTime(item.createdAt)}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          {/* <Text style={{fontSize: hp(2), color: theme.subheading}}>•••</Text> */}
          <Image
            source={require('../../../assets/Icon/Post/follow.png')}
            style={{height: hp(3), width: hp(3)}}
          />
        </TouchableOpacity>
      </View>
      {/* caption */}
      <View style={{paddingHorizontal: wp(3), paddingBottom: hp(1.5)}}>
        <Text style={[styles.captionText, {color: theme.heading}]}>
          {item.caption}
        </Text>
      </View>
      <Image
        source={{uri: item.imagePath}}
        style={{width: screenWidth, height: imageHeights[item.id] || hp(50)}}
        resizeMode="cover"
      />

      <View style={styles.footer}>
        <FooterIcon
          icon={
            item.isLikedByUser
              ? require('../../../assets/Icon/Post/like.png')
              : require('../../../assets/Icon/Post/heart.png')
          }
          label={item.likeCount}
          onPress={() => toggleLike(item.id, item.user.code)}
        />
        <FooterIcon
          icon={require('../../../assets/Icon/Post/comment.png')}
          label={commentsByPostId[item.id]?.length || 0}
          onPress={() => openCommentsModal(item.id)}
        />
        <FooterIcon icon={require('../../../assets/Icon/share.png')} />
        <TouchableOpacity onPress={() => toggleModal(item)}>
          <Text style={{fontSize: hp(2.8), color: theme.subheading}}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.captionSection}>
        <Text style={[styles.captionAuthor, {color: theme.heading}]}>
          {item.user.name}
        </Text>
        <Text style={[styles.captionText, {color: theme.heading}]}>
          {item.caption}
        </Text>
      </View> */}

      {/* <Text style={[styles.timeText, {color: theme.subheading}]}>
        {new Date(item.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </Text> */}
    </View>
  );

  const FooterIcon = ({
    icon,
    label,
    onPress,
  }: {
    icon: any;
    label?: number;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.footerIcon} onPress={onPress}>
      <Image source={icon} style={{width: hp(3), height: hp(3)}} />
      {typeof label === 'number' && (
        <Text
          style={{
            color: theme.heading,
            fontWeight: '600',
            fontSize: hp(2),
            marginLeft: 5,
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );

  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;

    return `${day}${daySuffix} ${month} ${year}, ${formattedTime}`;
  }

  function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // 4th to 20th
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.background, paddingBottom: bottom},
      ]}>
      {loading && data.length === 0 ? (
        <ActivityIndicator size="large" color={theme.primary} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false} // 👈 Hide vertical scroll
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() =>
            loading && data.length > 0 ? (
              <ActivityIndicator size="small" color={theme.primary} />
            ) : null
          }
        />
      )}

      {/* Post Options Modal */}
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                {backgroundColor: theme.background, borderColor: theme.card},
              ]}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  // TODO: Implement Edit
                  alert('Edit clicked');
                  setModalVisible(false);
                }}>
                <Text style={[styles.modalButtonText, {color: theme.heading}]}>
                  Report
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  // TODO: Implement Delete
                  alert('Delete clicked');
                  setModalVisible(false);
                }}>
                <Text style={[styles.modalButtonText, {color: theme.heading}]}>
                  Delete
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText, {color: theme.heading}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Comments Modal */}
      <Modal
        isVisible={isCommentModalVisible}
        onBackdropPress={async () => {
          if (selectedPostId && token) {
            const updatedComments = await fetchComments(selectedPostId, token);
            setCommentsByPostId(prev => ({
              ...prev,
              [selectedPostId]: updatedComments,
            }));
          }
          setCommentModalVisible(false);
          setSelectedPostId(null);
        }}
        swipeDirection="down"
        onSwipeComplete={async () => {
          if (selectedPostId && token) {
            const updatedComments = await fetchComments(selectedPostId, token);
            setCommentsByPostId(prev => ({
              ...prev,
              [selectedPostId]: updatedComments,
            }));
          }
          setCommentModalVisible(false);
          setSelectedPostId(null);
        }}
        style={{margin: 0, justifyContent: 'flex-end'}}
        backdropOpacity={0.3}
        backdropColor="#000">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              height: hp(60),
              backgroundColor: theme.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
              zIndex: 9999,
              elevation: 10,
            }}>
            {/* Drag Handle */}
            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: 3,
                backgroundColor: '#ccc',
                alignSelf: 'center',
                marginVertical: 10,
              }}
            />

            {/* Header */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: hp(2),
                fontWeight: '600',
                color: theme.heading,
                marginBottom: hp(1),
              }}>
              Comments
            </Text>

            {/* Comments List */}
            <FlatList
              data={
                selectedPostId ? commentsByPostId[selectedPostId] || [] : []
              }
              keyExtractor={(_, i) => i.toString()}
              contentContainerStyle={{
                paddingHorizontal: wp(4),
                paddingBottom: hp(1),
              }}
              style={{flex: 1}}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
              renderItem={({item}) => (
                <View style={{marginBottom: hp(2)}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: theme.subheading,
                      fontSize: hp(1.6),
                    }}>
                    {item.username || 'User'}
                  </Text>
                  <Text
                    style={{
                      fontSize: hp(1.8),
                      color: theme.heading,
                    }}>
                    {item.content}
                  </Text>
                </View>
              )}
            />

            {/* Input Field */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(4),
                paddingVertical: hp(1),
                borderTopWidth: 1,
                borderTopColor: theme.card,
                backgroundColor: theme.background,
              }}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Add a comment..."
                placeholderTextColor={theme.subheading}
                style={{
                  flex: 1,
                  color: theme.heading,
                  fontSize: hp(1.8),
                  paddingVertical: hp(1),
                }}
              />
              <TouchableOpacity
                onPress={async () => {
                  if (selectedPostId && commentText.trim()) {
                    const trimmed = commentText.trim();

                    const newComment: Comment = {
                      id: Date.now(), // temporary
                      content: trimmed,
                      createdAt: new Date().toISOString(),
                      username: user?.name || 'You',
                      userId: user?.id || 0,
                      user: null,
                    };

                    // Optimistic update
                    setCommentsByPostId(prev => ({
                      ...prev,
                      [selectedPostId]: [
                        ...(prev[selectedPostId] || []),
                        newComment,
                      ],
                    }));

                    setCommentText('');

                    const result = await postComment(
                      selectedPostId,
                      trimmed,
                      token || '',
                      user?.code || '',
                    );

                    if (!result) {
                      console.warn('❌ Failed to post comment to server');
                    }
                  }
                }}>
                <Text
                  style={{
                    color: theme.primary,
                    fontWeight: '600',
                    fontSize: hp(2),
                    marginLeft: wp(2),
                  }}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 8,
    // borderRadius: 10,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'red',
  },
  author: {
    fontSize: hp(2),
    fontWeight: '600',
    marginLeft: 10,
  },
  avatar: {
    width: wp(8),
    height: hp(4),
    borderRadius: 10,
  },
  footer: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  captionSection: {
    paddingHorizontal: wp(3),
    marginTop: 5,
  },
  captionAuthor: {
    fontWeight: '600',
    fontSize: hp(2),
  },
  captionText: {
    fontSize: hp(1.8),
    marginTop: 2,
  },
  timeText: {
    paddingHorizontal: wp(3),
    // paddingBottom: hp(1),
    fontSize: hp(1.5),
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'flex-end',
    width: wp(100),
    position: 'absolute',
    left: -wp(5),
    height: hp(100),
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
  },
  modalButton: {
    paddingVertical: 15,
  },
  modalButtonText: {
    fontSize: hp(2),
    fontWeight: '600',
    textAlign: 'center',
  },
  commentModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  keyboardAvoidingView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: hp(90), // almost full screen
    width: '100%',
    alignSelf: 'center',
  },
  commentsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  commentsTitle: {
    fontSize: hp(3),
    fontWeight: '700',
    marginBottom: 15,
  },
  commentItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  commentUsername: {
    fontWeight: '600',
    fontSize: hp(1.7),
  },
  commentContent: {
    fontSize: hp(1.8),
  },
  commentTime: {
    fontSize: hp(1.3),
    fontWeight: '300',
    marginTop: 2,
  },
  commentInputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: hp(2),
    marginRight: 10,
  },
  postCommentButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});
