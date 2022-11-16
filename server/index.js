require("dotenv").config();
const { server } = require("./sockets");
const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Chat API listening on ${port}!`));
