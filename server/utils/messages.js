const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

module.exports.formatMessage = (username, message, timestamp) => {
  return {
    username,
    message,
    timestamp: dayjs(timestamp).format("ll LT"),
  };
};
