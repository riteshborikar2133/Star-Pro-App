import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ReactNativeModal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useTheme} from '../../constant/ThemeContext';

interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatInterface = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {username} = route.params as {username: string};

  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isMoreModalVisible, setMoreModalVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages(prev => [
        ...prev,
        {id: Date.now(), text: inputText, sender: 'me'},
      ]);
      setInputText('');
    }
  };

  const handleCamera = () => {
    console.log('Camera feature placeholder');
    setMoreModalVisible(false);
  };

  const handleGallery = () => {
    console.log('Gallery feature placeholder');
    setMoreModalVisible(false);
  };

  const handleVoice = () => {
    console.log('Voice feature coming soon!');
    setMoreModalVisible(false);
  };

  const renderItem = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'me' ? styles.sentMessage : styles.receivedMessage,
      ]}>
      <Text
        style={{
          color: theme.heading,
          fontFamily: theme.starArenaFont,
          fontSize: hp(1.7),
        }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1}}>
          <View style={[styles.header, {backgroundColor: theme.background}]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={require('../../../assets/Icon/back.png')}
                style={styles.logo}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                {
                  color: theme.primary,
                  fontFamily: theme.starArenaFontSemiBold,
                },
              ]}>
              {username}
            </Text>
          </View>

          <View style={[styles.container, {backgroundColor: theme.card}]}>
            {messages.length === 0 ? (
              <View style={[styles.chatCont, {flex: 1}]}>
                <View style={{alignItems: 'center', gap: hp(2)}}>
                  <Image
                    source={require('../../../assets/person.png')}
                    style={{height: hp(5), width: wp(12), borderRadius: 15}}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                      fontSize: hp(1.7),
                    }}>
                    {username}
                  </Text>
                </View>
              </View>
            ) : (
              <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: messages.length === 0 ? 'center' : 'flex-start',
                  paddingBottom: hp(10) + bottom,
                }}
              />
            )}

            <View
              style={{
                height: hp(10),
                backgroundColor: theme.background,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(3),
                gap: wp(2),
                paddingBottom: keyboardVisible ? hp(4) + bottom : bottom,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: 25,
                  paddingHorizontal: wp(4),
                }}>
                <TextInput
                  placeholder="Message..."
                  placeholderTextColor="#999"
                  value={inputText}
                  onChangeText={setInputText}
                  style={{
                    color: '#000',
                    fontSize: hp(1.7),
                    fontFamily: theme.starArenaFont,
                  }}
                />
              </View>

              <TouchableOpacity onPress={() => setMoreModalVisible(true)}>
                <Image
                  source={require('../../../assets/Icon/Chat/more1.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSendMessage}>
                <Image
                  source={require('../../../assets/Icon/Chat/send.png')}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>

            <ReactNativeModal
              isVisible={isMoreModalVisible}
              onBackdropPress={() => setMoreModalVisible(false)}
              style={{justifyContent: 'flex-end', margin: 0}}
              avoidKeyboard>
              <View
                style={{
                  backgroundColor: theme.card,
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text
                  style={{
                    fontFamily: theme.starArenaFontSemiBold,
                    fontSize: hp(2),
                    marginBottom: hp(2),
                    color: theme.heading,
                    textAlign: 'center',
                  }}>
                  More Options
                </Text>

                <View style={styles.gridContainer}>
                  <TouchableOpacity style={styles.card} onPress={handleCamera}>
                    <Image
                      source={require('../../../assets/Icon/Chat/camera.png')}
                    />
                    <Text style={styles.cardLabel}>Camera</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.card} onPress={handleGallery}>
                    <Image
                      source={require('../../../assets/Icon/Chat/camera.png')}
                    />
                    <Text style={styles.cardLabel}>Gallery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.card} onPress={handleVoice}>
                    <Image
                      source={require('../../../assets/Icon/Chat/mic.png')}
                    />
                    <Text style={styles.cardLabel}>Voice</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => setMoreModalVisible(false)}>
                  <Text
                    style={{
                      color: theme.subheading,
                      textAlign: 'center',
                      marginTop: hp(2),
                      fontFamily: theme.starArenaFont,
                      fontSize: hp(1.7),
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </ReactNativeModal>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatInterface;

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    width: 40,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontFamily: 'starArenaFont',
    marginRight: 20,
  },
  container: {
    flex: 1,
  },
  chatCont: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  messageContainer: {
    padding: wp(2),
    marginVertical: hp(0.51),
    borderRadius: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginHorizontal: wp(2),
  },
  sentMessage: {
    backgroundColor: '#c54b8c',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    width: wp(25),
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  cardLabel: {
    marginTop: hp(1),
    fontSize: hp(1.6),
    fontFamily: 'starArenaFont',
    color: 'white',
  },
});
