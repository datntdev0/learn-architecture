import { createContext } from "react";
import { AccountProfile } from "../models/AccountProfile";

export interface AuthContextType {
  profile: AccountProfile | null;
  fetchProfile: () => Promise<void>;
  getAccessToken: () => string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
