const { server } = require("./server");
const { Server } = require("socket.io");
const { addUser, getUser, getRoomUsers, updateUser } = require("./utils/users");
const { formatMessage } = require("./utils/messages");
const { format } = require("morgan");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("new WS connection");

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
      socket.leave(user.room);
    } else {
      addUser(socket.id, username, room);
    }

    // welcome the user
    socket.emit(
      "new message",
      formatMessage("ChatBot", `Welcome to room #${room}!`)
    );

    // inform users of join
    socket
      .to(room)
      .emit(
        "user status",
        formatMessage("ChatBot", `${username} has joined the chat.`)
      );
  });

  // broadcast any messages to users in the room
  socket.on("new message", (message) => {
    const { username, room } = getUser(socket.id);

    console.log(username, "sending message to room: ", room);

    io.in(room).emit("new message", formatMessage(username, message));
  });

  // on any disconnect
  socket.on("disconnect", () => {
    const { username } = getUser(socket.id);
    io.emit(
      "user status",
      formatMessage("ChatBot", `${username} has left the chat.`)
    );
  });
});

module.exports.server = server;
