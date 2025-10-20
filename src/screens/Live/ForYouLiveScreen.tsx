import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import axios from 'axios';
import {useAuth} from '../../context/AuthContext';

const ForYouLiveScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const {theme} = useTheme();
  const route = useRoute();
  const {username} = route.params as {username: string};
  const {email} = route.params as {email: string};
  const {user, token} = useAuth();
  console.log(user);

  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const slideAnim = useRef(new Animated.Value(-wp(80))).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const animatedWidth = useRef(new Animated.Value(wp(13.8))).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //emoji
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [currentEmojiVideo, setCurrentEmojiVideo] = useState<{
    video: any;
    key: string;
  } | null>(null);

  const toggleEmojiPanel = () => {
    Keyboard.dismiss();
    setShowEmojiPanel(prev => !prev);
  };

  const emojis = [
    {
      emoji: '😊',
      value: 60,
      video: require('../../../assets/videos/smile.mp4'),
    },
    {
      emoji: '😂',
      value: 200,
      video: require('../../../assets/videos/fire.mp4'),
    },
    {
      emoji: '😍',
      value: 300,
      video: require('../../../assets/videos/smile.mp4'),
    },
    {
      emoji: '🔥',
      value: 500,
      video: require('../../../assets/videos/fire.mp4'),
    },
    {
      emoji: '🎉',
      value: 700,
      video: require('../../../assets/videos/smile.mp4'),
    },
  ];

  //emoji

  const collapse = () => {
    setIsExpanded(false);
    Animated.timing(animatedWidth, {
      toValue: wp(13.5),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const expandAndAutoCollapse = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      Animated.timing(animatedWidth, {
        toValue: wp(90),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      collapse();
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSend = useCallback(() => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, chatMessage.trim()]);
      setChatMessage('');
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  }, [chatMessage]);

  const sendCoins = async (coinValue: number) => {
    try {
      const senderEmail = user?.email;
      // const receiverEmail = 'ironbuster100@gmail.com';
      const apiUrl = `https://proxstream.online/auth/user/send-coin?receiveremail=${email}&coins=${coinValue}&senderemail=${senderEmail}`;

      const response = await axios.put(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ); // Use `.post()` if it's a POST request
      console.log('Coin sent successfully:', response.data);
    } catch (error) {
      console.error('Failed to send coins:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0
        }>
        <SafeAreaView style={[styles.container, {paddingBottom: bottom}]}>
          {/* 🔵 Top Bar with Animation */}
          <View style={[styles.topContainer, {gap: wp(0)}]}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', gap: wp(5)}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/person.png')}
                  style={{height: wp(13.5), width: wp(13.5), borderRadius: 50}}
                />
                <Text
                  style={{
                    backgroundColor: theme.accent1,
                    color: theme.heading,
                    padding: hp(0.6),
                    borderRadius: 50,
                    fontSize: hp(0.9),
                    position: 'relative',
                    top: -wp(2),
                    fontFamily: theme.starArenaFont,
                  }}>
                  25
                </Text>
              </View>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                      // fontSize: hp(0.9), // Uncomment if needed
                    }}>
                    {username}
                  </Text>
                  <Image
                    source={require('../../../assets/Icon/verify.png')}
                    style={{height: wp(5), width: wp(5), marginLeft: wp(1)}} // Add spacing if needed
                  />
                </View>
                <Text
                  style={{
                    // backgroundColor: theme.accent1,
                    color: theme.heading,
                    paddingVertical: hp(0.6),
                    fontFamily: theme.starArenaFont,
                    // borderRadius: 50,
                    fontSize: hp(1.4),
                  }}>
                  ID-PH122 | India
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../../assets/Icon/Post/follow.png')}
                  style={{height: hp(3.5), width: hp(3.5)}}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: wp(2)}}>
              <View style={{flexDirection: 'row', gap: wp(2)}}>
                <Image
                  source={require('../../../assets/Icon/profile/diamond.png')}
                  style={{height: hp(2), width: hp(2)}}
                />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    // fontSize: hp(0.9), // Uncomment if needed
                  }}>
                  25M
                </Text>
              </View>
              <View
                style={{
                  // height: hp(1),
                  width: hp(0.1),
                  backgroundColor: 'white',
                }}
              />
              <View style={{flexDirection: 'row', gap: wp(2)}}>
                <Image
                  source={require('../../../assets/Icon/StarFill.png')}
                  style={{height: hp(2), width: hp(2)}}
                />
                <Image
                  source={require('../../../assets/Icon/StarFill.png')}
                  style={{height: hp(2), width: hp(2)}}
                />
                <Image
                  source={require('../../../assets/Icon/StarFill.png')}
                  style={{height: hp(2), width: hp(2)}}
                />
                <Image
                  source={require('../../../assets/Icon/Star.png')}
                  style={{height: hp(2), width: hp(2)}}
                />
                <Image
                  source={require('../../../assets/Icon/Star.png')}
                  style={{height: hp(2), width: hp(2)}}
                />
              </View>
              <View
                style={{
                  // height: hp(1),
                  width: hp(0.1),
                  backgroundColor: 'white',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: wp(2),
                }}>
                <Image
                  source={require('../../../assets/Icon/Eye.png')}
                  style={{height: hp(1.5), width: hp(2.5)}}
                />
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                    // fontSize: hp(0.9), // Uncomment if needed
                  }}>
                  50
                </Text>
              </View>
            </View>
          </View>

          {currentEmojiVideo && (
            <View style={styles.videoOverlay}>
              <Video
                key={currentEmojiVideo.key}
                source={currentEmojiVideo.video}
                style={styles.fullScreenVideo}
                resizeMode="cover"
                onEnd={() => setCurrentEmojiVideo(null)}
                muted={false}
                repeat={false}
                controls={false}
                paused={false}
              />
            </View>
          )}

          {/* 🔴 Live Stream + Overlays */}
          <View style={{flex: 1, position: 'relative'}}>
            <View style={styles.LiveScreenContainer} />

            {/* Chat messages */}
            <View style={styles.chatMessagesBox}>
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                  paddingBottom: hp(1),
                }}
                showsVerticalScrollIndicator={false}>
                {chatMessages.slice(-10).map((msg, index) => {
                  // Check if message is an emoji type
                  const emojiMatch = msg.match(/^\[emoji:(.+)\]$/);

                  if (emojiMatch) {
                    const emojiChar = emojiMatch[1];
                    return (
                      <Text key={index} style={styles.chatEmoji}>
                        {emojiChar}
                      </Text>
                    );
                  }

                  // Otherwise, treat as regular message
                  return (
                    <Text key={index} style={styles.chatText}>
                      {msg}
                    </Text>
                  );
                })}
              </ScrollView>
            </View>

            {/* 🟡 Bottom Controls overlapping live screen */}
            <View style={styles.bottomControls}>
              {/* gift box */}
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleEmojiPanel}>
                <Image
                  source={require('../../../assets/Icon/Chat/newgift.png')}
                  style={styles.controlIcon}
                />
              </TouchableOpacity>

              {showEmojiPanel && (
                <View style={styles.emojiPanel}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {emojis.map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.emojiItem}
                        onPress={() => {
                          setChatMessages(prev => [
                            ...prev,
                            `[emoji:${item.emoji}]`,
                          ]);
                          setCurrentEmojiVideo({
                            video: item.video,
                            key: `${item.emoji}-${Date.now()}`,
                          });
                          setShowEmojiPanel(false);
                          sendCoins(item.value); // 👈 Send coin API call here
                        }}>
                        <Text style={styles.emoji}>{item.emoji}</Text>
                        <Text style={styles.coinText}>{item.value}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* <TouchableOpacity style={styles.controlButton}>
                <Image
                  source={require('../../../assets/Icon/Chat/mic.png')}
                  style={styles.controlIcon}
                />
              </TouchableOpacity> */}

              {/* Chat Input */}
              <View style={styles.chatContainer}>
                <TextInput
                  value={chatMessage}
                  onChangeText={setChatMessage}
                  placeholder="Say something..."
                  placeholderTextColor="#ccc"
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  style={styles.sendButton}>
                  <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ForYouLiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topContainer: {
    position: 'absolute',
    // height: wp(15),
    width: wp(100),
    zIndex: 3,
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(2),
  },
  LiveScreenContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    height: hp(100),
  },
  chatMessagesBox: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingTop: hp(2),
    position: 'absolute',
    zIndex: 2,
    bottom: hp(8),
  },
  chatText: {
    color: '#fff',
    fontSize: hp(1.6),
    backgroundColor: 'rgba(40, 40, 40, 0.4)',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 8,
    marginBottom: hp(0.5),
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: '#111',
    gap: wp(3),

    // Positioning to overlap live screen
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlButton: {
    padding: wp(2),
  },
  controlIcon: {
    height: wp(7),
    width: wp(7),
    // tintColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: Platform.OS === 'ios' ? hp(1.2) : 0,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: hp(1.8),
  },
  sendButton: {
    paddingLeft: wp(3),
  },
  sendText: {
    color: '#4FC3F7',
    fontWeight: 'bold',
  },

  emojiPanel: {
    position: 'absolute',
    bottom: hp(8),
    left: 0,
    right: 0,
    backgroundColor: '#1e1e1e',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
  },

  emojiItem: {
    alignItems: 'center',
    marginRight: wp(5),
  },

  emoji: {
    fontSize: wp(7),
  },

  coinText: {
    color: '#FFD700',
    fontSize: hp(1.5),
    fontWeight: 'bold',
    marginTop: hp(0.5),
  },

  chatEmoji: {
    fontSize: wp(8),
    marginBottom: hp(0.5),
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
});
