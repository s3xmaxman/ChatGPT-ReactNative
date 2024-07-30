import Colors from "@/constants/Colors";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Header,
  getHeaderTitle,
  useHeaderHeight,
} from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  RollInLeft,
} from "react-native-reanimated";
import React from "react";

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const explore = () => {
  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Ionicons name="search" size={24} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  sectionBtn: {
    backgroundColor: Colors.input,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionBtnSelected: {
    backgroundColor: Colors.grey,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionBtnText: {
    color: "#000",
    fontWeight: "500",
  },
  sectionBtnTextSelected: {
    color: "#fff",
    fontWeight: "500",
  },
  card: {
    borderRadius: 8,
    backgroundColor: Colors.input,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: 14,
    color: "#000",
  },
  cardAuthor: {
    fontSize: 14,
    color: "#666",
  },
});

export default explore;
