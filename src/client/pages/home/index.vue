<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from "vue";
import type { Path, Memo } from "../../../domain/models/memo.js";
import GLayout from "../../components/GLayout/index.vue";
import GMemoCard from "../../components/GMemoCard/index.vue";
import GMemoList from "../../components/GMemoList/index.vue";

const socket = io();
const paths = ref<Path>([]);

socket.on("memoPath", (message) => {
  console.log("Socket", message);
  paths.value = [];
  paths.value = message;
});

const memoList = ref<Memo[]>();

/**
 * 引数で受け取ったディレクトリのメモ一覧を表示する
 */
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
  <g-layout>
    <template #main>
      <header class="w-full border-b border-zinc-600">
        <div class="mx-auto max-w-screen-xl px-8">Header</div>
      </header>
      <div class="mx-auto flex max-w-screen-xl">
        <div
          class="sticky h-screen w-80 overflow-y-auto border-r border-zinc-600 px-8 pb-10"
        >
          <g-memo-list :path-list="paths" :show-memo-list="showMemoList" />
        </div>
        <div class="w-full p-8">
          <ul class="">
            <li v-for="(memo, i) of memoList" :key="i">
              <g-memo-card
                :path="memo.path"
                :title="memo.title"
                :is-star="memo.isStar"
                :created-at="memo.createdAt"
                :updated-at="memo.updatedAt ? memo.updatedAt : ''"
                :tags="memo.tags"
              />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </g-layout>
</template>
