import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";
import OtherHeader from "./OtherPageHeader";

const ChatScreeen = () => {
  const { theme } = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <View style={styles.chatScreenContainer}>
        <View
          style={{
            width: "98%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // borderColor: "white",
              // borderWidth: 1,
              padding: 5,
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: theme.subheading,
                borderRadius: 11,
              }}
            ></View>

            <View style={{}}>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 15,
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "baseline",
                  // borderWidth: 1,
                  // borderColor: "white",
                }}
              >
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Hey! How are you?
                </Text>
                <Text
                  style={{
                    color: theme.subheading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                    marginHorizontal: 0,
                  }}
                >
                  3d
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: theme.accent2,
              borderRadius: 30,
            }}
          ></View>
        </View>
      </View>
      <View style={styles.chatScreenContainer}>
        <View
          style={{
            width: "98%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // borderColor: "white",
              // borderWidth: 1,
              padding: 5,
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: theme.subheading,
                borderRadius: 11,
              }}
            ></View>

            <View style={{}}>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 15,
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "baseline",
                  // borderWidth: 1,
                  // borderColor: "white",
                }}
              >
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Hey! How are you?
                </Text>
                <Text
                  style={{
                    color: theme.subheading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                    marginHorizontal: 0,
                  }}
                >
                  3d
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: theme.accent2,
              borderRadius: 30,
            }}
          ></View>
        </View>
      </View>
      <View style={styles.chatScreenContainer}>
        <View
          style={{
            width: "98%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // borderColor: "white",
              // borderWidth: 1,
              padding: 5,
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: theme.subheading,
                borderRadius: 11,
              }}
            ></View>

            <View style={{}}>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 15,
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "baseline",
                  // borderWidth: 1,
                  // borderColor: "white",
                }}
              >
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Hey! How are you?
                </Text>
                <Text
                  style={{
                    color: theme.subheading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                    marginHorizontal: 0,
                  }}
                >
                  3d
                </Text>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: theme.accent2,
              borderRadius: 30,
            }}
          ></View> */}
        </View>
      </View>
      <View style={styles.chatScreenContainer}>
        <View
          style={{
            width: "98%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // borderColor: "white",
              // borderWidth: 1,
              padding: 5,
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: theme.subheading,
                borderRadius: 11,
              }}
            ></View>

            <View style={{}}>
              <Text
                style={{
                  color: theme.heading,
                  fontSize: 15,
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "baseline",
                  // borderWidth: 1,
                  // borderColor: "white",
                }}
              >
                <Text
                  style={{
                    color: theme.heading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Hey! How are you?
                </Text>
                <Text
                  style={{
                    color: theme.subheading,
                    fontSize: 14,
                    fontFamily: theme.starArenaFont,
                    marginHorizontal: 0,
                  }}
                >
                  3d
                </Text>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: theme.accent2,
              borderRadius: 30,
            }}
          ></View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatScreeen;

const styles = StyleSheet.create({
  cardContainer: {
    // flex: 1,
    paddingTop: 5,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 60,
  },
  chatScreenContainer: {
    // marginVertical: 10,
    // marginHorizontal: 10,
  },
});
