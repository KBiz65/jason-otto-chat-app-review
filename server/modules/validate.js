module.exports.validateFormData = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const isValidUsername = /^\w{6,32}$/.test(username);
    const isExactlyFourDigits = /^\d{4}$/.test(password);
    if (isValidUsername && isExactlyFourDigits) {
      next();
      return;
    }
  }

  res.statusCode = 400;
  res.json({
    message: "400 | Bad Request",
    detail:
      "One or more required parameters were not provided or properly formatted by the request.",
  });
};

module.exports.validateLoginData = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    next();
    return;
  } else {
    res.statusCode = 400;
    res.json({
      message: "400 | Bad Request",
      detail:
        "One or more required parameters were not provided or properly formatted by the request.",
    });
  }
};

module.exports.validateQuery = (req, res, next) => {
  const { room } = req.query;

  if (room) {
    next();
    return;
  } else {
    res.statusCode = 400;
    res.json({
      message: "400 | Bad Request",
      detail:
        "One or more required parameters were not provided or properly formatted by the request.",
    });
  }
};

module.exports.validateMessage = (req, res, next) => {
  const { author_id, room, text_content } = req.body;
  if (author_id && room && text_content) {
    next();
    return;
  }
  res.statusCode = 400;
  res.json({
    message: "400 | Bad Request",
    detail:
      "One or more required parameters were not provided or properly formatted by the request.",
  });
};

module.exports.validateId = (req, res, next) => {
  const { id } = req.params;

  if (Number.isInteger(parseInt(id))) {
    next();
    return;
  }
  res.statusCode = 400;
  res.json({
    message: "400 | Bad Request",
    detail:
      "One or more required parameters were not provided or properly formatted by the request.",
  });
};
