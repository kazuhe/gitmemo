import { io } from "socket.io-client";
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Memo } from "../../../domain/models/memo.js";

export const useMemo = () => {
  const socket = io();
  const route = useRoute();
  const id = route.params["id"];
  const decodeId = typeof id === "string" ? decodeURI(id) : "";

  const locate = window.location.pathname;
  console.log("locate", locate);

  const sendSocket = () => {
    socket.emit("memo", decodeId);
    socket.on("memo", (memo: Memo) => {
      console.log("client", memo);
      if (memo.body) {
        body.value = memo.body;
      }
      meta.value = memo;
    });
  };

  sendSocket();

  const body = ref("");
  const meta = ref<Memo>();

  return {
    body,
    meta,
  };
};
