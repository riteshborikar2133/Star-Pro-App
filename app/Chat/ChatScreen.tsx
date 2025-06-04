import React, { useState, useEffect } from "react";
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
  FlatList, // Used to render messages
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Define the Message type
interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatScreen = () => {
  const { username } = useLocalSearchParams();
  const { theme } = useTheme();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  // State to store messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(""); // To hold the current text input

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: inputText, sender: "me" },
      ]);
      setInputText(""); // Clear the input after sending
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text
        style={{
          color: theme.heading,
          fontFamily: theme.starArenaFont,
          fontSize: hp(1.7),
        }}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : "padding"} // Use `height` for iOS and `padding` for Android
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View style={[styles.header, { backgroundColor: theme.background }]}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Image
                source={require("../../assets/Icon/back.png")}
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
              ]}
            >
              {username}
            </Text>
          </View>

          <View style={[styles.container, { backgroundColor: theme.card }]}>
            {/* Conditional rendering based on message length */}
            {messages.length === 0 ? (
              <View
                style={[
                  styles.chatCont,
                  { flex: 1, backgroundColor: theme.card },
                ]}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: hp(2),
                  }}
                >
                  <Image
                    source={require("../../assets/person.png")}
                    style={{ height: hp(5), width: wp(12), borderRadius: 15 }}
                  />
                  <Text
                    style={{
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                      fontSize: hp(1.7),
                    }}
                  >
                    {username}
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.subheading,
                    borderRadius: 10,
                    marginVertical: hp(1),
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: theme.subheading,
                      fontFamily: theme.starArenaFont,
                      fontSize: hp(1.3),
                      paddingHorizontal: wp(2),
                      marginVertical: hp(0.5),
                    }}
                  >
                    Send Gift
                  </Text>
                  <Image
                    source={require("../../assets/Icon/Settings/coin.png")}
                  />
                  <Text
                    style={{
                      color: theme.subheading,
                      fontFamily: theme.starArenaFont,
                      fontSize: hp(1.3),
                      paddingHorizontal: wp(2),
                      marginVertical: hp(0.5),
                    }}
                  >
                    99
                  </Text>
                </View>
              </View>
            ) : (
              <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}
              />
            )}

            {/* Chat input field with all other options */}
            <View
              style={{
                height: hp(10),
                backgroundColor: theme.background,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: wp(3),
                gap: wp(2),
                paddingBottom: keyboardVisible ? hp(4) : 0, // Add more space when the keyboard is visible
              }}
            >
              {/* Text input section */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: 25,
                  paddingHorizontal: wp(4),
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Message..."
                  placeholderTextColor="#999"
                  value={inputText}
                  onChangeText={setInputText}
                  style={{
                    color: "#000",
                    fontSize: hp(1.7),
                    fontFamily: theme.starArenaFont,
                  }}
                />
              </View>

              {/* Send button */}
              <TouchableOpacity onPress={handleSendMessage}>
                <Image
                  source={require("../../assets/Icon/Chat/gift.png")}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    position: "relative",
  },
  backButton: {
    width: 40,
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    flex: 1,
    fontFamily: "starArenaFont",
    height: "50%",
    marginRight: 20,
  },
  container: {
    flex: 1,
  },
  chatCont: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    width: wp(6),
    height: wp(6),
    resizeMode: "contain",
  },
  // Message Styles
  messageContainer: {
    padding: wp(2),
    marginVertical: hp(0.51),
    borderRadius: 10,
    maxWidth: "80%",
    alignSelf: "flex-start", // Default for received message
    marginHorizontal: wp(2),
  },
  sentMessage: {
    backgroundColor: "#c54b8c", // Light green for sent messages
    alignSelf: "flex-end", // Sent messages align to the right
  },
  receivedMessage: {
    backgroundColor: "#f1f1f1", // Light gray for received messages
    alignSelf: "flex-start", // Received messages align to the left
  },
});
