import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet, Platform, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#1A4D2E",
        tabBarInactiveTintColor: "#A9AF94",
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600", marginBottom: 5 },
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="leaf-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.fab,
                { backgroundColor: focused ? "#1A4D2E" : "#4F6F52" },
              ]}
            >
              <Ionicons name="add" size={32} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Me",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="view"
        options={{
          title: "View",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 20,
    left: 20,
    right: 20,
    borderRadius: 30,
    height: 70,
    borderTopWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: { elevation: 5 },
    }),
  },
  fab: {
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10, // Lifts the button out of the bar
    shadowColor: "#4F6F52",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});
