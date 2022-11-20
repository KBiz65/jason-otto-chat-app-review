import { createContext } from "react";

export const data = {
  isSignedIn: false,
  username: "",
};

export const AuthContext = createContext();
