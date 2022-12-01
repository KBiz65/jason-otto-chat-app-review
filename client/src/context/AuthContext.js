import { createContext } from "react";

export const state = {
  id: null,
  username: "",
  isSignedIn: false,
  isGuest: false,
  justSignedOut: false,
};

export const AuthContext = createContext();
