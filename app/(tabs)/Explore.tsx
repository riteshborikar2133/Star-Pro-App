import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "../../constants/ThemeContext";
import { starArenaFont } from "../../constants/colors";
import { router } from "expo-router";

const Explore = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 10,
      }}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../../assets/Icon/Searchbutton.png")}
          style={{ width: 25, height: "100%" }}
          resizeMode="contain"
        />
        <TextInput
          placeholder="@username / #userid"
          placeholderTextColor="#999"
          style={[styles.input, { fontFamily: theme.starArenaFont }]}
        />
      </View>
      <Text
        style={[{ color: theme.subheading, marginVertical: 10, fontSize: 14 }]}
      >
        Suggested users for you
      </Text>

      {/* List */}
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* List Item */}
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/explore/Priyanka Gandhi1",
                   
                  });
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    // fontWeight:'bold',
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  Priyanka Gandhi1
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View
            style={{
              backgroundColor: theme.subheading,
              height: 80,
              width: 80,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              // borderColor: "white",
              // borderStyle: "solid",
              // borderWidth: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              paddingVertical: 2,
              paddingHorizontal: 15,
              width: "55%",
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  // fontWeight:'bold',
                  fontFamily: theme.starArenaFont,
                }}
              >
                Priyanka Gandhi
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #1000231
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 15 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/diamond.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Image
                  source={require("../../assets/Icon/duoProfile.png")}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={{ color: theme.heading, fontSize: 12 }}>
                  11.4M
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text
              style={{
                borderColor: theme.accent1,
                borderStyle: "solid",
                borderWidth: 2,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 10,
                color: theme.accent1,
                fontFamily: theme.starArenaFont,
              }}
            >
              Follow
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 22,
    gap: 5,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  cardContainer: {
    paddingBottom: 60,
  },
  card: {
    // backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    borderStyle: "solid",
  },
});
