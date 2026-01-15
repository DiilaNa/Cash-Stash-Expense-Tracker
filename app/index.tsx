import React from "react";
import "../global.css";
import { View, Text } from "react-native"; // Added Text here

export default function index() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-black">Hi</Text>
      <Text>fr</Text>
    </View>
  );
}
