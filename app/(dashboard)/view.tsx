import { useLoader } from "@/hooks/useLoader";
import {
  deleteTransactions,
  getTransactionsByUser,
} from "@/services/cashService";
import { TransactionData } from "@/types/Cash";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewTransactions() {
    const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const unsubscribe = getTransactionsByUser((data) => {
      setTransactions(data.transArray);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "This action cannot be undone. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              showLoader();
              await deleteTransactions(id);
            } catch (error) {
              Alert.alert("Error", "Failed to delete record.");
            } finally {
              hideLoader();
            }
          },
        },
      ],
    );
  };


  const handleUpdate = (item: TransactionData) => {
    router.push({
      pathname: "/update",
      params: {
        id: item.id,
        amount: item.amount.toString(),
        description: item.description,
        category: item.categoryName,
      },
    });
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const renderItem = ({ item }: { item: TransactionData }) => {
    const isIncome = item.type === "income";

    return (
      <View
        style={[styles.card, { borderColor: isIncome ? "#D2E3C8" : "#F87171" }]}
      >
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isIncome ? "#D2E3C8" : "#FEE2E2" },
            ]}
          >
            <Ionicons
              name={isIncome ? "arrow-down-outline" : "arrow-up-outline"}
              size={20}
              color="#1A4D2E"
            />
          </View>
          <View style={styles.textDetails}>
            <Text style={styles.title}>
              {item.description || "No Description"}
            </Text>
            <Text style={styles.category}>{item.categoryName}</Text>
          </View>
          <Text
            style={[styles.amount, { color: isIncome ? "#4F6F52" : "#B91C1C" }]}
          >
            {isIncome ? "+" : "-"} LKR {item.amount.toLocaleString()}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              handleUpdate(item)
            }
          >
            <Ionicons name="pencil-outline" size={18} color="#739072" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => item.id && handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#B91C1C" />
            <Text style={[styles.actionText, { color: "#B91C1C" }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A4D2E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <Text style={styles.headerSub}>
          {transactions.length} Total Records
        </Text>
      </View>

      <FlatList
        data={transactions.slice(0, visibleCount)}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listPadding}
        ListFooterComponent={() =>
          visibleCount < transactions.length ? (
            <TouchableOpacity style={styles.loadMoreBtn} onPress={loadMore}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            You haven't added any transactions yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 25 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#1A4D2E" },
  headerSub: { fontSize: 14, color: "#739072", marginTop: 4 },
  listPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1.5,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  iconContainer: { padding: 10, borderRadius: 15 },
  textDetails: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: "700", color: "#2C3639" },
  category: { fontSize: 12, color: "#739072", marginTop: 2 },
  amount: { fontSize: 16, fontWeight: "800" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  actionBtn: { flexDirection: "row", alignItems: "center", marginLeft: 20 },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#739072",
  },
  loadMoreBtn: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#1A4D2E",
    borderRadius: 15,
    marginTop: 10,
  },
  loadMoreText: { color: "white", fontWeight: "700" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#739072" },
});
