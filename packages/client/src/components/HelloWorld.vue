<script setup lang="ts">
import { ref } from "vue";

type Memos = {
  body: string;
}[];

type Props = {
  memos: Memos;
};

defineProps<Props>();

const count = ref(0);

const inputValue = ref("");

/**
 * 指定した url にリソースを要求する
 *
 * @param method リクエストするメソッド
 * @param url URL
 * @param headers ヘッダー
 * @param body 本文
 * @param init その他追加したい設定
 * @returns リソース
 */
type HtmlRequest = (
  method: "GET" | "POST",
  url: string,

  headers?: HeadersInit,
  body?: BodyInit,
  init?: Omit<RequestInit, "method" | "headers" | "body">
) => Promise<string>;

// const params = { id: "6b7fe5d9-b540-4b4f-bacd-956d6a102b6a" };
// const query = new URLSearchParams(params);

const request: HtmlRequest = async (method, url, headers, body, init = {}) => {
  const response = await fetch(url, {
    method,
    // credentials: 'same-origin',
    // mode: 'no-cors',
    headers: { ...headers, "Content-Type": "application/json" },
    // body: body ? JSON.stringify(body) : null,
    ...init,
  });
  console.log("response", response);
  return response.json();
};

const text = ref("textが入るよ〜");

const fetchMemo = async () => {
  await request(
    "GET",
    `/api/memos/${inputValue.value}`
    // `http://localhost:8000/api/memos?${query}`
  )
    .then((result) => {
      console.log("result", result);
      text.value = result;
    })
    .catch((err) => {
      console.log("result[err]", err);
      text.value = err;
    });
};
</script>

<template>
  <h2>Memos</h2>

  <p v-for="(memo, index) in memos" :key="index">
    {{ memo.body }}
  </p>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>

  <form style="margin-top: 30px">
    <label for="memo_id">Memo ID: </label>
    <input
      id="memo_id"
      v-model="inputValue"
      placeholder="84ab8542-124f-49ea-a747-e616b2bcef7c"
      type="text"
    />
    <button type="button" @click="fetchMemo">fetchMemo</button>
  </form>
  <hr />

  {{ text }}
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
