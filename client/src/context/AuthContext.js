import { createContext } from "react";

export const data = {
  isSignedIn: false,
  isGuest: false,
  username: "",
};

export const AuthContext = createContext();
