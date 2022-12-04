const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(utc);
dayjs.extend(localizedFormat);

module.exports.formatMessage = (username, message, timestamp) => {
  return {
    username,
    message,
    timestamp: timestamp || dayjs.utc().format(),
  };
};
