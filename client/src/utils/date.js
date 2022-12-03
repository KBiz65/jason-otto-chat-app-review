import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.extend(utc);

export const getUTCDate = () => {
  return dayjs.utc().format();
};

export const formatToLocalTime = (UTCdate) => {
  return dayjs(UTCdate).format("ll LT");
};
