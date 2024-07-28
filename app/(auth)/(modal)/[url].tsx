import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const page = () => {
  const { url, params } = useLocalSearchParams<{
    url: string;
    params?: string;
  }>();

  const { bottom } = useSafeAreaInsets();
  const onCopyPrompt = () => {
    console.log("copied");
  };
  return (
    <View>
      <Text>page</Text>
    </View>
  );
};

export default page;
