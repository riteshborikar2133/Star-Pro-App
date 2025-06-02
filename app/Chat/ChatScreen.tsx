import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ChatScreen = () => {
  const { username } = useLocalSearchParams();
  const { theme } = useTheme();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, marginBottom: bottom }}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={[
            styles.backButton,
            // { backgroundColor: theme.background, position: "absolute" },
          ]}
          activeOpacity={0.7} // Provide touch feedback
        >
          <Image
            source={require("../../assets/Icon/back.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        {/* <Image source={require("../assets/Icon/back.png")} style={styles.logo} /> */}
        <Text
          style={[
            styles.title,
            { color: theme.primary, fontFamily: theme.starArenaFontSemiBold },
          ]}
        >
          {username}
        </Text>
        {/* <Image source={require("../assets/Menu-right.png")} style={styles.logo} /> */}
      </View>
      <View style={[styles.container, { backgroundColor: theme.card }]}>
        <View
          style={[
            styles.chatCont,
            { height: hp(77), backgroundColor: theme.card },
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
              style={[
                {
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(1.7),
                },
              ]}
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
              style={[
                {
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(1.3),
                  paddingHorizontal: wp(2),
                  marginVertical: hp(0.5),
                },
              ]}
            >
              Send Gift
            </Text>
            <Image source={require("../../assets/Icon/Settings/coin.png")} />
            <Text
              style={[
                {
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                  fontSize: hp(1.3),
                  paddingHorizontal: wp(2),
                  marginVertical: hp(0.5),
                },
              ]}
            >
              99
            </Text>
          </View>
        </View>

        {/* Chat input field with all other option */}
        <View
          style={{
            height: hp(10),
            backgroundColor: theme.background,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: wp(3),
            gap: wp(2),
          }}
        >
          {/* Text input section */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 25,
              paddingHorizontal: wp(4),
              // height: hp(5.5),
              justifyContent: "center",
            }}
          >
            <TextInput
              placeholder="Message..."
              placeholderTextColor="#999"
              style={{
                color: "#000",
                fontSize: hp(1.7),
                fontFamily: theme.starArenaFont,
              }}
            />
            {/* Replace above Text with <TextInput ... /> when ready */}
          </View>

          {/* Icons section */}
          <TouchableOpacity>
            <Image
              source={require("../../assets/Icon/Chat/img.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/Icon/Chat/camera.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/Icon/Chat/mic.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/Icon/Chat/gift.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    height: 50,
    // backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    borderWidth: 1,
    // borderColor: "red",
    position: "relative",
  },
  // logo: {
  //   position: "absolute",
  //   width: 30,
  //   height: 25,
  //   resizeMode: "contain",
  // },
  backButton: {
    width: 40,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
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
    // fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    fontFamily: "starArenaFont",
    // borderColor: "red",
    // borderWidth: 1,
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
});
