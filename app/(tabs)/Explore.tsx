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
import { router } from "expo-router";
import OtherHeader from "../../components/OtherPageHeader";

const Explore = () => {
  const { theme } = useTheme();

  const users = [
    {
      id: "1000231",
      name: "Priyanka Gandhi1",
      followers: "11.4M",
      mutuals: "11.4M",
      route: "/explore/Priyanka Gandhi1",
    },
    {
      id: "1000232",
      name: "Rahul Gandhi",
      followers: "10.1M",
      mutuals: "2.3M",
      route: "/explore/Rahul Gandhi",
    },
    {
      id: "1000233",
      name: "Tom Cruse",
      followers: "14.2M",
      mutuals: "3.1M",
      route: "/explore/Tom Cruse",
    },
    {
      id: "1000234",
      name: "Priya Gandhi",
      followers: "5.9M",
      mutuals: "1.2M",
      route: "/explore/Priya Gandhi",
    },
    {
      id: "1000235",
      name: "Amit Roy",
      followers: "3.7M",
      mutuals: "800K",
      route: "/explore/Amit Roy",
    },
    {
      id: "1000236",
      name: "Emily Carter",
      followers: "12.3M",
      mutuals: "5.6M",
      route: "/explore/Emily Carter",
    },
    {
      id: "1000237",
      name: "Carlos Mendez",
      followers: "8.4M",
      mutuals: "1.7M",
      route: "/explore/Carlos Mendez",
    },
    {
      id: "1000238",
      name: "Meera Kapoor",
      followers: "7.2M",
      mutuals: "1.1M",
      route: "/explore/Meera Kapoor",
    },
    {
      id: "1000239",
      name: "James Anderson",
      followers: "9.9M",
      mutuals: "4.3M",
      route: "/explore/James Anderson",
    },
    {
      id: "1000240",
      name: "Ayesha Khan",
      followers: "6.5M",
      mutuals: "2.2M",
      route: "/explore/Ayesha Khan",
    },
  ];

  const UserCard = ({ user }: { user: any }) => {
    return (
      <View style={styles.card}>
        <View
          style={{
            backgroundColor: theme.subheading,
            height: 65,
            width: 65,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            paddingVertical: 2,
            paddingHorizontal: 15,
            width: "58%",
            // borderWidth:1,
            // borderColor:'red'
          }}
        >
          {user.route ? (
            <TouchableOpacity onPress={() => router.push(user.route)}>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontFamily: theme.starArenaFont,
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #{user.id}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontFamily: theme.starArenaFont,
                }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  color: theme.subheading,
                  fontFamily: theme.starArenaFont,
                }}
              >
                #{user.id}
              </Text>
            </>
          )}
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                source={require("../../assets/Icon/diamond.png")}
                style={{ height: 12, width: 12 }}
              />
              <Text style={{ color: theme.heading, fontSize: 12 }}>
                {user.followers}
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
                {user.mutuals}
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
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 10,
      }}
    >
      <OtherHeader title="Explore" />
      {/* Search Bar */}
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
      >
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
          style={[
            { color: theme.subheading, marginVertical: 10, fontSize: 14 },
          ]}
        >
          Suggested users for you
        </Text>

        {/* User List */}
        <View>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    borderStyle: "solid",
  },
});
