<script setup lang="ts">
import GLayout from "../components/GLayout/index.vue";
import HelloWorld from "../components/HelloWorld.vue";
</script>

<template>
  <g-layout>
    <template #main>
      <div class="p-2">
        <h2>Home</h2>
        <div>
          <img src="/vite.svg" class="logo" alt="Vite logo" />
          <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
        </div>
        <hello-world msg="Vite + Vue" />
      </div>
    </template>
  </g-layout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
