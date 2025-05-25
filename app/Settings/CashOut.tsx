import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import OtherHeader from "../../components/OtherPageHeader";
import { useTheme } from "../../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CashOutList from "../../components/CashOutList";
import { router } from "expo-router";
import { background } from "../../constants/colors";

const CashOut = () => {
  const { theme } = useTheme();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("Current Month");
  const [isModalVisible, setModalVisible] = useState(false);

  // Generate past 12 months using plain JS Date
  const getLast12Months = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const now = new Date();
    const months = [];

    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      let label;

      if (i === 0) label = "Current Month";
      else if (i === 1) label = "Last Month";
      else label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      months.push({
        label,
        value: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
      });
    }

    return months;
  };

  const months = getLast12Months();

  return (
    <>
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
            {
              color: theme.primary,
              fontFamily: theme.starArenaFontSemiBold,
              // borderWidth: 1,
              // borderColor: "red",
            },
          ]}
        >
          Cashout
        </Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Image
            source={require("../../assets/Icon/menu.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        <Modal
          visible={isMenuVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPressOut={() => setMenuVisible(false)}
          >
            <View style={[styles.menuContent, { backgroundColor: theme.card }]}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setMenuVisible(false);
                  // Navigate to History screen
                  router.push("/history");
                }}
              >
                <Text
                  style={[
                    styles.modalText,
                    { fontFamily: theme.starArenaFont, color: theme.heading },
                  ]}
                >
                  History
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setMenuVisible(false);
                  // Navigate to Report Issue screen
                  router.push("/report-issue");
                }}
              >
                <Text
                  style={[
                    styles.modalText,
                    { fontFamily: theme.starArenaFont, color: theme.heading },
                  ]}
                >
                  Report Issue
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView
          contentContainerStyle={{ flex: 0 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Cash Out Card */}
          <View
            style={{
              borderColor: theme.subheading,
              borderWidth: 1,
              borderRadius: 20,
              marginVertical: hp(3),
              // marginHorizontal: wp(5),
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              height: hp(35),
            }}
          >
            <Text
              style={{
                color: theme.heading,
                fontSize: hp(3),
                textAlign: "center",
                fontFamily: theme.starArenaFontSemiBold,
                // borderWidth: 1,
                // borderColor: "red",
              }}
            >
              Cash Out
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text
                style={{
                  color: theme.subheading,
                  fontSize: hp(1.7),
                  textAlign: "center",
                  fontFamily: theme.starArenaFont,
                  //   borderWidth: 1,
                  //   borderColor: "red",
                }}
              >
                Need 227
              </Text>
              <Image
                source={require("../../assets/Icon/diamond.png")}
                style={{ height: hp(2), width: wp(4) }}
              />
              <Text
                style={{
                  color: theme.subheading,
                  fontSize: hp(1.7),
                  textAlign: "center",
                  fontFamily: theme.starArenaFont,
                  //   borderWidth: 1,
                  //   borderColor: "red",
                }}
              >
                more to get
              </Text>
            </View>

            <Text
              style={{
                color: theme.heading,
                fontSize: hp(4.5),
                textAlign: "center",
                fontFamily: theme.starArenaFontSemiBold,
                //   borderWidth: 1,
                //   borderColor: "red",
              }}
            >
              ₹1000
            </Text>
            <View
              style={{
                height: hp(2.4),
                backgroundColor: "#484848",
                width: "75%",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "10%",
                  backgroundColor: theme.accent1,
                  borderRadius: 20,
                }}
              ></View>
            </View>
            <View
              style={{
                backgroundColor: theme.accent1,
                paddingHorizontal: wp(3.5),
                paddingVertical: hp(1),
                marginTop: hp(2),
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  color: theme.heading,
                }}
              >
                Withdraw Money
              </Text>
            </View>
          </View>

          {/* Transaction History */}
          <View style={{ paddingHorizontal: wp(1) }}>
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: theme.heading,
                fontSize: hp(2.4),
                marginVertical: hp(2),
              }}
            >
              Transaction History
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  color: theme.subheading,
                  fontSize: hp(2),
                }}
              >
                Recent Cashout
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: hp(2),
                  borderBottomWidth: 1,
                  borderBottomColor: theme.subheading,
                  paddingBottom: hp(2),
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.heading,
                      fontSize: hp(2.2),
                    }}
                  >
                    $12,300
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.subheading,
                      fontSize: hp(2),
                    }}
                  >
                    12 May, 11:44 am
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#181818",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.subheading,
                      fontSize: hp(1.9),
                      paddingHorizontal: wp(3),
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: theme.subheading,
                    }}
                  >
                    Requested
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Daily and Monthly */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  color: theme.background,
                  backgroundColor: theme.heading,
                  fontSize: hp(2),
                  width: wp(60),
                  borderColor: theme.heading,
                  borderWidth: 1,
                  borderRadius: 8,
                  textAlign: "center",
                  paddingVertical: hp(1),
                }}
              >
                {selectedMonth}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text
                style={{
                  fontFamily: theme.starArenaFont,
                  color: theme.heading,
                  backgroundColor: theme.background,
                  fontSize: hp(2),
                  width: wp(30),
                  borderColor: theme.heading,
                  borderWidth: 1,
                  borderRadius: 8,
                  textAlign: "center",
                  paddingVertical: hp(1),
                }}
              >
                Month
              </Text>
            </TouchableOpacity>

            {/* Modal Dropdown */}
            <Modal transparent visible={isModalVisible} animationType="fade">
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
                activeOpacity={1}
              >
                <View
                  style={[styles.modalContent, { backgroundColor: theme.card }]}
                >
                  <FlatList
                    data={months}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.monthItem}
                        onPress={() => {
                          setSelectedMonth(item.label);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.monthText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          <CashOutList />
        </ScrollView>
      </View>
    </>
  );
};

export default CashOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    marginHorizontal: 40,
    // backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 20,
    maxHeight: hp(50),
  },
  monthItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  monthText: {
    fontSize: hp(2),
    color: "#fff",
  },

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
    marginRight: wp(2),
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

  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuContent: {
    paddingVertical: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderRadius: wp(10),
  },
  modalButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
  },
});
