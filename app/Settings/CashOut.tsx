import {
  Image,
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
const CashOut = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("daily");
  return (
    <>
      <OtherHeader title="Cash Out" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
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
              //   borderWidth: 1,
              //   borderColor: "red",
            }}
          >
            Cash Out
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
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
              style={{ fontFamily: theme.starArenaFont, color: theme.heading }}
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
              Recent Transaction
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
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() => setActiveTab("daily")}>
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color: activeTab == "daily" ? theme.background : theme.heading,
                backgroundColor:
                  activeTab == "daily" ? theme.heading : theme.background,
                fontSize: hp(2),
                width: wp(45),
                borderColor: theme.heading,
                borderWidth: 1,
                borderRadius: 8,
                textAlign: "center",
                paddingVertical: hp(1),
              }}
            >
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab("monthly")}>
            <Text
              style={{
                fontFamily: theme.starArenaFont,
                color:
                  activeTab == "monthly" ? theme.background : theme.heading,
                backgroundColor:
                  activeTab == "monthly" ? theme.heading : theme.background,
                fontSize: hp(2),
                width: wp(45),
                borderColor: theme.heading,
                borderWidth: 1,
                borderRadius: 8,
                textAlign: "center",
                paddingVertical: hp(1),
              }}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
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
});
