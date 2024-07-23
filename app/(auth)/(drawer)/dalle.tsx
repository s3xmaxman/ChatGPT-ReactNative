import ChatMessage from "@/components/ChatMessage";
import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Message, Role } from "@/utils/Interfaces";
import { keyStorage } from "@/utils/Storage";
import { FlashList } from "@shopify/flash-list";
import { Redirect, Stack } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useMMKVString } from "react-native-mmkv";
import OpenAI from "react-native-openai";

const Page = () => {
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="DALL·E"
              onSelect={() => {}}
              items={[
                {
                  key: "share",
                  title: "Share GPT",
                  icon: "square.and.arrow.up",
                },
                { key: "details", title: "See Details", icon: "info.circle" },
                { key: "keep", title: "Keep in Sidebar", icon: "pin" },
              ]}
            />
          ),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: "#000",
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.greyLight,
  },
  image: {
    resizeMode: "cover",
  },
  page: {
    flex: 1,
  },
  label: {
    color: Colors.grey,
    fontSize: 16,
  },
});

export default Page;
