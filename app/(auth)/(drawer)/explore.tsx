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

// セクションの定義
const sections = [
  {
    title: "おすすめ",
    label: "今週の厳選されたおすすめ",
  },
  {
    title: "Dall·E",
    label: "あなたのアイデアを素晴らしい画像に変換",
  },
  {
    title: "ライティング",
    label: "作成、編集、スタイルの洗練のためのツールでライティングを強化",
  },
  {
    title: "生産性",
    label: "効率を向上させる",
  },
  {
    title: "研究と分析",
    label: "情報を見つけ、評価し、解釈し、視覚化する",
  },
  {
    title: "プログラミング",
    label: "コードを書く、デバッグ、テスト、学ぶ",
  },
];

const explore = () => {
  return (
    <View>
      <Text>explore</Text>
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
