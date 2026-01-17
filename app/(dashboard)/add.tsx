import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES = [
  { id: "1", name: "Salary", icon: "cash-outline", type: "income" },
  { id: "2", name: "Food", icon: "fast-food-outline", type: "expense" },
  { id: "3", name: "Transport", icon: "bus-outline", type: "expense" },
  { id: "4", name: "Gift", icon: "gift-outline", type: "income" },
];

export default function AddTransaction() {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCat, setSelectedCat] = useState("2");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add Transaction</Text>

        {/* 1. Income/Expense Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setType("expense")}
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
            onPress={() => setType("income")}
            style={[styles.toggleBtn, type === "income" && styles.activeIncome]}
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

        {/* 2. Amount Input */}
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

        {/* 3. Description Input */}
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

        {/* 4. Dynamic Categories */}
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.catGrid}>
          {CATEGORIES.filter((c) => c.type === type || type === "expense").map(
            (cat) => (
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
            )
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.saveBtn,
            { backgroundColor: type === "income" ? "#4F6F52" : "#1A4D2E" },
          ]}
        >
          <Text style={styles.saveBtnText}>
            Save {type === "income" ? "Income" : "Expense"}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
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
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
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
});
