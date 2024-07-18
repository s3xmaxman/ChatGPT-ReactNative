import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { BlurView } from "expo-blur";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type MessageInputProps = {
  onShouldSendMessage: (message: string) => void;
};

const MessageInput = ({ onShouldSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);

  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 300 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 300 });
  };

  const onChangeText = (text: string) => {
    collapseItems();
    setMessage(text);
  };

  const onSend = () => {
    onShouldSendMessage(message);
    setMessage("");
  };

  const expandBtnStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP
    );
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });

  return (
    <BlurView
      intensity={70}
      style={{ paddingBottom: bottom, paddingTop: 0 }}
      tint="extraLight"
    >
      <View style={styles.row}>
        <ATouchableOpacity
          onPress={expandItems}
          style={[styles.roundBtn, expandBtnStyle]}
        >
          <Ionicons name="add" size={24} color={Colors.grey} />
        </ATouchableOpacity>

        <Animated.View style={[styles.buttonView, buttonViewStyle]}>
          <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
            <Ionicons name="camera-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ImagePicker.launchImageLibraryAsync()}
          >
            <Ionicons name="image-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
            <Ionicons name="folder-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </Animated.View>

        <TextInput
          autoFocus
          placeholder="Message"
          style={styles.messageInput}
          onFocus={collapseItems}
          onChangeText={onChangeText}
          value={message}
          multiline
        />
        {message.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
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
