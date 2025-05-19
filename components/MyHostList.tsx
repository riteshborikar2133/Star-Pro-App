import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const MyHostHeader = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.background,
        paddingHorizontal: wp(4),
        paddingBottom: hp(3),
      }}
    >
      <Text
        style={{
          color: theme.heading,
          fontFamily: theme.starArenaFont,
          fontSize: hp(2.3),
        }}
      >
        My Hosts
      </Text>
    </View>
  );
};

export const MyHostContent = () => {
  const { theme } = useTheme();
  const users = [
    { id: "1", name: "John Doe", earning: 500, redeemed: 300 },
    { id: "2", name: "Jane Smith", earning: 750, redeemed: 200 },
    { id: "3", name: "Alex Johnson", earning: 300, redeemed: 100 },
    { id: "4", name: "Emily Davis", earning: 450, redeemed: 250 },
    { id: "5", name: "Michael Brown", earning: 620, redeemed: 400 },
    { id: "6", name: "Sarah Wilson", earning: 720, redeemed: 380 },
    { id: "7", name: "David Lee", earning: 560, redeemed: 280 },
    { id: "8", name: "Laura Kim", earning: 800, redeemed: 500 },
    { id: "9", name: "Chris Evans", earning: 350, redeemed: 150 },
    { id: "10", name: "Angela White", earning: 410, redeemed: 210 },
    { id: "11", name: "Tom Hardy", earning: 900, redeemed: 600 },
    { id: "12", name: "Emma Stone", earning: 670, redeemed: 450 },
    { id: "13", name: "Daniel Craig", earning: 520, redeemed: 300 },
    { id: "14", name: "Olivia Taylor", earning: 430, redeemed: 230 },
    { id: "15", name: "Ethan Harris", earning: 760, redeemed: 480 },
    { id: "16", name: "Grace Moore", earning: 690, redeemed: 350 },
    { id: "17", name: "Nathan Scott", earning: 830, redeemed: 500 },
    { id: "18", name: "Sophia Hill", earning: 490, redeemed: 270 },
    { id: "19", name: "Ryan Adams", earning: 610, redeemed: 370 },
    { id: "20", name: "Chloe Green", earning: 330, redeemed: 120 },
    { id: "21", name: "Liam Brooks", earning: 780, redeemed: 400 },
    { id: "22", name: "Ava Bennett", earning: 550, redeemed: 330 },
    { id: "23", name: "Jack Parker", earning: 670, redeemed: 390 },
    { id: "24", name: "Isabella Reed", earning: 740, redeemed: 420 },
    { id: "25", name: "Luke Turner", earning: 600, redeemed: 340 },
    { id: "26", name: "Mia Murphy", earning: 480, redeemed: 260 },
    { id: "27", name: "Noah Collins", earning: 850, redeemed: 530 },
    { id: "28", name: "Zoe Mitchell", earning: 510, redeemed: 290 },
    { id: "29", name: "Caleb Rogers", earning: 390, redeemed: 180 },
    { id: "30", name: "Lily Bailey", earning: 710, redeemed: 390 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Row with Total */}
      <View style={[styles.row, { backgroundColor: "#484848" }]}>
        <Text
          style={[
            styles.columnText,
            styles.headerText,
            { color: theme.heading, paddingHorizontal: wp(3) },
          ]}
        >
          Creators ({users.length})
        </Text>
        <Text
          style={[
            styles.columnText,
            styles.headerText,
            { color: theme.heading },
          ]}
        >
          My Earning
        </Text>
        <Text
          style={[
            styles.columnText,
            styles.headerText,
            { color: theme.heading },
          ]}
        >
          Redeemed
        </Text>
      </View>

      {/* User List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text
              style={[
                styles.columnText,
                { color: theme.subheading, paddingHorizontal: wp(3) },
              ]}
            >
              {item.name}
            </Text>
            <View
              style={[
                styles.columnText,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Image
                source={require("../assets/Icon/diamond.png")}
                style={{ height: hp(2), width: wp(4) }}
              />
              <Text
                style={[
                  {
                    color: theme.subheading,
                    paddingHorizontal: wp(3),
                    fontSize: wp(3.8),
                    fontFamily: theme.starArenaFont,
                  },
                ]}
              >
                ${item.earning}
              </Text>
            </View>
            <View
              style={[
                styles.columnText,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Image
                source={require("../assets/Icon/diamond.png")}
                style={{ height: hp(2), width: wp(4) }}
              />
              <Text
                style={[
                  {
                    color: theme.subheading,
                    paddingHorizontal: wp(3),
                    fontSize: wp(3.8),
                    fontFamily: theme.starArenaFont,
                  },
                ]}
              >
                ${item.redeemed}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: wp(4),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(1.5),
    paddingVertical: hp(2),
  },
  columnText: {
    width: wp(30),
    fontFamily: "System", // Replace with theme.starArenaFont if needed
  },
  headerText: {
    fontWeight: "600",
  },
});
