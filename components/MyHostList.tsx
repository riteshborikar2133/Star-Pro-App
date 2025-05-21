import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../constants/ThemeContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type MonthOption = {
  label: string;
  value: string;
};

export const MyHostHeader: React.FC = () => {
  const { theme } = useTheme();
  const [showMonthModal, setShowMonthModal] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("This Month");

  // This function is defined and used only within MyHostHeader
  const generateMonths = (): MonthOption[] => {
    const months: MonthOption[] = [];
    const now = new Date();

    months.push({ label: "This Month", value: "this_month" });

    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    months.push({ label: "Last Month", value: "last_month" });

    for (let i = 2; i <= 13; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      months.push({
        label: `${monthName} ${year}`,
        value: `${monthName.toLowerCase()}_${year}`,
      });
    }
    return months;
  };

  // monthOptions is also generated and managed internally
  const monthOptions: MonthOption[] = generateMonths();

  const handleMonthSelect = (monthLabel: string) => {
    setSelectedMonth(monthLabel);
    setShowMonthModal(false);
  };

  return (
    <View style={{ backgroundColor: theme.background }}>
      <View
        style={{
          backgroundColor: theme.background,
          paddingHorizontal: wp(4),
          // paddingBottom: hp(3),
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
      <View
        style={{
          flexDirection: "row",
          marginVertical: hp(2),
          marginHorizontal: wp(3),
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* Search */}
        <View style={[styles.searchContainer, { width: wp(60) }]}>
          <Image
            source={require("../assets/Icon/Searchbutton.png")}
            style={{ width: wp(5), height: hp(5) }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="@username / #userid"
            placeholderTextColor="#999"
            style={[styles.input, { fontFamily: theme.starArenaFont }]}
          />
        </View>
        {/* Month Drop Down*/}
        <TouchableOpacity
          onPressIn={() => setShowMonthModal(true)}
          style={[
            styles.monthDropdownButton,
            {
              backgroundColor: theme.card,
              borderColor: theme.heading,
            },
          ]}
        >
          <Text
            style={{
              color: theme.heading,
              fontFamily: theme.starArenaFont,
              fontSize: hp(1.8),
            }}
          >
            {selectedMonth}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showMonthModal}
          onRequestClose={() => setShowMonthModal(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setShowMonthModal(false)}
          >
            <View
              style={[
                styles.monthModalContent,
                {
                  backgroundColor: theme.card,
                  paddingHorizontal: wp(2),
                  paddingVertical: hp(2),
                },
              ]}
            >
              <FlatList
                data={monthOptions} // Directly uses the internally generated monthOptions
                keyExtractor={(item: MonthOption) => item.value}
                renderItem={({ item }: { item: MonthOption }) => (
                  <TouchableOpacity
                    style={[
                      styles.monthOption,
                      { borderBottomColor: theme.heading },
                    ]}
                    onPress={() => handleMonthSelect(item.label)}
                  >
                    <Text
                      style={{
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
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

  const totalEarnings = users.reduce((sum, user) => sum + user.earning, 0);
  const totalRedeemed = users.reduce((sum, user) => sum + user.redeemed, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* New Header Row (Black Background) */}
      <View style={[styles.row, { backgroundColor: "#000000" }]}>
        <Text
          style={[
            styles.columnText,
            styles.headerText,
            { color: "#ffffff", paddingHorizontal: wp(3) },
          ]}
        >
          User
        </Text>
        <Text
          style={[styles.columnText, styles.headerText, { color: "#ffffff" }]}
        >
          My Earning
        </Text>
        <Text
          style={[styles.columnText, styles.headerText, { color: "#ffffff" }]}
        >
          Redeemed
        </Text>
      </View>
      {/* Header Row with Total */}

      {/* Summary Header Row (Dynamic totals) */}
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
        <View
          style={[
            styles.columnText,
            {
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              alignItems: "center",
            },
          ]}
        >
          <Image
            source={require("../assets/Icon/diamond.png")}
            style={{ height: hp(2), width: wp(4) }}
          />
          <Text
            style={[
              styles.headerText,
              { fontFamily: theme.starArenaFont, color: theme.heading },
            ]}
          >
            {totalEarnings}
          </Text>
        </View>
        <View
          style={[
            styles.columnText,
            {
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              alignItems: "center",
            },
          ]}
        >
          <Image
            source={require("../assets/Icon/diamond.png")}
            style={{ height: hp(2), width: wp(4) }}
          />
          <Text
            style={[
              styles.headerText,
              { fontFamily: theme.starArenaFont, color: theme.heading },
            ]}
          >
            {totalRedeemed}
          </Text>
        </View>
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
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                },
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
                {item.earning}
              </Text>
            </View>
            <View
              style={[
                styles.columnText,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  // borderWidth: 1,
                  // borderColor: "red",
                },
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
                {item.redeemed}
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
    justifyContent: "center",
    marginBottom: hp(1.5),
    paddingVertical: hp(2),
  },
  columnText: {
    // borderWidth: 1,
    // borderColor: "red",
    width: wp(30),
    textAlign: "center",
    fontFamily: "System", // Replace with theme.starArenaFont if needed
  },
  headerText: {
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 22,
    gap: 5,
    // marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: hp(1.8),
    color: "#333",
  },
  monthDropdownButton: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  monthModalContent: {
    borderRadius: 10,
    width: wp(70),
    maxHeight: hp(40),
    overflow: "hidden",
  },
  monthOption: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
  },
});
