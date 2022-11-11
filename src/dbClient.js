// require("dotenv").config();
// const { Client } = require("pg");

// const connectionString = process.env.CONN_STRING;

// const client = new Client({
//   connectionString,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// client.connect();

// const query = {
//   // give the query a unique name
//   name: "create-accounts-table",
//   text: "CREATE TABLE accounts(user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR ( 50 ) UNIQUE NOT NULL, password VARCHAR ( 50 ) NOT NULL, email VARCHAR ( 255 ) UNIQUE NOT NULL, created_on TIMESTAMP NOT NULL, last_login TIMESTAMP)",
// };

// // callback
// client.query(query, (err, res) => {
//   if (err) {
//     console.log(err.stack);
//   } else {
//     console.log(res);
//   }
// });
