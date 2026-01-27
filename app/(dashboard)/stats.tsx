import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import { getStatsData } from "@/services/cashService";

const screenWidth = Dimensions.get("window").width;

export default function Stats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = getStatsData((data) => {
      setStats(data);
      setLoading(false);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading || !stats) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#1A4D2E" size="large" />
      </View>
    );
  }

  const savingsRatio =
    stats.totalIncome > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((stats.totalIncome - stats.totalExpense) / stats.totalIncome) *
              100,
          ),
        )
      : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Financial Analytics</Text>

        <View style={styles.healthCard}>
          <View style={styles.healthTextContent}>
            <Text style={styles.healthTitle}>Stash Score</Text>
            <Text style={styles.healthDesc}>
              Saving {savingsRatio.toFixed(0)}% of your earnings
            </Text>
          </View>
          <View
            style={[
              styles.scoreCircle,
              { borderColor: savingsRatio > 20 ? "#D2E3C8" : "#F87171" },
            ]}
          >
            <Text style={styles.scoreText}>{savingsRatio.toFixed(0)}</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Spending Distribution</Text>
          {stats.pieData.length > 0 ? (
            <PieChart
              data={stats.pieData}
              width={screenWidth - 60}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 77, 46, ${opacity})`,
              }}
              accessor={"amount"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          ) : (
            <Text style={styles.emptyText}>Add expenses to see analysis</Text>
          )}
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoVal}>
              LKR {(stats.totalExpense / 30).toFixed(0)}
            </Text>
            <Text style={styles.infoLabel}>Daily Avg.</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={[styles.infoVal, { fontSize: 14 }]}>
              {stats.topCategory}
            </Text>
            <Text style={styles.infoLabel}>Top Category</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE", paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A4D2E",
    marginVertical: 20,
  },
  healthCard: {
    backgroundColor: "#1A4D2E",
    borderRadius: 30,
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  healthTextContent: { flex: 1 },
  healthTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  healthDesc: { color: "#D2E3C8", fontSize: 12, marginTop: 5 },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: { color: "white", fontWeight: "800", fontSize: 18 },
  chartCard: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A4D2E",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 100,
  },
  infoCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  infoVal: { fontSize: 18, fontWeight: "800", color: "#1A4D2E" },
  infoLabel: { color: "#739072", fontSize: 12, marginTop: 5 },
  emptyText: { color: "#739072", marginVertical: 40 },
});
