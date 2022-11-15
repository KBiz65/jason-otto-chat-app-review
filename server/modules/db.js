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
  getAllMessages: () => {
    return {
      name: "get-all-messages",
      text: "SELECT * FROM messages ORDER BY created_on ASC",
    };
  },
  createNewMessage: (params) => {
    const { author_id, text_content, timestamp } = params;
    return {
      name: "new-message",
      text: "INSERT INTO messages (author_id, text_content, created_on) VALUES ($1, $2, $3)",
      values: [author_id, text_content, timestamp],
    };
  },
  getUserById: (user_id) => {
    return {
      name: "get-user-by-id",
      text: "SELECT * FROM users WHERE user_id=$1",
      values: [user_id],
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
    const { username, email, passwordHash, timestamp } = params;

    return {
      name: "new-user",
      text: "INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4) RETURNING user_id, username",
      values: [username, email, passwordHash, timestamp],
    };
  },
};
