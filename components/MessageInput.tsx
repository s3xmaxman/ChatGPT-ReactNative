import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { BlurView } from "expo-blur";

export type MessageInputProps = {
  onShouldSendMessage: (message: string) => void;
};

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);
  return (
    <BlurView
      intensity={90}
      style={{ paddingBottom: bottom, paddingTop: 0 }}
      tint="extraLight"
    >
      <View style={styles.row}></View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});

export default MessageInput;
