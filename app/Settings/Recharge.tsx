import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { useTheme } from "../../constants/ThemeContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OtherHeader from "../../components/OtherPageHeader";

const Recharge = () => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      {/* <CustomHeader /> */}
      <OtherHeader title="Recharge" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ImageBackground
          source={require("../../assets/Recharge.png")}
          style={styles.backgroundImage}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* COin */}
            <View
              style={{
                borderColor: theme.subheading,
                borderWidth: 1,
                flexDirection: "row",
                paddingHorizontal: wp(1.5),
                paddingVertical: hp(0.3),
                alignItems: "center",
                borderRadius: 12,
                gap: 5,
              }}
            >
              <Image source={require("../../assets/Icon/Settings/coin.png")} />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: wp(4),
                }}
              >
                12k
              </Text>
            </View>
            {/* Cur */}
            <View
              style={{
                borderColor: theme.subheading,
                borderWidth: 1,
                flexDirection: "row",
                paddingHorizontal: wp(2),
                paddingVertical: hp(0.3),
                alignItems: "center",
                borderRadius: 12,
                gap: 5,
              }}
            >
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: wp(4),
                }}
              >
                Cur
              </Text>
              <Image source={require("../../assets/Icon/Settings/down.png")} />
            </View>
          </View>

          <View
            style={{
              // borderColor: "red",
              // borderWidth: 1,
              height: hp(75),
              // flex: 1,
              justifyContent: "center",
              gap: 20,
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {/* Card1 */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.subheading,
                  },
                ]}
              >
                <View style={[styles.cardL1]}>
                  <Image
                    source={require("../../assets/Icon/Settings/coin.png")}
                    style={{ width: wp(6) }}
                  />

                  <Text
                    style={{
                      fontSize: wp(5),
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    250
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/mediumCoin.png")}
                  style={{
                    borderColor: theme.accent1,
                    borderWidth: 0,
                    width: "100%",
                    height: "40%",
                  }}
                />
                {/* <View> */}
                <Text
                  style={{
                    fontSize: wp(5),
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: theme.subheading,
                    textDecorationLine: "line-through",
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                {/* </View> */}
              </View>

              {/* Card2 */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.subheading,
                  },
                ]}
              >
                <View style={[styles.cardL1]}>
                  <Image
                    source={require("../../assets/Icon/Settings/coin.png")}
                    style={{ width: wp(6) }}
                  />

                  <Text
                    style={{
                      fontSize: wp(5),
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    250
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/mediumCoin.png")}
                  style={{
                    borderColor: theme.accent1,
                    borderWidth: 0,
                    width: "100%",
                    height: "40%",
                  }}
                />
                {/* <View> */}
                <Text
                  style={{
                    fontSize: wp(5),
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: theme.subheading,
                    textDecorationLine: "line-through",
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                {/* </View> */}
              </View>

              {/* Card3 */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.subheading,
                  },
                ]}
              >
                <View style={[styles.cardL1]}>
                  <Image
                    source={require("../../assets/Icon/Settings/coin.png")}
                    style={{ width: wp(6) }}
                  />

                  <Text
                    style={{
                      fontSize: wp(5),
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    250
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/mediumCoin.png")}
                  style={{
                    borderColor: theme.accent1,
                    borderWidth: 0,
                    width: "100%",
                    height: "40%",
                  }}
                />
                {/* <View> */}
                <Text
                  style={{
                    fontSize: wp(5),
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: theme.subheading,
                    textDecorationLine: "line-through",
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                {/* </View> */}
              </View>
            </View>
            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {/* Card1 */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.subheading,
                  },
                ]}
              >
                <View style={[styles.cardL1]}>
                  <Image
                    source={require("../../assets/Icon/Settings/coin.png")}
                    style={{ width: wp(6) }}
                  />

                  <Text
                    style={{
                      fontSize: wp(5),
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    250
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/mediumCoin.png")}
                  style={{
                    borderColor: theme.accent1,
                    borderWidth: 0,
                    width: "100%",
                    height: "40%",
                  }}
                />
                {/* <View> */}
                <Text
                  style={{
                    fontSize: wp(5),
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: theme.subheading,
                    textDecorationLine: "line-through",
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                {/* </View> */}
              </View>

              {/* Card2 */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.subheading,
                  },
                ]}
              >
                <View style={[styles.cardL1]}>
                  <Image
                    source={require("../../assets/Icon/Settings/coin.png")}
                    style={{ width: wp(6) }}
                  />

                  <Text
                    style={{
                      fontSize: wp(5),
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    250
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/mediumCoin.png")}
                  style={{
                    borderColor: theme.accent1,
                    borderWidth: 0,
                    width: "100%",
                    height: "40%",
                  }}
                />
                {/* <View> */}
                <Text
                  style={{
                    fontSize: wp(5),
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: theme.subheading,
                    textDecorationLine: "line-through",
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                {/* </View> */}
              </View>

              {/* Card3 */}
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.subheading,
                  },
                ]}
              >
                <View style={[styles.cardL1]}>
                  <Image
                    source={require("../../assets/Icon/Settings/coin.png")}
                    style={{ width: wp(6) }}
                  />

                  <Text
                    style={{
                      fontSize: wp(5),
                      color: theme.heading,
                      fontFamily: theme.starArenaFont,
                    }}
                  >
                    250
                  </Text>
                </View>
                <Image
                  source={require("../../assets/Icon/Settings/mediumCoin.png")}
                  style={{
                    borderColor: theme.accent1,
                    borderWidth: 0,
                    width: "100%",
                    height: "40%",
                  }}
                />
                {/* <View> */}
                <Text
                  style={{
                    fontSize: wp(5),
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: theme.subheading,
                    textDecorationLine: "line-through",
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ₹1200.99
                </Text>
                {/* </View> */}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Recharge;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // You can adjust this based on how you want the image to fit
    // justifyContent: "center", // Center content vertically
    // alignItems: "center", // Center content horizontally
    paddingHorizontal: hp(1.8),
    paddingVertical: wp(1.5),
  },
  container: {
    flex: 1,
  },
  card: {
    // backgroundColor: theme.background,
    borderWidth: 1,
    // borderColor: theme.subheading,
    borderRadius: 12,
    height: hp(22),
    width: wp(31),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardL1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
