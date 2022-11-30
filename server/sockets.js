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
    socket.join(room);

    const user = getUser(socket.id);
    if (user) {
      updateUser({ ...user, room });
      socket
        .to(user.room)
        .emit(
          "user status",
          formatMessage("ChatBot", `${user.username} has left the chat.`)
        );

      // inform users of room that was just left
      io.in(user.room).emit("roomUsers", {
        users: getRoomUsers(user.room),
      });

      socket.leave(user.room);
    } else {
      addUser(socket.id, username, room);
    }

    // welcome current user
    socket.emit(
      "new message",
      formatMessage("ChatBot", `Welcome to room #${room}!`)
    );

    // inform users of current room of user join
    socket
      .to(room)
      .emit(
        "user status",
        formatMessage("ChatBot", `${username} has joined the chat.`)
      );

    io.in(room).emit("roomUsers", {
      users: getRoomUsers(room),
    });
  });

  // broadcast any messages to users in the room
  socket.on("new message", (message) => {
    const { username, room } = getUser(socket.id);
    io.in(room).emit("new message", formatMessage(username, message));
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
