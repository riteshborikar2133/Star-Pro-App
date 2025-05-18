import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import OtherHeader from "../../components/OtherPageHeader";
import { useTheme } from "../../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Checkbox from "expo-checkbox";

const AgencyPortal = () => {
  const { theme } = useTheme();
  const [isChecked, setIsChecked] = useState(false); // State to track the checkbox

  // Function to handle the checkbox state change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };
  return (
    <>
      <OtherHeader title="Agency Portal" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View
          style={{
            backgroundColor: "#ffffff0d",
            height: hp(20),
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Image source={require("../../assets/Icon/Settings/silver.png")} />
        </View>

        <View>
          <Text
            style={{
              color: theme.heading,
              paddingHorizontal: wp(3),
              fontSize: wp(4.5),
              paddingTop: hp(2),
              fontFamily: theme.starArenaFontSemiBold,
            }}
          >
            1/2 Goals Remaining
          </Text>
          <View
            style={{
              paddingHorizontal: wp(3),
              paddingTop: hp(2),
            }}
          >
            <Text
              style={{ color: theme.heading, fontFamily: theme.starArenaFont }}
            >
              $1180 / $10000
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <View
                style={{
                  borderColor: "white",
                  // borderWidth: 1,
                  marginTop: hp(1),
                  height: hp(1.2),
                  width: wp(85),
                  backgroundColor: "#484848",
                  borderRadius: 50,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "11.8%",
                    backgroundColor: theme.accent1,
                    borderRadius: 50,
                  }}
                ></View>
              </View>
              <Checkbox
                value={isChecked} // Set checkbox value to the state
                onValueChange={handleCheckboxChange} // Handle change on checkbox toggle
                color={isChecked ? theme.accent1 : "#d3d3d3"} // Accent color for checked, light gray for unchecked
              />
            </View>
          </View>
        </View>

        {/* Earning Cards */}
        <View
          style={{
            paddingHorizontal: wp(1),
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: hp(3),
            gap: 8,
          }}
        >
          <View
            style={{
              borderColor: theme.subheading,
              backgroundColor: theme.card,
              borderWidth: 1,
              borderRadius: 12,
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
              flexDirection: "column",
              justifyContent: "center",
              width: wp(45),
            }}
          >
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFontSemiBold,
                fontSize: wp(3.5),
              }}
            >
              Last Month's Earnings
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: hp(1.2),
              }}
            >
              <Image
                source={require("../../assets/Icon/diamond.png")}
                style={{ height: hp(3), width: wp(6) }}
              />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFontSemiBold,
                  fontSize: hp(2.5),
                }}
              >
                12,380
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: theme.subheading,
              backgroundColor: theme.card,
              borderWidth: 1,
              borderRadius: 12,
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
              flexDirection: "column",
              justifyContent: "center",
              width: wp(45),
            }}
          >
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFontSemiBold,
                fontSize: wp(3.5),
              }}
            >
              This Month’s Earnings
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: hp(1.2),
              }}
            >
              <Image
                source={require("../../assets/Icon/diamond.png")}
                style={{ height: hp(3), width: wp(6) }}
              />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFontSemiBold,
                  fontSize: hp(2.5),
                }}
              >
                12,380
              </Text>
            </View>
          </View>
        </View>

        {/* My Agency Name */}
        <View
          style={{
            marginHorizontal: wp(4),
            paddingHorizontal: wp(4),
            paddingVertical: hp(1.5),
            borderColor: theme.subheading,
            backgroundColor: theme.card,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            gap: 23,
            width: "92%",
          }}
        >
          <View
            style={{
              height: hp(7),
              width: wp(14),
              backgroundColor: theme.heading,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              borderColor: "white",
              // borderWidth: 1,
              width: "60%",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 7,
            }}
          >
            <Text
              style={{
                color: theme.heading,
                fontFamily: theme.starArenaFont,
                fontSize: hp(2.1),
              }}
            >
              My Agency Name
            </Text>
            <Text
              style={{
                color: theme.subheading,
                fontFamily: theme.starArenaFont,
              }}
            >
              Code - 1001
            </Text>
          </View>
          <Image
            source={require("../../assets/Icon/edit.png")}
            style={{ height: hp(2.5), width: wp(5) }}
          />
        </View>

        <View
          style={{
            // borderWidth: 1,
            // borderColor: "white",
            marginHorizontal: wp(4),
            marginVertical: hp(3),
            borderRadius: 60,
            paddingHorizontal: wp(1),
            paddingVertical: hp(0.5),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#181818",
          }}
        >
          <Text
            style={{
              color: theme.heading,
              marginLeft: wp(6),
              fontFamily: theme.starArenaFont,
            }}
          >
            Invite Host
          </Text>
          <View
            style={{
              backgroundColor: theme.background,
              paddingHorizontal: wp(4),
              paddingVertical: hp(1.3),
              borderRadius: 60,
            }}
          >
            <Text
              style={{
                color: theme.subheading,
                fontFamily: theme.starArenaFont,
              }}
            >
              Send Invite
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default AgencyPortal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: wp(3),
  },
});
