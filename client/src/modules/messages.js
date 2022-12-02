import { host } from "../utils/host";
import * as dayjs from "dayjs";
import * as LocalizedFormat from "dayjs/plugin/localizedFormat";
import uniqid from "uniqid";

dayjs.extend(LocalizedFormat);

export const getMessages = async (room, setChatMessages) => {
  const response = await fetch(`${host}/api/messages?room=${room}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then((resp) => resp)
    .catch((err) => console.log(err));

  if (response.status === 200) {
    let { data } = await response.json();
    const oldMessages = data.map((elem) => {
      return {
        id: uniqid(),
        username: elem.username,
        message: elem.text_content,
        time: dayjs(elem.created_on).format("ll LT"),
      };
    });
    setChatMessages(oldMessages);
  }
};

export const addNewMessage = () => {};
