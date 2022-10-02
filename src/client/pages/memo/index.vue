<script setup lang="ts">
import GHeader from "../../components/GHeader/index.vue";
import GLayout from "../../components/GLayout/index.vue";
import { useMemo } from "./index.js";

const { meta } = useMemo();
</script>

<template>
  <g-layout>
    <template #main>
      <g-header />
      <div class="mx-auto flex max-w-screen-xl px-8">
        <div class="w-9/12">
          <div v-if="meta">
            <div class="border-b border-zinc-600 py-4">
              <div class="font-bold text-zinc-400">{{ meta.path }}</div>
              <div class="mt-2 font-bold text-zinc-400">
                Created: {{ meta.createdAt }}
              </div>
              <h2 class="mt-2 text-xl font-bold">
                {{ meta.title }}
              </h2>
              <ul
                v-if="meta.tags.length"
                class="mt-2 flex items-center text-xs"
              >
                <li
                  v-for="(tag, i) of meta.tags"
                  :key="i"
                  class="mr-1 rounded-xl bg-zinc-500 px-2 py-1 font-bold"
                >
                  {{ tag }}
                </li>
              </ul>
            </div>
            <div class="mt-4">
              <div v-html="meta.body" />
            </div>
          </div>

          <div class="mt-16">[Meta]:{{ meta }}</div>
        </div>
        <div class="w-3/12 border">目次</div>
      </div>
    </template>
  </g-layout>
</template>
