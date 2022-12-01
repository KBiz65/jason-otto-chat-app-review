const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

module.exports.formatMessage = (username, message) => {
  return {
    username,
    message,
    time: dayjs().format("ll LT"),
  };
};
