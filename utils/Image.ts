import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export const downloadAndSaveImage = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(fileUri, imageUrl);
    return saveFile(res.uri);
  } catch (error) {
    console.log("downloadAndSaveImage error", error);
  }
};

const saveFile = async (fileUri: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === "granted") {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album === null) {
        const result = await MediaLibrary.createAlbumAsync(
          "Download",
          asset,
          false
        );

        if (result) {
          Alert.alert("Image saved to Photos");
        }
      } else {
        const result = await MediaLibrary.addAssetsToAlbumAsync(
          [asset],
          album,
          false
        );

        if (result) {
          Alert.alert("Image saved to Photos");
        }
      }
    } catch (error) {
      console.log("saveFile error", error);
    }
  } else if (status === "denied") {
    Alert.alert("please allow permissions to download");
  }
};

export const copyImageToClipboard = async (imageUrl: string) => {
  let fileUriCopy =
    FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUriCopy);
    const base64 = await FileSystem.readAsStringAsync(res.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Clipboard.setStringAsync(base64);
  } catch (error) {
    console.log("copyImageToClipboard error", error);
  }
};

export const shareImage = async (imageUrl: string) => {
  Sharing.shareAsync(imageUrl);
};
