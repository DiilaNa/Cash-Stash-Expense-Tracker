import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "@/services/firebase";
import { updateUserProfile } from "@/services/authServices";
import { useLoader } from "@/hooks/useLoader";

export default function UpdateProfile() {
  const router = useRouter();
  const user = auth.currentUser;
  const { showLoader, hideLoader } = useLoader();

  const [name, setName] = useState(user?.displayName || "");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      showLoader();
      await updateUserProfile(name.trim());
      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      hideLoader();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navHeader}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#1A4D2E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.card}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#739072"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#A9AF94"
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email Address (Read Only)</Text>
            <View style={[styles.card, { opacity: 0.6 }]}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#739072"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={user?.email || ""}
                editable={false}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  backBtn: { backgroundColor: "white", padding: 10, borderRadius: 15 },
  headerTitle: { fontSize: 20, fontWeight: "800", color: "#1A4D2E" },
  content: { padding: 25 },
  inputWrapper: { marginBottom: 20 },
  label: {
    color: "#1A4D2E",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 22,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#1A4D2E", fontWeight: "600" },
  saveBtn: {
    backgroundColor: "#1A4D2E",
    padding: 20,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "white", fontWeight: "700", fontSize: 16 },
});
