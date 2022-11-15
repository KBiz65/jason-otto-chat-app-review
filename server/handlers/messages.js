const { client, preparedStmts } = require("../modules/db");

module.exports.getAllMessages = async (_, res) => {
  const query = preparedStmts.getAllMessages();

  try {
    const queryRes = await client.query(query);
    res.statusCode = 200;
    res.json({ message: "200 | OK", data: queryRes.rows });
  } catch (err) {
    res.statusCode = 500;
    res.json({ message: "500 | Internal Server Error" });
  }
};

module.exports.createNewMessage = async (req, res) => {
  const { author_id, text_content } = req.body;
  const params = {
    author_id,
    text_content,
    timestamp: new Date(),
  };
  const query = preparedStmts.createNewMessage(params);

  try {
    await client.query(query);
    res.statusCode = 201;
    res.json({ message: "201 | Created" });
  } catch (err) {
    res.statusCode = 500;
    res.json({ message: "500 | Internal Server Error" });
  }
};
