<script setup lang="ts">
import io from "socket.io-client";
import { ref } from "vue";
import type { Memo } from "../../domain/memo.js";

const socket = io();

const sendSocket = () => {
  socket.emit("redisterName", "testName");
};

socket.on("notifeNewComer", (message) => {
  console.log("Socket", message);
});

defineProps<{ msg: string }>();

const greeting = ref("");

const fetchGreeting = async () => {
  fetch("http://localhost:3000/api/greeting/")
    .then((d) => d.json())
    .then((d) => {
      greeting.value = d.greeting;
    });
};

const md = ref("");
const meta = ref({
  id: 0,
  title: "",
  isStar: false,
  createdAt: "",
  updatedAt: "",
  tags: [],
});
const fetchMd = async () => {
  fetch("http://localhost:3000/api/md/")
    .then((d) => d.json())
    .then((d: Memo) => {
      console.log("client md", d);
      if (d.body) {
        md.value = d.body;
      }
      meta.value.id = d.id;
    });
};

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>
    <button @click="sendSocket">sendSocket</button>
  </div>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>

    <button type="button" @click="fetchGreeting">fetchGreeting</button>
    <p>greeting: {{ greeting }}</p>

    <button type="button" @click="fetchMd">fetchMd</button>
    <pre>
      [Meta]:{{ meta }}
    </pre>
    <div v-html="md" />
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
