import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter } from "./router.js";

const app = createApp(App);
const router = createRouter();

app.use(router);
app.mount("#app");
