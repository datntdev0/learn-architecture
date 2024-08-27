import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../config/authConfig";
import { TokenPayload, AuthContextType, AuthContext } from "./AuthContext";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const getAccessToken = (): string | null => {
    const keys = Object.keys(window.localStorage);
    const storageKey = keys.find(x => x.includes("accesstoken"));
    const storageValue = window.localStorage.getItem(storageKey || '');
    const storageObject = JSON.parse(storageValue || "{}");
    const accessToken = storageObject?.secret;
    return accessToken;
  };

  const getAccessTokenPayload = (token: string | null): TokenPayload | null => {
    if (!token) return null;
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
    <AuthContext.Provider value= { contextValue } >
    <MsalProvider instance={ new PublicClientApplication(msalConfig) }>
      { children }
      </MsalProvider>
      </AuthContext.Provider>
  )
}

export default AuthProvider;