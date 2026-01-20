import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authServices";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleLogin = async () => {
    if (!email || !password || isLoading) {
      Alert.alert("Please enter email and password");
      return;
    }
    try {
      showLoader();
      await login(email, password);
      router.replace("/home");
    } catch (e) {
      console.error(e);
      Alert.alert("Login fail");
    } finally {
      hideLoader();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.centeredContent}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.brandSubtitle}>CASHSTASH</Text>
        <Text style={styles.brandTitle}>Welcome Back</Text>
      </View>

      <View style={styles.glassPanel}>
        <Text style={styles.loginTitle}>Login to Account</Text>

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#7D8F69"
          style={styles.inputField}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
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

        <TouchableOpacity 
          activeOpacity={0.8}
         style={[styles.signInButton,isLoading && { opacity: 0.7} ]}
        onPress={handleLogin}
        disabled={isLoading}
        >
          {isLoading ?(
            <ActivityIndicator color="#ffffff" />
          ):(
          <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={{ color: "#666" }}>New here? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Create Account</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  brandSubtitle: {
    color: "#e2e8f0", // stone-200
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
    color: "#1a4d2e", // emerald-900
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
  signInButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#064e3b", // emerald-900/800
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
