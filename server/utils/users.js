const users = [];

module.exports.addUser = (id, username, room) => {
  const index = users.findIndex((elem) => elem.id === id);
  users.push({ id, username, room });
};

module.exports.updateUser = (user) => {
  const index = users.findIndex((elem) => elem.id === user.id);
  users[index] = user;
};

module.exports.deleteUser = (id) => {
  const index = users.findIndex((elem) => elem.id === id);

  if (index > -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports.getUser = (id) => {
  return users.find((elem) => elem.id === id);
};

module.exports.getRoomUsers = (room) => {
  return users.filter((elem) => elem.room === room);
};
