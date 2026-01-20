import { useLoader } from "@/hooks/useLoader";
import { registerUser } from "@/services/authServices";
import { RegisterData } from "@/types/Auth";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !conPassword) {
      Alert.alert("Please fill all fields...!");
      return;
    }
    if (password !== conPassword) {
      Alert.alert("Password do not match...!");
      return;
    }
    const userdata: RegisterData = {
      fullname: fullName,
      email: email,
      password: password,
      confirmPassword: conPassword,
    };

    try {
      showLoader();
      await registerUser(userdata);
      Alert.alert("Account created..!");
      router.replace("/login");
    } catch (e) {
      console.error(e);
      Alert.alert("Register fail..!");
    } finally {
      hideLoader();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.centeredContent}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Branding Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.brandSubtitle}>CASHSTASH</Text>
          <Text style={styles.brandTitle}>Join Us</Text>
        </View>

        {/* Glass Form Panel */}
        <View style={styles.glassPanel}>
          <Text style={styles.loginTitle}>Create Account</Text>

          {/* Full Name Input */}
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#7D8F69"
            style={styles.inputField}
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Email Input */}
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#7D8F69"
            style={styles.inputField}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Create Password"
              placeholderTextColor="#7D8F69"
              secureTextEntry={!showPassword}
              style={{ flex: 1, color: "#1a4d2e" }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#527853"
              />
            </TouchableOpacity>
          </View>

          {/* Password Confirm Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#7D8F69"
              secureTextEntry={!showConfirmPassword}
              style={{ flex: 1, color: "#1a4d2e" }}
              value={conPassword}
              onChangeText={setConPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="#527853"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.registerButton, isLoading && { opacity: 0.7 }]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={{ color: "#666" }}>Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  brandSubtitle: {
    color: "#e2e8f0",
    letterSpacing: 4,
    fontWeight: "600",
    fontSize: 12,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 8,
  },
  glassPanel: {
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    padding: 32,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  loginTitle: {
    color: "#1a4d2e",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  inputField: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 16,
    color: "#1a4d2e",
  },
  passwordContainer: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  registerButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#064e3b",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  linkText: {
    color: "#1a4d2e",
    fontWeight: "700",
  },
});
