import { host } from "../utils/host";

export const createUser = async (username, email, password) => {
  const response = await fetch(`${host}/api/users`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((resp) => resp)
    .catch((err) => err);

  return response;
};

export const signin = async (username, password) => {
  const response = await fetch(`${host}/signin`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return response;
};

export const signout = async () => {
  const response = await fetch(`${host}/signout`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return response.status;
};
