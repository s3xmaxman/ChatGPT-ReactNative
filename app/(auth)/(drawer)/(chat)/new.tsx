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

const Page = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState("3.5");
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
                { key: "3.5", title: "GPT-3.5", icon: "bolt" },
                { key: "4", title: "GPT-4", icon: "sparkles" },
              ]}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <Text>Dummy Content</Text>
        <Button title="Sign Out" onPress={() => signOut()} />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Page;
