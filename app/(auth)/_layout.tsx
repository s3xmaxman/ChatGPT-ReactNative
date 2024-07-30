import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SQLiteProvider } from "expo-sqlite/next";

const Layout = () => {
  const router = useRouter();
  return (
    <SQLiteProvider databaseName="chats.db">
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

        <Stack.Screen
          name="(modal)/[url]"
          options={{
            headerTitle: "",
            presentation: "fullScreenModal",
            headerBlurEffect: "dark",
            headerStyle: { backgroundColor: "rgba(0,0,0,0.4)" },
            headerTransparent: true,
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ borderRadius: 20, padding: 4 }}
              >
                <Ionicons name="close-outline" size={28} color={"#fff"} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
};

export default Layout;
