import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/settings"
        options={{
          headerTitle: "Settings",
          presentation: "modal",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.selected },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.navigate("/auth")}
              style={{
                backgroundColor: Colors.greyLight,
                borderRadius: 20,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={16} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
