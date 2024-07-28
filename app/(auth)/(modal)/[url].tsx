import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const page = () => {
  const { url, params } = useLocalSearchParams();
  return (
    <View>
      <Text>page</Text>
    </View>
  );
};

export default page;
