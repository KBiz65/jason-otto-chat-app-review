const { client } = require("../modules/db");
const {
  createJWT,
  comparePasswords,
  hashPassword,
} = require("../modules/auth");

module.exports.createNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  const passwordHash = await hashPassword(password);
  const timestamp = new Date();
  const query = {
    name: "new-user",
    text: "INSERT INTO users (username, email, password, created_on) VALUES ($1, $2, $3, $4) RETURNING user_id, username",
    values: [username, email, passwordHash, timestamp],
  };

  try {
    const queryRes = await client.query(query);
    const user = queryRes.rows[0]; // db returns data needed for token
    const token = createJWT(user);

    res.statusCode = 201;
    res.json({ message: "201 | Created", token });
  } catch (err) {
    res.statusCode = 409;
    res.json({ message: "409 | Resource Already Exists" });
  }
};

module.exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  const query = {
    name: "get-user",
    text: "SELECT * FROM users WHERE username=$1",
    values: [username],
  };

  try {
    const queryRes = await client.query(query);
    const user = queryRes.rows[0];
    const passwordsMatch = await comparePasswords(password, user.password);

    if (passwordsMatch) {
      const token = createJWT({
        user_id: user.user_id,
        password: user.password,
      });

      res.statusCode = 200;
      res.json({ message: "200 | OK", token });
    } else {
      throw Error;
    }
  } catch (err) {
    res.statusCode = 401;
    res.json({
      message: "401 | Bad Request",
      detail: "Invalid username and password combination",
    });
  }
};
