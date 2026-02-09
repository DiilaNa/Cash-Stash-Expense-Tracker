import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { auth } from "@/services/firebase";
import { logoutUser } from "@/services/authServices";

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName);

  useFocusEffect(
    React.useCallback(() => {
      setDisplayName(auth.currentUser?.displayName);
    }, []),
  );

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logoutUser();
            router.replace("/login");
          } catch (e) {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  const ProfileOption = ({
    icon,
    title,
    subtitle,
    onPress,
    color = "#1A4D2E",
  }: any) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#A9AF94" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </Text>
          </View>
          <Text style={styles.userName}>
            {displayName || "CashStasher"}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Account Settings</Text>
          <ProfileOption
            icon="person-outline"
            title="Personal Information"
            subtitle="Update your name and email"
            onPress={() => {
              router.push("/updateprofile");
            }}
          />
          <ProfileOption
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage alerts and reminders"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Support</Text>
          <ProfileOption
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => {}}
          />
          <ProfileOption
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() => {}}
          />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#B91C1C" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>CashStash v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F1EE" },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: "#1A4D2E",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1A4D2E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: { color: "white", fontSize: 40, fontWeight: "800" },
  userName: { fontSize: 22, fontWeight: "800", color: "#1A4D2E" },
  userEmail: { fontSize: 14, color: "#739072", marginTop: 4 },
  section: { paddingHorizontal: 25, marginTop: 30 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#739072",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 15,
    marginLeft: 5,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
  },
  optionTextContainer: { flex: 1, marginLeft: 15 },
  optionTitle: { fontSize: 16, fontWeight: "700", color: "#2C3639" },
  optionSubtitle: { fontSize: 12, color: "#A9AF94", marginTop: 2 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    marginTop: 40,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
  },
  logoutText: {
    color: "#B91C1C",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
  versionText: {
    textAlign: "center",
    color: "#A9AF94",
    fontSize: 12,
    marginTop: 30,
    marginBottom: 100,
  },
});
