import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type MessageInputProps = {
  onShouldSendMessage: (message: string) => void;
};

const MessageInput = ({ onShouldSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);

  const expandItems = () => {
    // TODO
  };

  const collappseItems = () => {
    // TODO
  };

  return (
    <BlurView
      intensity={90}
      style={{ paddingBottom: bottom, paddingTop: 0 }}
      tint="extraLight"
    >
      <View style={styles.row}>
        <ATouchableOpacity onPress={expandItems} style={[styles.roundBtn]}>
          <Ionicons name="add" size={24} color={Colors.grey} />
        </ATouchableOpacity>
        <TextInput
          style={styles.messageInput}
          autoFocus
          placeholder="Message"
          multiline
          value={message}
          onChangeText={setMessage}
        />
        {message.length > 0 ? (
          <TouchableOpacity>
            <Ionicons
              name="arrow-up-circle-outline"
              size={24}
              color={Colors.grey}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={24} color={Colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: Colors.greyLight,
    backgroundColor: Colors.light,
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.input,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

export default MessageInput;
