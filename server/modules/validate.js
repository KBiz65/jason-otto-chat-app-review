module.exports.validateFormData = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const isValidUsername = /^\w{6,32}$/.test(username);
    const isExactlyFourDigits = /^\d{4}$/.test(parseInt(password));
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
    const isValidUsername = /^\w{6,32}$/.test(username);
    const isExactlyFourDigits = /^\d{4}$/.test(parseInt(password));

    if (isValidUsername && isExactlyFourDigits) {
      next();
    }
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
  const { author_id, text_content } = req.body;
  if (author_id && text_content) {
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
  const { user_id } = req.params;

  if (Number.isInteger(parseInt(user_id))) {
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
