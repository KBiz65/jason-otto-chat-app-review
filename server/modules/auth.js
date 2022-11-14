const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.createJWT = (user) => {
  const token = jwt.sign(
    { user_id: user.user_id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

module.exports.protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.statusCode = 401;
    res.json({ message: "401 | Not Authorized" });
    return;
  }

  const token = bearer.split(" ")[1];
  if (!token) {
    res.statusCode = 401;
    res.json({ message: "401 | Invalid Token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.statusCode = 401;
    res.json({ message: "401 | Invalid Token" });
    return;
  }
};

module.exports.comparePasswords = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

module.exports.hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
