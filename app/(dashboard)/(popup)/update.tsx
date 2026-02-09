import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { updateTransaction } from "@/services/cashService";
import { useLoader } from "@/hooks/useLoader";

export default function UpdateTransaction() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (params.amount) setAmount(params.amount as string);
    if (params.description) setDescription(params.description as string);
  }, [params.id]);

  const [amount, setAmount] = useState(params.amount as string);
  const [description, setDescription] = useState(params.description as string);

  const handleUpdate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    try {
      showLoader();
      await updateTransaction(params.id as string, {
        amount: parseFloat(amount),
        description: description.trim(),
      });
      Alert.alert("Success", "Transaction updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update record.");
    } finally {
      hideLoader();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.navHeader}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Ionicons name="chevron-back" size={24} color="#1A4D2E" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Details</Text>
            <View style={{ width: 40 }} />
          </View>

          <Text style={styles.subtitle}>
            Modify your transaction information below
          </Text>

          {/* Amount Field */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Amount (LKR)</Text>
            <View style={styles.card}>
              <Ionicons
                name="wallet-outline"
                size={20}
                color="#739072"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor="#A9AF94"
              />
            </View>
          </View>

          {/* Description Field */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Description</Text>
            <View style={[styles.card, styles.textAreaCard]}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#739072"
                style={[styles.inputIcon, { marginTop: 2 }]}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                multiline
                placeholder="What was this for?"
                placeholderTextColor="#A9AF94"
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleUpdate}
              activeOpacity={0.8}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelText}>Discard Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE" },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backBtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A4D2E",
  },
  subtitle: {
    fontSize: 14,
    color: "#739072",
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  inputWrapper: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  label: {
    color: "#1A4D2E",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginLeft: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 22,
    shadowColor: "#1A4D2E",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  textAreaCard: {
    alignItems: "flex-start",
    minHeight: 120,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#1A4D2E",
    fontWeight: "600",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 0,
  },
  buttonContainer: {
    paddingHorizontal: 25,
    marginTop: 10,
    paddingBottom: 40,
  },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#1A4D2E",
    padding: 20,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1A4D2E",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  saveText: { color: "white", fontWeight: "700", fontSize: 16 },
  cancelBtn: {
    marginTop: 15,
    padding: 15,
    alignItems: "center",
  },
  cancelText: {
    color: "#739072",
    fontWeight: "600",
    fontSize: 14,
  },
});
