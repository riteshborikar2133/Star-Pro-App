import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MomentScreen = () => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { paddingBottom: bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.innerCard}></View>
          <View
            style={{
              width: "100%",
              height: "15%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //   backgroundColor: "red",
              gap: 5,
            }}
          >
            <Image
              source={require("../assets/Icon/like.png")}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                fontSize: 12,
                marginTop: 2,
              }}
            >
              200k
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MomentScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: "red",
    // flex: 1,
    // paddingBottom: bottom,
    paddingHorizontal: 5,
    // borderColor:'red',
    // borderWidth:1
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "space-evenly",
  },
  card: {
    width: "32%", // Roughly 1/3rd of container, adjust as needed
    height: 150,
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 2,
    // marginHorizontal:2,
    borderRadius: 8,
    // justifyContent: "center",
    // alignItems: "center",
  },
  innerCard: {
    height: "85%",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "white",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
});
