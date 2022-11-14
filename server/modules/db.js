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

// const query = {
//   // give the query a unique name
//   name: "create-users-table",
//   text: "CREATE TABLE users(user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR ( 50 ) UNIQUE NOT NULL, password VARCHAR ( 50 ) NOT NULL, email VARCHAR ( 255 ) UNIQUE NOT NULL, created_on TIMESTAMP NOT NULL, last_login TIMESTAMP)",
// };
