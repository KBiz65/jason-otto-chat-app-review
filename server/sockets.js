const { server } = require("./server");
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("new WS connection...");
  // console.log(io.engine.clientsCount);
  socket.emit("message", "hello from the server");
});

module.exports.server = server;
