import http from "http";
import type { Express } from "express";
import { Server } from "socket.io";
import { readPaths } from "../controllers/memo.js";

import type { Emitter } from "../types.js";

/**
 * WebSocket サーバーを作成する
 */
export const createWebsocket = (app: Express, root: string): http.Server => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    // client から受信
    socket.on("redisterName", (name) => {
      console.log("redisterName", name);
    });

    const pathEmitter: Emitter = (payload) => {
      socket.emit("memoPath", payload);
    };

    readPaths(root, pathEmitter);
  });

  return server;
};
