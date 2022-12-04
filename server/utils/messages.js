const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(utc);
dayjs.extend(localizedFormat);

module.exports.formatMessage = (username, message, timestamp) => {
  // if (!timestamp) {
  //   console.log("w/o utc:", dayjs().format("ll LT"));
  //   console.log("w/ utc:", dayjs.utc().format("ll LT"));
  // }

  return {
    username,
    message,
    //timestamp: dayjs(timestamp).format("ll LT"),
    timestamp: timestamp || dayjs.utc().format(),
  };
};
