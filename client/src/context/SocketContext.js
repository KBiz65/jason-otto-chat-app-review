import { createContext } from "react";
import uniqid from "uniqid";
import { io } from "socket.io-client";
import { host } from "../utils/host";
import { formatToLocalTime } from "../utils/date";

export const socket = {
  client: null,
  message: null,
  users: null,
  room: null,
  roomChanged: false,
  stateFunct: null,
  setRoom(room) {
    this.stateFunct((prevState) => {
      return {
        ...prevState,
        room,
        roomChanged: true,
      };
    });
  },
  setStateFunct(stateFunct) {
    this.stateFunct = stateFunct;
  },
  connect() {
    const isProdEnv = process.env.NODE_ENV === "production";
    // has to be this way because in dev client and server run on diff ports
    this.client = (isProdEnv ? () => io() : () => io(host))();
  },
  disconnect() {
    this.client.disconnect();
  },
  initEventHandlers() {
    this.client.on("roomUsers", (data) => {
      this.stateFunct((prevState) => {
        return {
          ...prevState,
          users: data.users,
        };
      });
    });

    this.client.on("user status", (message) => {
      this.stateFunct((prevState) => {
        return {
          ...prevState,
          message: {
            ...message,
            timestamp: formatToLocalTime(message.timestamp),
            id: uniqid(),
          },
        };
      });
    });

    this.client.on("new message", (message) => {
      this.stateFunct((prevState) => {
        return {
          ...prevState,
          message: {
            ...message,
            timestamp: formatToLocalTime(message.timestamp),
            id: uniqid(),
          },
        };
      });
    });
  },
  toggleRoomChanged() {
    this.stateFunct((prevState) => {
      return {
        ...prevState,
        roomChanged: false,
      };
    });
  },
  reset() {
    this.stateFunct((prevState) => {
      return {
        ...prevState,
        client: null,
        message: null,
        users: null,
        room: null,
        roomChanged: false,
      };
    });
  },
};

export const SocketContext = createContext();
