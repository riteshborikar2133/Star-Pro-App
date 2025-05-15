import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";

const VlogScreen = () => {
  const { theme } = useTheme();
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
                width: 16,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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
              source={require("../assets/Icon/Eye.png")}
              style={{
                height: 10,
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

export default VlogScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    // backgroundColor: "red",
    // flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 10,
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
