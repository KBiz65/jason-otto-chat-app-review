module.exports.validateFormData = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    next();
  } else {
    res.statusCode = 400;
    res.json({
      message: "400 | Bad Request",
      detail:
        "One or more required parameters were not provided by the request",
    });
  }
};

module.exports.validateLoginData = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res.statusCode = 400;
    res.json({
      message: "400 | Bad Request",
      detail:
        "One or more required parameters were not provided by the request",
    });
  }
};
