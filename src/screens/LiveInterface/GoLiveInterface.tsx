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

const GoLiveInterface = () => {
  const {bottom} = useSafeAreaInsets();
  const {theme} = useTheme();
  const route = useRoute();
  const {username} = route.params as {username: string};

  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const slideAnim = useRef(new Animated.Value(-wp(80))).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const animatedWidth = useRef(new Animated.Value(wp(20.5))).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const collapse = () => {
    Animated.timing(animatedWidth, {
      toValue: wp(20.5),
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Only update state after animation completes
      setIsExpanded(false);
    });
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
          <Animated.View
            style={[
              styles.topContainer,
              {
                backgroundColor: isExpanded ? '#ffffff' : 'transparent',
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                height: wp(13.5),
                margin: wp(5),
                width: animatedWidth,
                overflow: 'hidden',
              },
            ]}>
            {/* Profile Pic - Always Visible */}
            <TouchableOpacity
              onPressIn={expandAndAutoCollapse}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/person.png')}
                style={{height: wp(13.5), width: wp(13.5), borderRadius: 50}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: hp(3),
                  width: hp(3),
                  // padding: wp(2),
                  borderWidth: 1,
                  borderColor: theme.subheading,
                  borderRadius: 40,
                }}>
                <Text
                  style={{
                    color: isExpanded ? 'black' : theme.heading,
                    fontSize: hp(1),
                  }}>
                  14
                </Text>
              </View>
            </TouchableOpacity>

            {/* Expanded Info */}
            {isExpanded && (
              <>
                <View
                  style={{
                    flex: 1,
                    marginLeft: wp(3),
                  }}>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      fontSize: hp(1.6),
                      color: '#000000',
                      textAlign: 'center',
                    }}>
                    {username || 'user'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: wp(5),
                      justifyContent: 'center',
                      margin: hp(0.5),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../../assets/Icon/diamond.png')}
                        style={{height: wp(4), width: wp(4)}}
                      />
                      <Text
                        style={{
                          fontFamily: theme.starArenaFont,
                          fontSize: hp(1.4),
                          color: '#000000',
                        }}>
                        1000
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../../assets/Icon/blueStar.png')}
                        style={{height: wp(3.5), width: wp(3.5)}}
                      />
                      <Image
                        source={require('../../../assets/Icon/blueStar.png')}
                        style={{height: wp(3.5), width: wp(3.5)}}
                      />
                      <Image
                        source={require('../../../assets/Icon/blueStar.png')}
                        style={{height: wp(3.5), width: wp(3.5)}}
                      />
                      <Image
                        source={require('../../../assets/Icon/Star.png')}
                        style={{height: wp(3.5), width: wp(3.5)}}
                      />
                      <Image
                        source={require('../../../assets/Icon/Star.png')}
                        style={{height: wp(3.5), width: wp(3.5)}}
                      />
                    </View>
                  </View>
                </View>

                {/* Verify Icon */}
                <Image
                  source={require('../../../assets/Icon/verify.png')}
                  style={{
                    height: wp(13),
                    width: wp(13),
                    marginLeft: wp(2),
                  }}
                />
              </>
            )}
          </Animated.View>
          <View
            style={{
              position: 'absolute',
              // width: wp(85),
              marginVertical: wp(4),
              marginHorizontal: wp(9),
              top: hp(8),
              // borderWidth: 1,
              // borderColor: 'red',
              // flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assets/Icon/Eye.png')}
                style={{height: wp(3.5), width: wp(5.5)}}
              />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(1.3),
                }}>
                500
              </Text>
            </View>
            {/* <View>
              <Image
                source={require('../../../assets/Icon/Eye.png')}
                style={{height: wp(3.5), width: wp(5.5)}}
              />
            </View> */}
          </View>

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
                {chatMessages.slice(-10).map((msg, index) => (
                  <Text key={index} style={styles.chatText}>
                    {msg}
                  </Text>
                ))}
              </ScrollView>
            </View>

            {/* 🟡 Bottom Controls overlapping live screen */}
            <View style={styles.bottomControls}>
              {/* Chat Input */}
              <View style={styles.chatContainer}>
                <TextInput
                  value={chatMessage}
                  onChangeText={setChatMessage}
                  placeholder="Say something..."
                  placeholderTextColor="#ccc"
                  style={styles.input}
                />
                {/* <TouchableOpacity
                  onPress={handleSend}
                  style={styles.sendButton}>
                  <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={handleSend}
                  style={[styles.controlButton]}>
                  <Image
                    source={require('../../../assets/Icon/Chat/send.png')}
                    style={styles.controlIcon}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.controlButton}>
                <Image
                  source={require('../../../assets/Icon/menu.png')}
                  style={[{height: wp(5), width: wp(1)}]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.controlButton,
                  {backgroundColor: '#3a3a3aff', borderRadius: 50},
                ]}>
                <Image
                  source={require('../../../assets/Icon/Chat/camera.png')}
                  style={styles.controlIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.controlButton,
                  {backgroundColor: '#3a3a3aff', borderRadius: 50},
                ]}>
                <Image
                  source={require('../../../assets/Icon/Chat/mic.png')}
                  style={styles.controlIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default GoLiveInterface;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topContainer: {
    position: 'absolute',
    height: wp(15),
    zIndex: 3,
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
    height: wp(6),
    width: wp(6),
    tintColor: '#fff',
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
});
