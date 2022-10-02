import { io } from "socket.io-client";
import { Ref, ref } from "vue";
import type { Path, Memo } from "../../../domain/models/memo.js";

/**
 * 特定ディレクトリ配下のメモ一覧
 */
type DirList = Ref<Path>;

/**
 * 特定ディレクトリ配下のメモ一覧
 */
type MemoList = Ref<Memo[] | undefined>;

/**
 * メッセージ
 */
type Message = Ref<string>;

/**
 * 引数で受け取ったディレクトリのメモ一覧を取得する
 */
const fetchMemoList =
  (memoList: MemoList, message: Message) => async (dirPath?: string) => {
    const params = { path: dirPath ? dirPath : "" };
    const query = new URLSearchParams(params);
    const response = await fetch(`/api/memos?${query}`);
    const list = await response.json();

    if (!list.length) {
      message.value = "このディレクトリにはメモが存在しません";
    } else {
      message.value = "";
    }

    memoList.value = list;
  };

export const useHome = () => {
  const dirList: DirList = ref([]);
  const memoList: MemoList = ref();
  const message = ref("");
  const socket = io();

  const showMemoList = fetchMemoList(memoList, message);
  showMemoList();

  socket.on("memoPath", (message) => {
    console.log("Socket", message);
    dirList.value = [];
    dirList.value = message;
  });

  return {
    dirList,
    memoList,
    message,
    showMemoList,
  };
};
