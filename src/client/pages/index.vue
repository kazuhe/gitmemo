<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from "vue";
import type { Path, Memo } from "../../domain/models/memo.js";
import GAccordion from "../components/GAccordion/index.vue";
import GLayout from "../components/GLayout/index.vue";
import GMemoCard from "../components/GMemoCard/index.vue";

const socket = io();
const paths = ref<Path>([]);

socket.on("memoPath", (message) => {
  console.log("Socket", message);
  paths.value = [];
  paths.value = message;
});

/**
 * Markdown ファイルかどうか
 */
const isMarkdown = (path: string): boolean => /.md$/.test(path);

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
  <g-layout>
    <template #main>
      <header class="w-full border-b border-zinc-600">
        <div class="mx-auto max-w-screen-xl px-8">Header</div>
      </header>
      <div class="mx-auto flex max-w-screen-xl">
        <div
          class="sticky h-screen w-80 overflow-y-auto border-r border-zinc-600 px-8 pb-10"
        >
          <ul>
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
                          <li
                            v-for="childC of childB.children"
                            :key="childC.name"
                          >
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
          <ul>
            <li>aa</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>aa</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>nn</li>
            <li>aa</li>
            <li>nn</li>
            <li>nn</li>
          </ul>
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
