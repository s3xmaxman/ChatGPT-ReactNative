import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import { Message } from "@/utils/Interfaces";

const Page = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState("3.5");
  const [messages, setMessages] = useState<Message[]>([]);
  const getCompletion = () => {
    console.log("getCompletion");
  };
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="ChatGPT"
              onSelect={(key) => {
                setGptVersion(key);
              }}
              selected={gptVersion}
              items={[
                { key: "3.5", title: "GPT-4o mini", icon: "bolt" },
                { key: "4", title: "GPT-4o", icon: "sparkles" },
              ]}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <Button title="Sign Out" onPress={() => signOut()} />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Page;
