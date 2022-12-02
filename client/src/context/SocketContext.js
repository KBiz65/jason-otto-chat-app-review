import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = {
  client: null,
  message: null,
  users: null,
  room: null,
  roomChanged: false,
  connect() {
    this.client = io();
  },
  disconnect() {
    this.client.disconnect();
  },
};

export const SocketContext = createContext();
