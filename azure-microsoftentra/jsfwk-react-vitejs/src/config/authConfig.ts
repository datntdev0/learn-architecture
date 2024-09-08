import { Configuration, LogLevel } from "@azure/msal-browser";

const CLIENT_ID = "773e2572-c2de-433a-aeea-02c6b6fc975b";
const TENANT_ID = "f5d0b41b-498b-426f-be6f-354a5d64cced";
const APP_BASE_URL = "http://localhost:5173";

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    redirectUri: `${APP_BASE_URL}`,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

export const loginRequest = {
  scopes: ["api://learn-architecture-azure/Application.Access"] as string[]
};

