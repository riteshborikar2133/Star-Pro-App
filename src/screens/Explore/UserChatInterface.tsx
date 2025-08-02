import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  Keyboard,
} from 'react-native';
import {useTheme} from '../../constant/ThemeContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootNavigator';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

type ChatRouteProp = RouteProp<RootStackParamList, 'ChatInterface'>;

const STICKERS = [
  {id: 1, image: require('../../../assets/stickers/sticker1.png'), value: 100},
  {id: 2, image: require('../../../assets/stickers/sticker2.png'), value: 200},
  {id: 3, image: require('../../../assets/stickers/sticker3.png'), value: 300},
  {id: 4, image: require('../../../assets/stickers/sticker4.png'), value: 400},
];

const UserChatInterface = () => {
  const {theme} = useTheme();
  const {bottom} = useSafeAreaInsets();
  const route = useRoute<ChatRouteProp>();
  const navigation = useNavigation();
  const {username} = route.params;

  const [messages, setMessages] = useState([
    {id: '1', text: 'Hey there!', sender: 'them'},
    {id: '2', text: 'Hi! How are you?', sender: 'me'},
    {id: '3', text: 'Doing great! You?', sender: 'them'},
  ]);
  const [input, setInput] = useState('');
  const [showStickers, setShowStickers] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: String(messages.length + 1),
      text: input.trim(),
      sender: 'me',
    };

    setMessages(prev => [newMessage, ...prev]);
    setInput('');
    setShowStickers(false);
  };

  const sendSticker = (sticker: {id: number; image: any; value: number}) => {
    console.log(`Sticker sent with value: ${sticker.value}`);

    const newMessage = {
      id: String(messages.length + 1),
      sticker: sticker.image,
      value: sticker.value,
      sender: 'me',
    };

    setMessages(prev => [newMessage, ...prev]);
    setShowStickers(false);
    Keyboard.dismiss();
  };

  const renderMessage = ({item}: any) => {
    const isMe = item.sender === 'me';

    return (
      <View
        style={[
          styles.messageContainer,
          {justifyContent: isMe ? 'flex-end' : 'flex-start'},
        ]}>
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: item.sticker
                ? 'transparent'
                : isMe
                ? theme.accent1
                : '#444',
              borderRadius: item.sticker ? 0 : 12,
              alignSelf: isMe ? 'flex-end' : 'flex-start',
            },
          ]}>
          {item.sticker ? (
            <View>
              <Image source={item.sticker} style={{width: 100, height: 100}} />
              {item.value && (
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: 4,
                    fontFamily: theme.starArenaFont,
                  }}>
                  🪙 {item.value}
                </Text>
              )}
            </View>
          ) : (
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontFamily: theme.starArenaFont,
              }}>
              {item.text}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme.background, paddingBottom: bottom + 50},
      ]}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: theme.background}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/Icon/back.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: theme.primary,
            fontFamily: theme.starArenaFontSemiBold,
            fontSize: 16,
            marginLeft: 10,
          }}>
          @{username}
        </Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{padding: 16, paddingBottom: hp(10)}}
        inverted
      />

      {/* Sticker Picker */}
      {showStickers && (
        <View style={styles.stickerPanel}>
          {STICKERS.map((sticker, index) => (
            <TouchableOpacity key={index} onPress={() => sendSticker(sticker)}>
              <Image source={sticker.image} style={styles.sticker} />
              <Text style={styles.stickerValueText}>🪙{sticker.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={bottom}
        style={[styles.inputBarContainer, {paddingBottom: bottom + 10}]}>
        <View style={[styles.inputBar, {backgroundColor: '#222'}]}>
          {/* <TouchableOpacity onPress={() => setShowStickers(prev => !prev)}>
            <Image
              source={require('../../../assets/Icon/gift.png')}
              style={{width: 25, height: 25, marginRight: 10}}
            />
          </TouchableOpacity> */}

          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#888"
            style={[
              styles.input,
              {fontFamily: theme.starArenaFont, color: 'white'},
            ]}
          />

          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text
              style={{
                color: theme.accent1,
                fontWeight: 'bold',
                fontFamily: theme.starArenaFontSemiBold,
              }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserChatInterface;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 100,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '75%',
  },
  inputBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
  },
  sendButton: {
    marginLeft: 10,
  },
  stickerPanel: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sticker: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  stickerValueText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'System',
  },
});
