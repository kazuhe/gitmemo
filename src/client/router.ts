import {
  createRouter as createVueRouter,
  createWebHistory,
  RouterOptions,
  Router,
} from "vue-router";
import Memo from "./pages/Memo.vue";
import Home from "./pages/index.vue";

export const createRouter = (): Router => {
  const routes: RouterOptions["routes"] = [
    { path: "/", name: "Home", component: Home },
    {
      path: "/memos/:id",
      name: "Memo",
      component: Memo,
    },
  ];

  const router = createVueRouter({
    history: createWebHistory("/"),
    routes,
  });

  return router;
};
