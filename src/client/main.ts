import { createApp } from "vue";
import "./style.css";
import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import App from "./App.vue";
import Home from "./pages/index.vue";
import Memo from "./pages/memo.vue";

const routes: RouterOptions["routes"] = [
  { path: "/", name: "Home", component: Home },
  { path: "/memo", name: "Memo", component: Memo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
