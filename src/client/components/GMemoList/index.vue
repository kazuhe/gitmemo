<script setup lang="ts">
import type { Path } from "../../../domain/models/memo.js";
import GAccordion from "../GAccordion/index.vue";
import GMemoList from "./index.vue";

type Props = {
  pathList: Path;
  showMemoList: (dirPath?: string) => Promise<void>;
  top?: boolean;
};

const props = withDefaults(defineProps<Props>(), { top: true });
</script>

<template>
  <ul>
    <li
      v-if="props.top"
      class="cursor-pointer rounded p-1 hover:bg-zinc-700"
      @click="props.showMemoList()"
    >
      TOP
    </li>
    <li
      v-for="path of props.pathList"
      :key="path.fullPath"
      @click="props.showMemoList(path.fullPath)"
    >
      <g-accordion :title="path.name">
        <g-memo-list
          v-if="path.children.length"
          class="pl-3"
          :path-list="path.children"
          :show-memo-list="props.showMemoList"
          :top="false"
        />
      </g-accordion>
    </li>
  </ul>
</template>
