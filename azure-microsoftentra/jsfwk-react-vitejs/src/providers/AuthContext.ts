import { createContext } from "react";

export interface TokenPayload {
  name: string;
  upn: string;
}

export interface AuthContextType {
  getAccessToken: () => string | null;
  getAccessTokenPayload: (token: string | null) => TokenPayload | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
