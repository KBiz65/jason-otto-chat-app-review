const { client, preparedStmts } = require("../modules/db");

module.exports.getAllMessages = async (req, res) => {
  const { room } = req.query;
  const query = preparedStmts.getAllMessages(room);

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
  const { author_id, room, text_content, timestamp } = req.body;

  const params = {
    author_id,
    room,
    text_content,
    timestamp,
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
