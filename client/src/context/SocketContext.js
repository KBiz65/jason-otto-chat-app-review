import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = {
  client: null,
  message: null,
  users: null,
  room: null,
  roomChanged: false,
  connect() {
    this.client = io("http://localhost:3001/");
  },
  disconnect() {
    this.client.disconnect();
  },
};

export const SocketContext = createContext();
