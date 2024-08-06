import { MsalProvider } from "@azure/msal-react";
import { createContext } from "react";
import { msalInstance } from "./msalConfig";

export interface TokenPayload {
  name: string;
  email: string;
}

export interface AuthContextType {
  getAccessToken: () => string | null;
  getAccessTokenPayload: (token: string) => TokenPayload | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const getAccessToken = (): string | null => {
    const keys = Object.keys(window.sessionStorage);
    const storageKey = keys.find(x => x.includes("accesstoken"));
    const storageValue = window.sessionStorage.getItem(storageKey || '');
    const storageObject = JSON.parse(storageValue || "{}");
    const accessToken = storageObject?.secret;
    return accessToken;
  };

  const getAccessTokenPayload = (token: string): TokenPayload | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error parsing access token:', error);
      return null;
    }
  };

  const contextValue: AuthContextType = {
    getAccessToken,
    getAccessTokenPayload,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <MsalProvider instance={msalInstance}>
        {children}
      </MsalProvider>
    </AuthContext.Provider>
  )
}

export default AuthProvider;