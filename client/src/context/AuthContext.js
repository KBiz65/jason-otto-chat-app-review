import { createContext } from "react";

export const state = {
  username: "",
  isSignedIn: false,
  isGuest: false,
  justSignedOut: false,
};

export const AuthContext = createContext();
