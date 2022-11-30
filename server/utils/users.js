const users = [];

module.exports.addUser = (id, username, room) => {
  const index = users.findIndex((elem) => elem.id === id);
  users.push({ id, username, room });

  console.log(users);
};

module.exports.updateUser = (user) => {
  const index = users.findIndex((elem) => elem.id === user.id);
  users[index] = user;

  console.log(users);
};

module.exports.getUser = (id) => {
  return users.find((elem) => elem.id === id);
};

module.exports.getRoomUsers = (room) => {
  return users.filter((elem) => elem.room === room);
};
