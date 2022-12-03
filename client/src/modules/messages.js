import { host } from "../utils/host";
import uniqid from "uniqid";
import { formatToLocalTime } from "../utils/date";

// this has a side effect in setChatMessages because useEffects should not be async
// so everything this function does needs to be self-contained
export const getMessages = async (room, setChatMessages) => {
  const response = await fetch(`${host}/api/messages?room=${room}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then((resp) => resp)
    .catch((err) => console.log(err));

  if (response.status === 200) {
    const { data } = await response.json();
    const oldMessages = data.map((elem) => {
      return {
        id: uniqid(),
        username: elem.username,
        message: elem.text_content,
        time: formatToLocalTime(elem.created_on),
      };
    });
    setChatMessages(oldMessages);
  }
};

export const postMessage = async (authorId, room, message, timestamp) => {
  const response = await fetch(`${host}/api/messages`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author_id: authorId,
      room,
      text_content: message,
      timestamp,
    }),
  })
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return response.status;
};
