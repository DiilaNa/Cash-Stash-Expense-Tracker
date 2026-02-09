import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "@/services/firebase";
import { Totals, TransactionData } from "@/types/Cash";
import { getTransactionsByUser } from "@/services/cashService";
import { useFocusEffect } from "expo-router";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totals, setTotals] = useState<Totals>({
    balance: 0,
    income: 0,
    expense: 0,
  });

    const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);
  
    useFocusEffect(
      React.useCallback(() => {
        setDisplayName(auth.currentUser?.displayName);
      }, []),
    );
  

  useEffect(() => {
    const unsubscribe = getTransactionsByUser((data) => {
      setTransactions(data.transArray);
      setTotals({
        income: data.income,
        expense: data.expense,
        balance: data.income - data.expense,
      });
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1A4D2E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>
              {displayName || "CashStasher"}
            </Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color="#1A4D2E" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            LKR{" "}
            {totals.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.cardStats}>
            <View style={styles.statRow}>
              <Ionicons name="arrow-down-circle" size={20} color="#D2E3C8" />
              <Text style={styles.statText}>
                Income: LKR {totals.income.toLocaleString()}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="arrow-up-circle" size={20} color="#F9EFDB" />
              <Text style={styles.statText}>
                Spent: LKR {totals.expense.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No transactions recorded yet.</Text>
          </View>
        ) : (
          transactions.slice(0, 3).map((item) => {
            const isIncome = item.type === "income";
            return (
              <View
                key={item.id}
                style={[
                  styles.transactionItem,
                  {
                    borderColor: isIncome ? "#D2E3C8" : "#F87171",
                    borderWidth: 1.5,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: isIncome ? "#D2E3C8" : "#FEE2E2" },
                  ]}
                >
                  <Ionicons
                    name={isIncome ? "cash-outline" : "cart-outline"}
                    size={22}
                    color="#1A4D2E"
                  />
                </View>
                <View style={styles.transDetails}>
                  <Text style={styles.transTitle}>
                    {item.description || item.categoryName}
                  </Text>
                  <Text style={styles.transCat}>{item.categoryName}</Text>
                </View>
                <Text
                  style={[
                    styles.transPrice,
                    { color: isIncome ? "#4F6F52" : "#B91C1C" },
                  ]}
                >
                  {isIncome ? "+" : "-"} {item.amount.toLocaleString()}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
  },
  greeting: { fontSize: 14, color: "#739072", fontWeight: "500" },
  userName: { fontSize: 24, color: "#1A4D2E", fontWeight: "800" },
  notifBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 15 },
  balanceCard: {
    backgroundColor: "#1A4D2E",
    margin: 25,
    padding: 30,
    borderRadius: 40,
    shadowColor: "#1A4D2E",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  balanceLabel: {
    color: "#D2E3C8",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 10,
  },
  cardStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(210, 227, 200, 0.3)",
    paddingTop: 20,
  },
  statRow: { flexDirection: "row", alignItems: "center" },
  statText: {
    color: "#D2E3C8",
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1A4D2E" },
  seeAll: { color: "#739072", fontWeight: "600" },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 25,
    marginBottom: 12,
    padding: 15,
    borderRadius: 25,
  },
  iconBox: { padding: 12, borderRadius: 18 },
  transDetails: { flex: 1, marginLeft: 15 },
  transTitle: { fontSize: 16, fontWeight: "600", color: "#2C3639" },
  transCat: { fontSize: 12, color: "#739072", marginTop: 2 },
  transPrice: { fontSize: 16, fontWeight: "700" },
  emptyState: { padding: 40, alignItems: "center" },
  emptyText: { color: "#739072", fontSize: 14 },
});
