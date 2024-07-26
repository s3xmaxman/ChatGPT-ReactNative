import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

/**
 * 画像をダウンロードして保存する関数
 *
 * この関数は指定されたURLから画像をダウンロードし、デバイスのストレージに保存します。
 * 主な仕様:
 * - 画像は「Download」アルバムに保存されます。
 * - アルバムが存在しない場合は新しく作成されます。
 *
 * 制限事項:
 * - メディアライブラリへのアクセス許可が必要です。
 *
 * @param {string} imageUrl - ダウンロードする画像のURL
 * @returns {Promise<void>} - 処理が完了したら解決されるPromise
 * @throws {Error} - ダウンロードまたは保存中にエラーが発生した場合
 */
export const downloadAndSaveImage = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(fileUri, imageUrl);
    return saveFile(res.uri);
  } catch (error) {
    console.log("downloadAndSaveImage error", error);
  }
};

/**
 * ファイルを保存する関数
 *
 * この関数は指定されたURIのファイルをメディアライブラリに保存します。
 *
 * @param {string} fileUri - 保存するファイルのURI
 * @returns {Promise<void>} - 処理が完了したら解決されるPromise
 * @throws {Error} - 保存中にエラーが発生した場合
 */
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
    } catch (error) {
      console.log("saveFile error", error);
    }
  } else if (status === "denied") {
    Alert.alert("ダウンロードのための権限を許可してください");
  }
};

/**
 * 画像をクリップボードにコピーする関数
 *
 * この関数は指定されたURLから画像をダウンロードし、Base64形式でクリップボードにコピーします。
 *
 * @param {string} imageUrl - コピーする画像のURL
 * @returns {Promise<void>} - 処理が完了したら解決されるPromise
 * @throws {Error} - ダウンロードまたはコピー中にエラーが発生した場合
 */
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

/**
 * 画像を共有する関数
 *
 * この関数は指定されたURLの画像を共有します。
 *
 * @param {string} imageUrl - 共有する画像のURL
 * @returns {Promise<void>} - 処理が完了したら解決されるPromise
 */
export const shareImage = async (imageUrl: string) => {
  Sharing.shareAsync(imageUrl);
};
