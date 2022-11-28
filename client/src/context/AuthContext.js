import { createContext } from "react";

export const state = {
  isSignedIn: false,
  isGuest: false,
  username: "",
};

export const AuthContext = createContext();
