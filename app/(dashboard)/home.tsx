import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>CashStasher</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color="#1A4D2E" />
          </TouchableOpacity>
        </View>

        {/* Main Balance Card (Unique Nature Style) */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>LKR 145,250.00</Text>
          <View style={styles.cardStats}>
            <View className="flex-row items-center">
              <Ionicons name="arrow-down-circle" size={20} color="#D2E3C8" />
              <Text style={styles.statText}>Income: +12%</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="arrow-up-circle" size={20} color="#F9EFDB" />
              <Text style={styles.statText}>Spent: -5%</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Example Transaction Items */}
        {[
          {
            id: 1,
            title: "Grocery Store",
            cat: "Food",
            price: "-1,200",
            icon: "cart-outline",
            color: "#E8F3D6",
          },
          {
            id: 2,
            title: "Salary Drop",
            cat: "Work",
            price: "+85,000",
            icon: "cash-outline",
            color: "#D2E3C8",
          },
          {
            id: 3,
            title: "Netflix Subscription",
            cat: "Ent.",
            price: "-1,500",
            icon: "play-outline",
            color: "#F9EFDB",
          },
        ].map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={22} color="#1A4D2E" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.transTitle}>{item.title}</Text>
              <Text style={styles.transCat}>{item.cat}</Text>
            </View>
            <Text
              style={[
                styles.transPrice,
                { color: item.price.startsWith("+") ? "#4F6F52" : "#2C3639" },
              ]}
            >
              {item.price}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE" },
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
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 32,
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
  statText: { color: "#D2E3C8", marginLeft: 8, fontSize: 12 },
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
  transTitle: { fontSize: 16, fontWeight: "600", color: "#2C3639" },
  transCat: { fontSize: 12, color: "#739072", marginTop: 2 },
  transPrice: { fontSize: 16, fontWeight: "700" },
});
