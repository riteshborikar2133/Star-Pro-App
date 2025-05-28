import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../constants/ThemeContext";
import OtherHeader from "../../components/OtherPageHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const ManageAdmin = () => {
  const { theme } = useTheme();
  const admin = [
    { id: 1, name: "Tom Clam" },
    { id: 2, name: "Sara Knight" },
    { id: 3, name: "Mike Jensen" },
    { id: 4, name: "Lena Adams" },
    { id: 5, name: "David York" },
    { id: 6, name: "Nina Brooks" },
    { id: 7, name: "Chris Moore" },
    { id: 8, name: "Ashley Green" },
    { id: 9, name: "Brian Smith" },
    { id: 10, name: "Olivia Carter" },
    { id: 11, name: "Ethan Scott" },
    { id: 12, name: "Sophia Bennett" },
    { id: 13, name: "Jack Turner" },
    { id: 14, name: "Emma Collins" },
    { id: 15, name: "Ryan Lee" },
    { id: 16, name: "Chloe Morris" },
    { id: 17, name: "Nathan Ross" },
    { id: 18, name: "Grace Watson" },
    { id: 19, name: "Lucas Rivera" },
    { id: 20, name: "Ava James" },
  ];
  return (
    <>
      <OtherHeader title="Manage Admin" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {admin.map((item) => {
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: hp(1),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 15,
                    }}
                  >
                    <View
                      style={{
                        height: hp(6),
                        width: wp(13),
                        backgroundColor: theme.subheading,
                        borderRadius: 10,
                      }}
                    ></View>
                    <View>
                      <Text
                        style={{
                          fontFamily: theme.starArenaFont,
                          color: theme.heading,
                          fontSize: hp(2),
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: theme.starArenaFont,
                          color: theme.subheading,
                          fontSize: hp(1.8),
                        }}
                      >
                        # {item.id}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require("../../assets/Icon/Settings/delete.png")}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ManageAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
