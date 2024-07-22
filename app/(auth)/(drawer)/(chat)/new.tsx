import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import { Message, Role } from "@/utils/Interfaces";
import ChatMessage from "@/components/ChatMessage";
import { FlashList } from "@shopify/flash-list";
import { useMMKVString } from "react-native-mmkv";
import { keyStorage, storage } from "@/utils/Storage";

const DUMMY_MESSAGES: Message[] = [
  {
    content: "Hello, how are you?",
    role: Role.Bot,
  },
  {
    content: "I'm doing well, thank you!",
    role: Role.User,
  },
];

const Page = () => {
  const { signOut } = useAuth();
  const [height, setHeight] = useState(0);
  const [gptVersion, setGptVersion] = useMMKVString("gptVersion", storage);
  const [messages, setMessages] = useState<Message[]>([]);
  const [key, setKey] = useMMKVString("apiKey", keyStorage);
  const [organization, setOrganization] = useMMKVString("org", keyStorage);

  // if (!key || key === "" || !organization || organization === "") {
  //   return <Redirect href={"/(auth)/(modal)/settings"} />;
  // }

  const getCompletion = () => {
    console.log("getCompletion");
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
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
      <View style={styles.page} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              source={require("@/assets/images/logo-white.png")}
              style={styles.image}
            />
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
        />
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

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  page: {
    flex: 1,
  },
});

export default Page;
