module.exports.validateFormData = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const isExactlyFourDigits = /^\d{4}$/.test(parseInt(password));
    if (isExactlyFourDigits) {
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
