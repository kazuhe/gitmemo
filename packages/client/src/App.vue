<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

const memos = [
  { body: "Memo の本文" },
  { body: "これにホームディレクトリのmdファイルを渡す" },
];
</script>

<template>
  <HelloWorld :memos="memos" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
