import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = {
  client: null,
  message: null,
  room: null,
  roomChanged: false,
  connect() {
    console.log("creating new socket instance");
    this.client = io("http://localhost:3001/");
  },
  disconnect() {
    console.log("disconnecting the socket");
    this.client.disconnect();
  },
};

export const SocketContext = createContext();
