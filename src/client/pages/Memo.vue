<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from "vue";
// import { useRoute } from "vue-router";
import type { Memo } from "../../domain/models/memo.js";

const socket = io();
// const route = useRoute();

const locate = window.location.pathname;
console.log("locate", locate);

const sendSocket = () => {
  // const path = route.params["path1"];

  socket.emit("memo", locate);
  socket.on("memo", (memo: Memo) => {
    console.log("client md", memo);
    if (memo.body) {
      md.value = memo.body;
    }
    meta.value.id = memo.id;
  });
};

sendSocket();

const md = ref("");
const meta = ref({
  id: 0,
  title: "",
  isStar: false,
  createdAt: "",
  updatedAt: "",
  tags: [],
});
</script>

<template>
  <div>
    <h2>Memo</h2>
    <pre>ID = {{ $route.params }}</pre>
    <p>ID = {{ $route.params["id"] }}</p>
    <router-link to="/">to Home</router-link>

    <pre>
      [Meta]:{{ meta }}
    </pre>
    <div v-html="md" />
  </div>
</template>
