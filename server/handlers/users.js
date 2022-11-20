const { client, preparedStmts } = require("../modules/db");
const {
  createJWT,
  comparePasswords,
  hashPassword,
} = require("../modules/auth");

module.exports.createNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  const passwordHash = await hashPassword(password);
  const params = {
    username,
    email,
    passwordHash,
    timestamp: new Date(),
  };
  const query = preparedStmts.createNewUser(params);

  try {
    const queryRes = await client.query(query);
    const user = queryRes.rows[0]; // db returns data needed for token
    const token = createJWT(user);

    res.statusCode = 201;
    res.cookie("auth-token", token, { httpOnly: true });
    res.json({ message: "201 | Created" });
  } catch (err) {
    res.statusCode = 409;
    res.json({ message: "409 | Resource Already Exists" });
  }
};

module.exports.getUserById = async (req, res) => {
  const { user_id } = req.params;
  const query = preparedStmts.getUserById(user_id);

  try {
    const queryRes = await client.query(query);
    res.statusCode = 200;
    res.json({ message: "200 | OK", data: queryRes.rows });
  } catch (err) {
    res.statusCode = 500;
    res.json({ message: "500 | Internal Server Error" });
  }
};

module.exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  const query = preparedStmts.getUserByUsername(username);

  try {
    const queryRes = await client.query(query);
    const user = queryRes.rows[0];
    const passwordsMatch = await comparePasswords(password, user.password);

    if (passwordsMatch) {
      const token = createJWT({
        user_id: user.user_id,
        username: user.username,
      });
      res.statusCode = 200;
      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });
      res.json({ message: "200 | OK" });
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

module.exports.signOut = (req, res) => {
  res.clearCookie("auth-token");
  res.statusCode = 200;
  res.json({ message: "200 | OK" });
};
