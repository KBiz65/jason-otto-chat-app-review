const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
    // { expiresIn: "5m" }
  );
  return token;
};

module.exports.protect = (req, res, next) => {
  const authToken = req.cookies["auth-token"];

  if (!authToken) {
    res.statusCode = 401;
    res.json({ message: "401 | Not Authorized" });
    return;
  }

  try {
    const user = jwt.verify(authToken, process.env.JWT_SECRET);
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
