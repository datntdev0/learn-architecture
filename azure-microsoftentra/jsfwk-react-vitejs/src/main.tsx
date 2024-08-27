import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { msalConfig } from "./config/authConfig";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={new PublicClientApplication(msalConfig)}>
      <App />
    </MsalProvider>
  </StrictMode>
);
