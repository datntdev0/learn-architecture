import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useState } from "react";
import { msalConfig } from "../config/authConfig";
import { AccountProfile } from "../models/AccountProfile";
import { AuthContext, AuthContextType } from "./AuthContext";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [profile, setProfile] = useState<AccountProfile | null>(null);

  const getAccessToken = (): string | null => {
    const keys = Object.keys(window.localStorage);
    const storageKey = keys.find(x => x.includes("accesstoken"));
    const storageValue = window.localStorage.getItem(storageKey || '');
    const storageObject = JSON.parse(storageValue || "{}");
    const accessToken = storageObject?.secret;
    return accessToken;
  };

  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await fetch("https://localhost:7216/Accounts/profile", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`,
        }
      });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue: AuthContextType = {
    profile,
    fetchProfile,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value= { contextValue }>
      <MsalProvider instance={ new PublicClientApplication(msalConfig) }>
        { children }
      </MsalProvider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;