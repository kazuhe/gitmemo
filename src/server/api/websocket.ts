import http from "http";
import type { Express } from "express";
import { Server } from "socket.io";

/**
 * WebSocket サーバーを作成する
 */
export const createWebsocket = (app: Express): http.Server => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    // client から受信
    socket.on("redisterName", (name) => {
      console.log("redisterName", name);
    });

    setTimeout(() => {
      // client へ送信
      socket.emit("notifeNewComer", "Hey!!");
    }, 3000);
  });

  return server;
};
