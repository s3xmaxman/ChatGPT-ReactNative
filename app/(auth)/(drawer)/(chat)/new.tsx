import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const { signOut } = useAuth();
  return (
    <View style={defaultStyles.pageContainer}>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

export default Page;
