import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../constant/ThemeContext';
import OtherHeader from '../../components/OtherHeader';
import {useAuth} from '../../context/AuthContext';
import Modal from 'react-native-modal';
import axios from 'axios';

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
  comments?: Comment[];
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  username: string;
  userId: number;
  user: any; // You can replace `any` with a proper type if needed
}

const screenWidth = Dimensions.get('window').width;

const icons = {
  heart: require('../../../assets/Icon/Post/heart.png'),
  heartFilled: require('../../../assets/Icon/Post/like.png'),
  comment: require('../../../assets/Icon/Post/comment.png'),
  share: require('../../../assets/Icon/share.png'),
};

const getLikeStatus = async (
  userCode: string,
  postId: number,
  token: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://proxstream.online/auth/post/likesbyusercodeAndPostid?usercode=${userCode}&postid=${postId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `accessToken=${token}`,
        },
      },
    );

    if (!response.ok) {
      console.warn(`Failed to fetch like status for post ${postId}`);
      return false;
    }

    const text = await response.text();
    return text.trim() === 'true';
  } catch (error) {
    console.error('Error fetching like status:', error);
    return false;
  }
};

// New function to fetch all comments for a post
const fetchComments = async (
  postId: number,
  token: string,
): Promise<Comment[]> => {
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
    // axios puts response data in response.data
    return response.data || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

const PostDetailScreen = () => {
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();
  const {user, token} = useAuth();
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [commentsByPostId, setCommentsByPostId] = useState<{
    [key: number]: Comment[];
  }>({});
  const [commentText, setCommentText] = useState('');

  const flatListRef = useRef<FlatList>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isListReady, setIsListReady] = useState(false);
  const [imageHeights, setImageHeights] = useState<{[key: number]: number}>({});

  const route = useRoute();
  const {index, data} = route.params as {
    index: string;
    data: string;
  };
  const parsedIndex = Number(index);
  const parsedData: Post[] = JSON.parse(decodeURIComponent(data));

  const toggleLike = async (postId: number, userCode: string) => {
    setPostList(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLikedByUser;
          const newLikeCount = isLiked
            ? post.likeCount + 1
            : post.likeCount - 1;
          return {
            ...post,
            isLikedByUser: isLiked,
            likeCount: newLikeCount,
          };
        }
        return post;
      }),
    );

    const formData = new FormData();
    formData.append('usercode', user?.code || '');

    try {
      const res = await fetch(
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

      const text = await res.text();
      console.log('✅ Like toggled successfully:', text);
    } catch (error) {
      console.error('Error toggling like:', error);
      setPostList(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const isLiked = post.isLikedByUser;
            const newLikeCount = isLiked
              ? post.likeCount - 1
              : post.likeCount + 1;
            return {
              ...post,
              isLikedByUser: !isLiked,
              likeCount: newLikeCount,
            };
          }
          return post;
        }),
      );
    }
  };

  useEffect(() => {
    const initializePosts = async () => {
      if (parsedData.length && user?.code && token) {
        setLoading(true);

        const updatedPosts: Post[] = await Promise.all(
          parsedData.map(async post => {
            let isLiked = false;

            try {
              isLiked = await getLikeStatus(user.code, post.id, token);
            } catch (e) {
              console.error('Like status check failed for post:', post.id);
            }

            Image.getSize(
              post.imagePath,
              (width, height) => {
                const displayWidth = screenWidth;
                const displayHeight = (height / width) * displayWidth;

                setImageHeights(prev => ({
                  ...prev,
                  [post.id]: displayHeight,
                }));
              },
              error => {
                console.warn(`Failed to get size for image ${post.id}:`, error);
                setImageHeights(prev => ({
                  ...prev,
                  [post.id]: hp(50),
                }));
              },
            );

            return {
              ...post,
              isLikedByUser: isLiked,
            };
          }),
        );

        setPostList(updatedPosts);
        setLoading(false);
      }
    };

    initializePosts();
  }, []);

  // When opening comments modal, fetch comments for selected post
  const openCommentsModal = async (post: Post) => {
    setSelectedPostId(post.id);
    setCommentModalVisible(true);

    if (token) {
      const comments = await fetchComments(post.id, token);
      setCommentsByPostId(prev => ({...prev, [post.id]: comments}));
    }
  };

  const onListLayout = () => {
    if (flatListRef.current && !loading && !isListReady) {
      flatListRef.current.scrollToIndex({
        index: parsedIndex,
        animated: false,
      });
      setIsListReady(true);
    }
  };

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (post: Post | null = null) => {
    setSelectedPost(post);
    setModalVisible(!isModalVisible);
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isCommentModalVisible) {
          setCommentModalVisible(false);
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [isCommentModalVisible]),
  );

  const postCommentToAPI = async (
    postId: number,
    content: string,
    token: string,
    userCode: string,
  ) => {
    try {
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
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('❌ Error posting comment:', error);
      return null;
    }
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={theme.heading} />
    </View>
  ) : (
    <>
      <OtherHeader title="Post" />
      <FlatList
        ref={flatListRef}
        data={postList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onLayout={onListLayout}
        getItemLayout={(_, index) => {
          const height = imageHeights[postList[index]?.id] ?? hp(80);
          return {
            length: height,
            offset: height * index,
            index,
          };
        }}
        contentContainerStyle={{
          paddingTop: hp(2),
          paddingBottom: bottom + 60,
          backgroundColor: theme.background,
        }}
        showsVerticalScrollIndicator={false}
      />

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
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  // TODO: Implement Delete
                  alert('Delete clicked');
                  setModalVisible(false);
                }}>
                <Text style={[styles.modalButtonText, {color: theme.heading}]}>
                  Delete
                </Text>
              </TouchableOpacity>
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

      {/* comment model */}
      <Modal
        isVisible={isCommentModalVisible}
        onBackdropPress={async () => {
          if (selectedPostId && token) {
            const updatedComments = await fetchComments(selectedPostId, token);

            setCommentsByPostId(prev => ({
              ...prev,
              [selectedPostId]: updatedComments,
            }));

            setPostList(prev =>
              prev.map(post =>
                post.id === selectedPostId
                  ? {...post, comments: updatedComments}
                  : post,
              ),
            );
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

            setPostList(prev =>
              prev.map(post =>
                post.id === selectedPostId
                  ? {...post, comments: updatedComments}
                  : post,
              ),
            );
          }

          setCommentModalVisible(false);
          setSelectedPostId(null);
        }}
        style={{margin: 0, justifyContent: 'flex-end'}}
        backdropOpacity={0.3}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{justifyContent: 'flex-end'}}>
          <View
            style={{
              height: hp(60), // fixed height
              backgroundColor: theme.background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden',
            }}>
            {/* Drag handle */}
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
                fontFamily: theme.starArenaFontSemiBold,
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
              style={{flex: 1}} // takes all available space between header and input
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
              renderItem={({item}) => (
                <View style={{marginBottom: hp(2)}}>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFontSemiBold,
                      color: theme.subheading,
                      fontSize: hp(1.6),
                    }}>
                    {item.username || 'User'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.heading,
                      fontSize: hp(1.8),
                    }}>
                    {item.content || ''}
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
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(1.8),
                  paddingVertical: hp(1),
                }}
              />
              <TouchableOpacity
                onPress={async () => {
                  if (selectedPostId && commentText.trim()) {
                    const trimmed = commentText.trim();

                    const newComment: Comment = {
                      id: Date.now(), // temporary local ID
                      content: trimmed,
                      createdAt: new Date().toISOString(),
                      username: user?.name || 'You',
                      userId: user?.id || 0,
                      user: null,
                    };

                    // Optimistically update UI
                    setCommentsByPostId(prev => ({
                      ...prev,
                      [selectedPostId]: [
                        ...(prev[selectedPostId] || []),
                        newComment,
                      ],
                    }));

                    setCommentText('');

                    const result = await postCommentToAPI(
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
                    fontFamily: theme.starArenaFontSemiBold,
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
    </>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    marginBottom: hp(1),
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
    alignSelf: 'center',
    marginBottom: hp(1),
    backgroundColor: 'black',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    gap: 20,
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    height: hp(3),
    width: hp(3),
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: hp(1.7),
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.5),
    marginBottom: hp(1),
    gap: 5,
  },
  captionAuthor: {
    fontSize: hp(1.8),
  },
  captionText: {
    fontSize: hp(1.8),
  },
  timeContainer: {
    paddingHorizontal: wp(3.5),
    marginBottom: hp(1),
  },
  timeText: {
    fontSize: hp(1.5),
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
});
