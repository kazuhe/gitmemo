<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from "vue";
import type { Path, Memo } from "../../domain/models/memo.js";
import GAccordion from "./GAccordion/index.vue";

const socket = io();

const sendSocket = () => {
  socket.emit("redisterName", "testName");
};

const paths = ref<Path>([]);

socket.on("memoPath", (message) => {
  console.log("Socket", message);
  paths.value = [];
  paths.value = message;
});

defineProps<{ msg: string }>();

const greeting = ref("");

const fetchGreeting = async () => {
  fetch("/api/greeting/")
    .then((d) => d.json())
    .then((d) => {
      greeting.value = d.greeting;
    });
};

/**
 * .md を取り除く
 */
const trimMd = (path: string): string => path.replace(/.md$/, "");

/**
 * Markdown ファイルかどうか
 */
const isMarkdown = (path: string): boolean => /.md$/.test(path);

const count = ref(0);

const memoList = ref<Memo[]>();

const showMemoList = async (dirPath?: string) => {
  const params = { path: dirPath ? dirPath : "" };
  console.log(params);
  const query = new URLSearchParams(params);
  console.log(query.toString());
  const response = await fetch(`/api/memos?${query}`);
  const list = await response.json();
  memoList.value = list;
};

showMemoList();
</script>

<template>
  <h1>{{ msg }}</h1>

  <h2>Memo 一覧</h2>

  <div class="flex">
    <ul class="w-80">
      <!-- とりあえず -->
      <li @click="showMemoList()">TOP</li>
      <li v-for="path of paths" :key="path.name">
        <router-link v-if="isMarkdown(path.name)" :to="`${path.name}`">{{
          path.name
        }}</router-link>

        <g-accordion
          v-else
          :title="path.name"
          @click="showMemoList(path.fullPath)"
        >
          <ul v-if="path.children.length">
            <li v-for="child of path.children" :key="child.name">
              <router-link
                v-if="isMarkdown(child.name)"
                :to="`/${path.name}/${child.name}`"
                >{{ path.name }}/{{ child.name }}</router-link
              >
              <p v-else>{{ child.fullPath }}</p>
              <ul v-if="child.children.length">
                <li v-for="childB of child.children" :key="childB.name">
                  <router-link
                    :to="`${path.name}/${child.name}/${childB.name}`"
                    >{{ childB.fullPath }}</router-link
                  >
                  <ul v-if="childB.children.length">
                    <li v-for="childC of childB.children" :key="childC.name">
                      <router-link :to="`/${childC.name}`">{{
                        childC.fullPath
                      }}</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </g-accordion>
      </li>
    </ul>

    <div>
      <ul>
        <li v-for="(memo, i) of memoList" :key="i">
          <div class="border">
            <router-link
              :to="{
                name: 'Memo',
                params: { id: encodeURI(memo.path) },
              }"
            >
              <h2 class="text-lg font-bold">{{ trimMd(memo.title) }}</h2>
              {{ memo }}
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div>
    <button @click="sendSocket">sendSocket</button>
  </div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>

    <button type="button" @click="fetchGreeting">fetchGreeting</button>
    <p>greeting: {{ greeting }}</p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
