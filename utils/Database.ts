import { Message, Role } from "@/utils/Interfaces";
import { type SQLiteDatabase } from "expo-sqlite/next";
import * as FileSystem from "expo-file-system";

/**
 * データベースのマイグレーションを必要に応じて実行します。
 * @param db - SQLiteDatabase インスタンス
 * @throws エラーが発生した場合は、詳細なエラーメッセージを出力します。
 */
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1; // データベースのバージョン
  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );

  let currentDbVersion = result?.user_version ?? 0; // 現在のデータベースバージョンを取得

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    const result = await db.execAsync(`
      PRAGMA journal_mode = 'wal'; 
      CREATE TABLE chats (
      id INTEGER PRIMARY KEY NOT NULL, 
      title TEXT NOT NULL
      );
  
      CREATE TABLE messages (
      id INTEGER PRIMARY KEY NOT NULL, 
      chat_id INTEGER NOT NULL, 
      content TEXT NOT NULL, 
      imageUrl TEXT, 
      role TEXT, 
      prompt TEXT, 
      FOREIGN KEY (chat_id) REFERENCES chats (id) ON DELETE CASCADE
      );
   `);
    currentDbVersion = 1; // バージョンを更新
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`); // バージョンをデータベースに設定
}

/**
 * 新しいチャットをデータベースに追加します。
 * @param db - SQLiteDatabase インスタンス
 * @param title - チャットのタイトル
 * @returns 挿入結果
 * @throws エラーが発生した場合は、詳細なエラーメッセージを出力します。
 */
export const addChat = async (db: SQLiteDatabase, title: string) => {
  return await db.runAsync("INSERT INTO chats (title) VALUES (?)", title);
};

/**
 * すべてのチャットをデータベースから取得します。
 * @param db - SQLiteDatabase インスタンス
 * @returns チャットのリスト
 * @throws エラーが発生した場合は、詳細なエラーメッセージを出力します。
 */
export const getChats = async (db: SQLiteDatabase) => {
  return await db.getAllAsync("SELECT * FROM chats");
};

/**
 * 特定のチャットに関連するメッセージを取得します。
 * @param db - SQLiteDatabase インスタンス
 * @param chatId - チャットのID
 * @returns メッセージのリスト
 * @throws エラーが発生した場合は、詳細なエラーメッセージを出力します。
 */
export const getMessages = async (
  db: SQLiteDatabase,
  chatId: number
): Promise<Message[]> => {
  return (
    await db.getAllAsync<Message>(
      "SELECT * FROM messages WHERE chat_id = ?",
      chatId
    )
  ).map((message) => ({
    ...message,
    role: "" + message.role === "bot" ? Role.Bot : Role.User, // 役割を適切に設定
  }));
};

/**
 * メッセージをデータベースに追加します。
 * @param db - SQLiteDatabase インスタンス
 * @param chatId - チャットのID
 * @param content - メッセージの内容
 * @param role - メッセージの役割
 * @param imageUrl - メッセージに関連する画像のURL
 * @param prompt - プロンプト
 * @returns 挿入結果
 * @throws エラーが発生した場合は、詳細なエラーメッセージを出力します。
 */
export const addMessage = async (
  db: SQLiteDatabase,
  chatId: number,
  { content, role, imageUrl, prompt }: Message
) => {
  return await db.runAsync(
    "INSERT INTO messages (chat_id, content, role, imageUrl, prompt) VALUES (?, ?, ?, ?, ?)",
    chatId,
    content,
    role === Role.Bot ? "bot" : "user",
    imageUrl || "",
    prompt || ""
  );
};

/**
 * チャットをデータベースから削除します。
 * @param db - SQLiteDatabase インスタンス
 * @param chatId - チャットのID
 * @returns 削除結果
 * @throws エラーが発生した場合は、詳細なエラーメッセージを出力します。
 */
export const deleteChat = async (db: SQLiteDatabase, chatId: number) => {
  return await db.runAsync("DELETE FROM chats WHERE id = ?", chatId);
};

/**
 * チャットのタイトルを変更します。
 * @param db - SQLiteDatabase インスタンス
 * @param chatId - チャットのID
 * @param title - 新しいタイトル
 * @returns 更新結果
 * @throws エラーが発生した場合は、詳細なエラーメッセージを出力します。
 */
export const renameChat = async (
  db: SQLiteDatabase,
  chatId: number,
  title: string
) => {
  return await db.runAsync(
    "UPDATE chats SET title = ? WHERE id = ?",
    title,
    chatId
  );
};
