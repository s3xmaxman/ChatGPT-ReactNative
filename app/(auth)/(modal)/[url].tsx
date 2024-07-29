import { Ionicons, Octicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { downloadAndSaveImage, shareImage } from "@/utils/Image";
import DropDownMenu from "@/components/DropDownMenu";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

const page = () => {
  const { url, params } = useLocalSearchParams<{
    url: string;
    params?: string;
  }>();
  const { bottom } = useSafeAreaInsets();

  if (!url) return;

  const onCopyPrompt = () => {
    console.log("copied");
  };

  const handlePresentModalPres = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <DropDownMenu
              items={[
                { key: "1", title: "View prompt", icon: "info.circle" },
                { key: "2", title: "Learn more", icon: "questionmark.circle" },
              ]}
              onSelect={handlePresentModalPres}
            />
          ),
        }}
      />
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

      <BlurView
        intensity={95}
        tint={"dark"}
        style={[styles.blurview, { paddingBottom: bottom }]}
      >
        <View style={styles.row}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="white"
            />
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Ionicons name="brush-outline" size={24} color="white" />
            <Text style={styles.btnText}>Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => downloadAndSaveImage(url)}
          >
            <Octicons name="download" size={24} color="white" />
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => shareImage(url)}
          >
            <Octicons name="share" size={24} color="white" />
            <Text style={styles.btnText}>Share</Text>
          </TouchableOpacity>
        </View>
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
