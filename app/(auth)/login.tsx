import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router"; // Use Link for navigation
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient"; // Optional: for extra polish

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Deep Nature Palette
  const colors = {
    primary: "#527853", // Deep Forest Green
    textLight: "#FFFFFF",
    textDark: "#1A4D2E",
    glass: "rgba(255, 255, 255, 0.85)", // Translucent white
    accent: "#F9EFDB",
  };

  return (
    <View style={styles.container}>
      {/* Background Image - Mentally soothing forest/nature theme */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop",
        }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}
          style={styles.overlay}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flex}
          >
            <View style={styles.content}>
              {/* Top Section */}
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000)}
                style={styles.header}
              >
                <Text style={styles.brandText}>CashStash</Text>
                <Text style={styles.title}>Secure your future.</Text>
              </Animated.View>

              {/* Glass Form Panel */}
              <Animated.View
                entering={FadeInUp.delay(400).duration(1000)}
                style={[styles.glassPanel, { backgroundColor: colors.glass }]}
              >
                <Text style={[styles.loginLabel, { color: colors.textDark }]}>
                  Login to Account
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#7D8F69"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.passwordWrapper}>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#7D8F69"
                      style={styles.flex}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={20}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.button, { backgroundColor: colors.primary }]}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Navigation to Register */}
                <View style={styles.footer}>
                  <Text style={{ color: "#444" }}>Don't have an account? </Text>
                  <Link href="/register" asChild>
                    <TouchableOpacity>
                      <Text
                        style={[styles.registerLink, { color: colors.primary }]}
                      >
                        Register Now
                      </Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </Animated.View>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, justifyContent: "center" },
  content: { paddingHorizontal: 25 },
  header: { marginBottom: 30, alignItems: "center" },
  brandText: {
    fontSize: 18,
    color: "#F9EFDB",
    fontWeight: "600",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
  },
  glassPanel: {
    padding: 25,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  loginLabel: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: { marginBottom: 15 },
  input: {
    height: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  passwordWrapper: {
    height: 60,
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  button: {
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#527853",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  footer: { marginTop: 20, flexDirection: "row", justifyContent: "center" },
  registerLink: { fontWeight: "700" },
});
