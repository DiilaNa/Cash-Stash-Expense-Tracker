import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Stats() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Monthly Stats</Text>

      {/* Placeholder for Chart */}
      <View style={styles.chartPlaceholder}>
        <View style={styles.barContainer}>
          <View
            style={[styles.bar, { height: "60%", backgroundColor: "#D2E3C8" }]}
          />
          <View
            style={[styles.bar, { height: "80%", backgroundColor: "#1A4D2E" }]}
          />
          <View
            style={[styles.bar, { height: "40%", backgroundColor: "#D2E3C8" }]}
          />
          <View
            style={[styles.bar, { height: "90%", backgroundColor: "#4F6F52" }]}
          />
        </View>
        <Text style={styles.chartLabel}>Spending Trend (Last 4 Months)</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoVal}>LKR 45k</Text>
          <Text style={styles.infoLabel}>Avg. Spend</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoVal}>LKR 12k</Text>
          <Text style={styles.infoLabel}>Top Category</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE", padding: 25 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A4D2E",
    marginBottom: 30,
  },
  chartPlaceholder: {
    backgroundColor: "white",
    height: 250,
    borderRadius: 30,
    padding: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 150,
    width: "100%",
    justifyContent: "space-around",
  },
  bar: { width: 40, borderRadius: 10 },
  chartLabel: { marginTop: 20, color: "#739072", fontWeight: "600" },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  infoCard: {
    backgroundColor: "white",
    width: "47%",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  infoVal: { fontSize: 20, fontWeight: "800", color: "#1A4D2E" },
  infoLabel: { color: "#739072", fontSize: 12, marginTop: 5 },
});
