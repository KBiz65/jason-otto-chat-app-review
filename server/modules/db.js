const { Client } = require("pg");
const connectionString = process.env.CONN_STRING;

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();
module.exports.client = client;

module.exports.preparedStmts = {
  getAllMessages: (room) => {
    return {
      name: "get-all-messages",
      text: "SELECT messages.id, users.username, messages.text_content, messages.created_on FROM messages INNER JOIN users ON messages.author_id = users.id WHERE room=$1 ORDER BY created_on ASC",
      values: [room], // for some reason must be wrapped in single quotes
    };
  },
  createNewMessage: (params) => {
    const { author_id, room, text_content, timestamp } = params;
    return {
      name: "new-message",
      text: "INSERT INTO messages (author_id, room, text_content, created_on) VALUES ($1, $2, $3, $4)",
      values: [author_id, room, text_content, timestamp],
    };
  },
  getUserById: (id) => {
    return {
      name: "get-user-by-id",
      text: "SELECT * FROM users WHERE id=$1",
      values: [id],
    };
  },
  getUserByUsername: (username) => {
    return {
      name: "get-user",
      text: "SELECT * FROM users WHERE username=$1",
      values: [username],
    };
  },
  createNewUser: (params) => {
    const { username, passwordHash, email, timestamp } = params;

    return {
      name: "new-user",
      text: "INSERT INTO users (username, password_hash, email, created_on) VALUES ($1, $2, $3, $4) RETURNING id, username",
      values: [username, passwordHash, email, timestamp],
    };
  },
};
