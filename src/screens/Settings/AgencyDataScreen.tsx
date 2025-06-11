import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useTheme } from "../../constant/ThemeContext";
import OtherHeader from "../../components/OtherHeader";

// Types
type RootStackParamList = {
  AgencyData: { agencyName: string };
};

type AgencyDataRouteProp = RouteProp<RootStackParamList, "AgencyData">;

const getMonthList = () => {
  const now = new Date();
  const months = [];

  months.push({ label: "This Month", date: new Date(now) });
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  months.push({ label: "Last Month", date: lastMonth });

  for (let i = 2; i < 14; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString("default", { month: "long", year: "numeric" }),
      date: d,
    });
  }

  return months;
};

const generateMockData = () => {
  const tiers = ["Silver", "Gold", "Bronze"];
  return getMonthList().map((item, index) => {
    const tier = tiers[index % 3];
    const commission = Math.floor(Math.random() * 5000) + 1000;

    return {
      key: index.toString(),
      month: item.label,
      tier,
      commission: `${commission}`,
    };
  });
};

const AgencyDataScreen = () => {
  const { theme } = useTheme();
  const route = useRoute<AgencyDataRouteProp>();
  const { agencyName } = route.params;

  const title = typeof agencyName === "string" ? agencyName : "Agency";
  const commissionData = generateMockData();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <OtherHeader title={title} />

      <View style={styles.container}>
        <View style={[styles.row, styles.headerRow, { backgroundColor: "#333" }]}>
          <Text style={[styles.cell, styles.headerText, { color: "#fff", flex: 1.5 }]}>
            Month
          </Text>
          <Text style={[styles.cell, styles.headerText, { color: "#fff" }]}>Tier</Text>
          <Text style={[styles.cell, styles.headerText, { color: "#fff" }]}>
            Commission
          </Text>
        </View>

        <FlatList
          data={commissionData}
          renderItem={({ item }) => (
            <View style={[styles.row, { backgroundColor: theme.background }]}>
              <Text style={[styles.cell, { flex: 1.5, color: theme.heading }]}>
                {item.month}
              </Text>
              <Text style={[styles.cell, { color: theme.heading }]}>{item.tier}</Text>
              <View
                style={[
                  styles.cell,
                  { flexDirection: "row", gap: 5, alignItems: "center" },
                ]}
              >
                <Image
                  source={require("../../../assets/Icon/diamond.png")}
                  style={{ width: wp(4), height: hp(2) }}
                />
                <Text style={{ color: theme.heading }}>{item.commission}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </SafeAreaView>
  );
};

export default AgencyDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  headerRow: {
    borderBottomWidth: 2,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
