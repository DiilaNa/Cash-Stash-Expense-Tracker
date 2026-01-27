import { useLoader } from "@/hooks/useLoader";
import { addTransaction, getCurrentBalance } from "@/services/cashService";
import { auth } from "@/services/firebase";
import { TransactionData } from "@/types/Cash";
import { Ionicons } from "@expo/vector-icons";
import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

const CATEGORIES = [
  { id: "inc-1", name: "Salary", icon: "cash-outline", type: "income" },
  {
    id: "inc-2",
    name: "Investments",
    icon: "trending-up-outline",
    type: "income",
  },
  { id: "inc-3", name: "Gifts", icon: "gift-outline", type: "income" },
  {
    id: "inc-4",
    name: "Refunds",
    icon: "refresh-circle-outline",
    type: "income",
  },
  { id: "inc-5", name: "Scholarship", icon: "school-outline", type: "income" },
  { id: "inc-6", name: "Freelance", icon: "laptop-outline", type: "income" },
  {
    id: "exp-1",
    name: "Food & Drinks",
    icon: "fast-food-outline",
    type: "expense",
  },
  { id: "exp-2", name: "Transport", icon: "bus-outline", type: "expense" },
  { id: "exp-3", name: "Shopping", icon: "cart-outline", type: "expense" },
  { id: "exp-4", name: "Rent/Bills", icon: "home-outline", type: "expense" },
  { id: "exp-5", name: "Entertainment", icon: "film-outline", type: "expense" },
  { id: "exp-6", name: "Education", icon: "book-outline", type: "expense" },
];

export default function AddTransaction() {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState("exp-1");
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMsg] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to save transactions");
      return;
    }

    const numericAmount = parseFloat(amount);
    const transactionData: TransactionData = {
      userId: user.uid,
      type: type,
      amount: numericAmount,
      description: description.trim(),
      categoryId: selectedCat,
      categoryName:
        CATEGORIES.find((c) => c.id === selectedCat)?.name || "General",
      createdAt: serverTimestamp(),
    };

    try {
      showLoader();

      const currentBalance = await getCurrentBalance();

      await addTransaction(transactionData);

      if (type === "expense") {
        const newBalance = currentBalance - numericAmount;
        if (newBalance <= 1000) {
          Toast.show(`⚠️ Low Balance: Rs. ${newBalance.toFixed(2)}`, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: "#B91C1C",
          });
        }
      }

      Alert.alert("Success", "Transaction added successfully!");
      setAmount("");
      setDescription("");
    } catch (e) {
      Alert.alert("Error", "Failed to save transaction.");
    } finally {
      hideLoader();
    }
  };

  return (
    <RootSiblingParent>
      <SafeAreaView style={styles.container}>
        {showBanner && (
          <View style={styles.bannerContainer}>
            <Ionicons name="warning" size={20} color="white" />
            <Text style={styles.bannerText}>{bannerMsg}</Text>
            <TouchableOpacity onPress={() => setShowBanner(false)}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Add Transaction</Text>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => {
                setType("expense");
                setSelectedCat("exp-1");
              }}
              style={[
                styles.toggleBtn,
                type === "expense" && styles.activeExpense,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  type === "expense" && styles.activeText,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType("income");
                setSelectedCat("inc-1");
              }}
              style={[
                styles.toggleBtn,
                type === "income" && styles.activeIncome,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  type === "income" && styles.activeText,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Amount (LKR)</Text>
            <TextInput
              style={[
                styles.amountInput,
                { color: type === "income" ? "#4F6F52" : "#1A4D2E" },
              ]}
              keyboardType="decimal-pad"
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.descInput}
              placeholder="What was this for?"
              placeholderTextColor="#A9AF94"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.catGrid}>
            {CATEGORIES.filter((c) => c.type === type).map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCat(cat.id)}
                style={[
                  styles.catItem,
                  selectedCat === cat.id && styles.catActive,
                ]}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={24}
                  color={selectedCat === cat.id ? "white" : "#1A4D2E"}
                />
                <Text
                  style={[
                    styles.catText,
                    selectedCat === cat.id && { color: "white" },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSave}
            style={[
              styles.saveBtn,
              { backgroundColor: type === "income" ? "#4F6F52" : "#1A4D2E" },
              isLoading && { opacity: 0.7 },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.saveBtnText}>
                Save {type === "income" ? "Income" : "Expense"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE", paddingHorizontal: 25 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A4D2E",
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    padding: 5,
    marginBottom: 25,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 15,
  },
  activeExpense: { backgroundColor: "#1A4D2E" },
  activeIncome: { backgroundColor: "#4F6F52" },
  toggleText: { fontWeight: "700", color: "#739072" },
  activeText: { color: "white" },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    color: "#739072",
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 12,
    textTransform: "uppercase",
  },
  amountInput: { fontSize: 36, fontWeight: "800" },
  descInput: { fontSize: 16, color: "#1A4D2E", minHeight: 40 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A4D2E",
    marginBottom: 15,
  },
  catGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  catItem: {
    width: "47%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  catActive: { backgroundColor: "#4F6F52" },
  catText: { marginTop: 8, fontWeight: "600", color: "#1A4D2E" },
  saveBtn: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: { color: "white", fontSize: 18, fontWeight: "700" },
  bannerContainer: {
    backgroundColor: "#B91C1C",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  bannerText: {
    color: "white",
    flex: 1,
    marginHorizontal: 10,
    fontWeight: "600",
  },
});
