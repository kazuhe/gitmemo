<script setup lang="ts">
import { useAccordion } from "./index.js";

type Props = {
  /* アコーディオンの開閉状態 */
  isOpen?: boolean;
  /* アコーディオンのタイトル */
  title: string;
};

const props = withDefaults(defineProps<Props>(), { isOpen: false });

const { isContentOpen, toggle } = useAccordion(props.isOpen);
</script>

<template>
  <div>
    <div
      class="relative cursor-pointer rounded p-1 hover:bg-zinc-700"
      @click="toggle"
    >
      <p>{{ title }}</p>
      <div
        class="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2"
        :class="isContentOpen ? 'rotate-180' : ''"
      >
        <svg
          class="fill-transparent stroke-zinc-100 stroke-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
    <div v-show="isContentOpen">
      <slot />
    </div>
  </div>
</template>
