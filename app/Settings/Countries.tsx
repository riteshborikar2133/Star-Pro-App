import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../constants/ThemeContext";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

const Countries = () => {
  const { theme } = useTheme();

  const countries = [
    "United States",
    "Canada",
    "Brazil",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "South Africa",
    "Egypt",
    "India",
    "China",
    "Japan",
    "South Korea",
    "Australia",
    "New Zealand",
    "Mexico",
    "Argentina",
    "Nigeria",
    "Russia",
    "Indonesia",
  ];

  // State to track selected countries
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const toggleSelection = (country: string) => {
    setSelected((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  return (
    <>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../../assets/Close.png")}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>Pro Star</Text>
        <Image
          source={require("../../assets/Menu-right.png")}
          style={styles.logo}
        />
      </View>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.subheading, marginBottom: 10 }}>
          Select Countries
        </Text>

        {/* Grid of checkboxes */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gap: 10,
            marginTop: 12,
            //   borderColor: "red",
            //   borderWidth: 1,
          }}
        >
          {countries.map((item, index) => (
            <View
              key={index}
              style={{
                width: "48%",
                flexDirection: "row",
                alignItems: "center",
                //   justifyContent:'center',
                paddingVertical: 8,
                //   paddingHorizontal:15,
                gap: 10,
              }}
            >
              <Checkbox
                value={!!selected[item]}
                onValueChange={() => toggleSelection(item)}
                color={selected[item] ? "#FFFFFF" : undefined}
                style={{
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={{
                  color: theme.heading,
                  fontFamily: theme.starArenaFont,
                  fontSize: 14,
                }}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default Countries;

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    flex: 1,
    fontFamily: "starArenaFont",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
