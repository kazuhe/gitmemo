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
  if (response.ok) {
    console.log("OK");
  } else {
    console.log("NO");
  }

  console.log("response", response);
  return response.json();
};

const text = ref("textが入るよ〜");

const fetchMemo = async () => {
  await request("GET", `/api/memos/${inputValue.value}`)
    .then((result) => {
      console.log("result", result);
      text.value = result;
    })
    .catch((err) => {
      console.log("result[err]", err);
      text.value = err;
    });
};

const memolist = ref();

const fetchMemos = async () => {
  await request("GET", `/api/memos`)
    .then((result) => {
      console.log("fetchMemos -> result", result);
      memolist.value = result;
    })
    .catch((err) => {
      console.log("result[err]", err);
      memolist.value = err;
    });
};

fetchMemos();

const paths = [
  {
    name: "foo",
    length: 20,
    child: [
      {
        name: "foo/barA",
        length: 15,
        child: [
          {
            name: "foo/barA/bazA",
            length: 8,
          },
          {
            name: "foo/barA/bazB",
            length: 7,
          },
        ],
      },
      {
        name: "foo/barB",
        length: 5,
      },
    ],
  },
  {
    name: "hoge",
    length: 3,
    child: [
      {
        name: "hoge/fuga",
        length: 2,
      },
    ],
  },
];
</script>

<template>
  <div>
    <ol class="list">
      <li v-for="(path, i) in paths" :key="i">
        <div class="flex">
          {{ path.name }}<span>{{ path.length }}</span>
        </div>
        <ol v-if="path.child">
          <li v-for="(A, AI) in path.child" :key="AI">
            <div class="flex">
              {{ A.name }}<span>{{ A.length }}</span>
            </div>
            <ol v-if="A.child">
              <li v-for="(B, BI) in A.child" :key="BI">
                <div class="flex">
                  {{ B.name }}<span>{{ B.length }}</span>
                </div>
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </div>

  <h2>Memos</h2>

  <p v-for="(memo, index) in memos" :key="index">
    {{ memo.body }}
  </p>

  <div>
    <h2>Memo 一覧</h2>
    <ul>
      <li v-for="(memo, i) of memolist" :key="i">
        <div>ID: {{ memo.id }}</div>
        <div>title: {{ memo.title }}</div>
        <div>path: {{ memo.path }}</div>
        <div>category: {{ memo.category }}</div>
      </li>
    </ul>
  </div>

  <button type="button" @click="count++">count is: {{ count }}</button>

  <div>
    <h2>Memo の id を指定して取得</h2>
    <form>
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
  </div>
</template>

<style scoped>
.list {
  list-style-type: none;
  padding: 0;
  width: 400px;
}
.list li {
  margin: 7px 0 7px 0px;
  font-weight: bold;
  font-size: 14px;
  line-height: 30px;
}

.list .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list .flex span {
  background: #757575;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 13px;
  color: #fff;
  height: 20px;
  display: inline-flex;
  align-items: center;
}

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
