<script setup lang="ts">
type Props = {
  path: string;
  title: string;
  isStar: boolean;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
};

const props = withDefaults(defineProps<Props>(), { updatedAt: "" });

/**
 * .md を取り除く
 */
const trimMd = (path: string): string => path.replace(/.md$/, "");
</script>

<template>
  <div
    class="w-full cursor-pointer border-t border-zinc-600 p-2 hover:bg-zinc-700"
  >
    <router-link
      :to="{
        name: 'Memo',
        params: { id: encodeURI(props.path) },
      }"
    >
      <p class="text-sm text-zinc-400">{{ props.path }}</p>
      <div class="mt-1 flex items-center">
        <div class="h-5 w-5">
          <svg
            :class="props.isStar ? 'fill-yellow-500' : 'fill-zinc-500'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </div>
        <h2 class="ml-1 text-lg font-bold hover:text-blue-500">
          {{ trimMd(props.title) }}
        </h2>
        <ul v-if="props.tags.length" class="flex items-center text-xs">
          <li
            v-for="(tag, i) of props.tags"
            :key="i"
            class="ml-1 rounded-xl bg-zinc-500 px-2 py-1 font-bold"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
      <div class="flex text-sm text-zinc-400">
        <p>Created {{ props.createdAt }}</p>
        <p v-if="props.updatedAt" class="ml-1">
          | Updated {{ props.updatedAt }}
        </p>
      </div>
    </router-link>
  </div>
</template>
