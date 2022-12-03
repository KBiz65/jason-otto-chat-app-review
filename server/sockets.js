const { server } = require("./server");
const { Server } = require("socket.io");
const {
  addUser,
  deleteUser,
  getUser,
  getRoomUsers,
  updateUser,
} = require("./utils/users");
const { formatMessage } = require("./utils/messages");
const { format } = require("morgan");
const { get } = require("./router");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const isGuest = username === "Guest";
    socket.join(room);

    const user = getUser(socket.id);
    if (user) {
      socket.leave(user.room); // leave current room
      // inform users of room that was just left
      socket
        .to(user.room)
        .emit(
          "user status",
          formatMessage("ChatBot", `${user.username} has left the chat.`)
        );
      io.in(user.room).emit("roomUsers", {
        users: getRoomUsers(user.room),
      });
      updateUser({ ...user, room });
    } else {
      addUser(socket.id, username, room);
    }

    const guestMessage = isGuest
      ? "You are able to read messages but not participate. To send messages, please login."
      : "";
    // welcome current user
    socket.emit(
      "new message",
      formatMessage("ChatBot", `Welcome to room #${room}! ${guestMessage}`)
    );

    // inform users of current room of user join
    socket
      .to(room)
      .emit(
        "user status",
        formatMessage(
          "ChatBot",
          `${username} ${
            isGuest ? "is lurking the chat." : "has joined the chat."
          } `
        )
      );

    io.in(room).emit("roomUsers", {
      users: getRoomUsers(room),
    });
  });

  // broadcast any messages to users in the room
  socket.on("new message", ({ message, timestamp }) => {
    const { username, room } = getUser(socket.id);
    io.in(room).emit(
      "new message",
      formatMessage(username, message, timestamp)
    );
  });

  // on any disconnect
  socket.on("disconnect", () => {
    const user = deleteUser(socket.id);

    if (user) {
      io.in(user.room).emit(
        "user status",
        formatMessage("ChatBot", `${user.username} has left the chat.`)
      );
      io.in(user.room).emit("roomUsers", { users: getRoomUsers(user.room) });
    }
  });
});

module.exports.server = server;
