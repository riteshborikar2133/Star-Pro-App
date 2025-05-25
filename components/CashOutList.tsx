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
    { name: "Tom", date: "12 May 2025", ammount: 2345 },
    { name: "Sarah", date: "08 Apr 2025", ammount: 1890 },
    { name: "Liam", date: "22 Mar 2025", ammount: 4520 },
    { name: "Emma", date: "15 May 2025", ammount: 3175 },
    { name: "Noah", date: "01 Feb 2025", ammount: 2870 },
    { name: "Olivia", date: "28 Jan 2025", ammount: 3999 },
    { name: "James", date: "10 Mar 2025", ammount: 2280 },
    { name: "Ava", date: "17 May 2025", ammount: 3540 },
    { name: "Lucas", date: "05 Apr 2025", ammount: 4785 },
    { name: "Mia", date: "30 Mar 2025", ammount: 2040 },
    { name: "Elijah", date: "11 May 2025", ammount: 5100 },
    { name: "Sophia", date: "09 Feb 2025", ammount: 3895 },
    { name: "William", date: "14 Apr 2025", ammount: 2650 },
    { name: "Isabella", date: "06 Mar 2025", ammount: 1980 },
    { name: "Benjamin", date: "19 Jan 2025", ammount: 2995 },
    { name: "Emily", date: "23 Apr 2025", ammount: 3350 },
    { name: "Henry", date: "27 Mar 2025", ammount: 4080 },
    { name: "Charlotte", date: "18 Feb 2025", ammount: 2220 },
    { name: "Jack", date: "04 May 2025", ammount: 2750 },
    { name: "Amelia", date: "02 Apr 2025", ammount: 3595 },
    { name: "Alexander", date: "13 Mar 2025", ammount: 4900 },
    { name: "Harper", date: "16 Jan 2025", ammount: 1770 },
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: hp(2),
                  paddingHorizontal: wp(3),
                  // borderBottomWidth: 1,
                  borderBottomColor: theme.subheading,
                  paddingBottom: hp(1),
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
                    $ {item.ammount}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.starArenaFont,
                      color: theme.subheading,
                      fontSize: hp(2),
                    }}
                  >
                    {item.date}
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
                    Successful
                  </Text>
                </View>
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
