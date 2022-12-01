import { createContext } from "react";
import { io } from "socket.io-client";
import { host } from "../utils/host";

export const socket = {
  client: null,
  message: null,
  users: null,
  room: null,
  roomChanged: false,
  connect() {
    this.client = io(`${host}/`);
  },
  disconnect() {
    this.client.disconnect();
  },
};

export const SocketContext = createContext();
