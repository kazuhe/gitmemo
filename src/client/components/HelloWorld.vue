<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from "vue";
import type { Memo, Path } from "../../domain/model/memo.js";

const socket = io();

const sendSocket = () => {
  socket.emit("redisterName", "testName");
};

const paths = ref<Path>([]);

socket.on("memoPath", (message) => {
  console.log("Socket", message);
  paths.value = [];
  paths.value = message;
});

defineProps<{ msg: string }>();

const greeting = ref("");

const fetchGreeting = async () => {
  fetch("/api/greeting/")
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
  fetch("/api/md/")
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

  <h2>Memo 一覧</h2>
  <ul>
    <!-- とりあえず -->
    <li v-for="path of paths" :key="path.name">
      {{ path.name }}
      <ul v-if="path.children.length">
        <li v-for="child of path.children" :key="child.name">
          {{ child.name }}
          <ul v-if="child.children.length">
            <li v-for="childB of child.children" :key="childB.name">
              {{ childB.name }}
              <ul v-if="childB.children.length">
                <li v-for="childC of childB.children" :key="childC.name">
                  {{ childC.name }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

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
