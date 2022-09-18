import http from "http";
import type { Express } from "express";
import { Server } from "socket.io";
import type { PathEmitter } from "../../domain/services/memo.js";
import { readPaths } from "../controllers/memo.js";

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

    const pathEmitter: PathEmitter = (payload) => {
      socket.emit("memoPath", payload);
    };

    readPaths(pathEmitter);
  });

  return server;
};
