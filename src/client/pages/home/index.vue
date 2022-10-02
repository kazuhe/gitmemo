<script setup lang="ts">
import GLayout from "../../components/GLayout/index.vue";
import GMemoCard from "../../components/GMemoCard/index.vue";
import GMemoList from "../../components/GMemoList/index.vue";
import { useHome } from "./index.js";

const { dirList, memoList, message, showMemoList } = useHome();
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
          <g-memo-list :path-list="dirList" :show-memo-list="showMemoList" />
        </div>
        <div class="w-full p-8">
          <div>{{ message }}</div>
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
