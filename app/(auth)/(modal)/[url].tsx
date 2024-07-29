import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";

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
    <View style={styles.container}>
      <ImageZoom
        uri={url}
        style={styles.image}
        minScale={0.5}
        maxScale={5}
        minPanPointers={1}
        doubleTapScale={2}
        isSingleTapEnabled
        isDoubleTapEnabled
        resizeMode="contain"
      />
      <BlurView intensity={95} tint="dark" style={[styles.blurview]}>
        <View></View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  blurview: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    paddingTop: 6,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  promptText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: Colors.grey,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  closeBtn: {
    backgroundColor: Colors.dark,
    borderRadius: 20,
    height: 26,
    width: 26,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default page;
