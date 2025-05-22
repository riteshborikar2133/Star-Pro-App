import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeContext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const CashOutList = () => {
  const { theme } = useTheme();
  const data = [
    { name: "Tom", date: "12 May", ammount: 2345 },
    { name: "Sarah", date: "08 Apr", ammount: 1890 },
    { name: "Liam", date: "22 Mar", ammount: 4520 },
    { name: "Emma", date: "15 May", ammount: 3175 },
    { name: "Noah", date: "01 Feb", ammount: 2870 },
    { name: "Olivia", date: "28 Jan", ammount: 3999 },
    { name: "James", date: "10 Mar", ammount: 2280 },
    { name: "Ava", date: "17 May", ammount: 3540 },
    { name: "Lucas", date: "05 Apr", ammount: 4785 },
    { name: "Mia", date: "30 Mar", ammount: 2040 },
    { name: "Elijah", date: "11 May", ammount: 5100 },
    { name: "Sophia", date: "09 Feb", ammount: 3895 },
    { name: "William", date: "14 Apr", ammount: 2650 },
    { name: "Isabella", date: "06 Mar", ammount: 1980 },
    { name: "Benjamin", date: "19 Jan", ammount: 2995 },
    { name: "Emily", date: "23 Apr", ammount: 3350 },
    { name: "Henry", date: "27 Mar", ammount: 4080 },
    { name: "Charlotte", date: "18 Feb", ammount: 2220 },
    { name: "Jack", date: "04 May", ammount: 2750 },
    { name: "Amelia", date: "02 Apr", ammount: 3595 },
    { name: "Alexander", date: "13 Mar", ammount: 4900 },
    { name: "Harper", date: "16 Jan", ammount: 1770 },
  ];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          paddingVertical: hp(1),
          borderRadius: 20,
        },
      ]}
    >
      {/* <Text style={{ color: theme.heading }}>CashOutList</Text> */}
      <ScrollView>
        <View>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // borderWidth: 1,
                  // borderColor: "white",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(1),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      height: hp(6),
                      width: wp(13),
                      borderColor: theme.subheading,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  ></View>
                  <View>
                    <Text
                      style={{
                        color: theme.heading,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: theme.subheading,
                        fontFamily: theme.starArenaFont,
                      }}
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: theme.heading,
                    fontFamily: theme.starArenaFont,
                  }}
                >
                  ${item.ammount}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default CashOutList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingTop: hp(2),
  },
});
