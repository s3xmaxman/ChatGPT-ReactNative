import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

// このモジュールは、画像をダウンロード、保存、クリップボードにコピー、共有するための関数を提供します。
// 主な仕様:
// - 画像を指定したURLからダウンロードし、デバイスのストレージに保存します。
// - 保存した画像をクリップボードにコピーします。
// - 画像を他のアプリと共有します。
// 制限事項:
// - メディアライブラリへのアクセス許可が必要です。

/**
 * 画像を指定したURLからダウンロードし、デバイスに保存します。
 * @param {string} imageUrl - ダウンロードする画像のURL。
 * @returns {Promise<void>} - 保存処理の完了を示すPromise。
 * @throws {Error} - ファイルシステムエラーが発生した場合。
 */
export const downloadAndSaveImage = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    return saveFile(res.uri);
  } catch (err) {
    console.log("FS Err: ", err);
  }
};

/**
 * 指定されたファイルURIをメディアライブラリに保存します。
 * @param {string} fileUri - 保存するファイルのURI。
 * @returns {Promise<void>} - 保存処理の完了を示すPromise。
 * @throws {Error} - メディアライブラリエラーが発生した場合。
 */
const saveFile = async (fileUri: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === "granted") {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album == null) {
        const result = await MediaLibrary.createAlbumAsync(
          "Download",
          asset,
          false
        );
        if (result) {
          Alert.alert("画像が写真に保存されました");
        }
      } else {
        const result = await MediaLibrary.addAssetsToAlbumAsync(
          [asset],
          album,
          false
        );
        if (result) {
          Alert.alert("画像が写真に保存されました");
        }
      }
    } catch (err) {
      console.log("Save err: ", err);
    }
  } else if (status === "denied") {
    Alert.alert("ダウンロードのための権限を許可してください");
  }
};

/**
 * 画像を指定したURLからダウンロードし、クリップボードにコピーします。
 * @param {string} imageUrl - コピーする画像のURL。
 * @returns {Promise<void>} - コピー処理の完了を示すPromise。
 * @throws {Error} - ファイルシステムエラーが発生した場合。
 */
export const copyImageToClipboard = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    const base64 = await FileSystem.readAsStringAsync(res.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Clipboard.setImageAsync(base64);
  } catch (err) {
    console.log("FS Err: ", err);
  }
};

/**
 * 画像を指定したURLから共有します。
 * @param {string} imageUrl - 共有する画像のURL。
 * @returns {Promise<void>} - 共有処理の完了を示すPromise。
 */
export const shareImage = async (imageUrl: string) => {
  Sharing.shareAsync(imageUrl);
};
