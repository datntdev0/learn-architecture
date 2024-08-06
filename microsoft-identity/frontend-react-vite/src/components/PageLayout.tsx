import { useIsAuthenticated } from "@azure/msal-react";
import React, { ReactNode } from "react";
import { Navbar } from "react-bootstrap";

import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

interface PageLayoutProps {
  children: ReactNode,
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="text-center">
      <Navbar bg="primary" variant="dark" className="px-2">
        <a className="navbar-brand" href="/">
          Microsoft Identity Platform
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Navbar>
      <div className="title mt-3">
        <h5>
          Welcome to the Microsoft Authentication Library For JavaScript - React SPA
        </h5>
      </div>
      <div className="profileContent">
        {children}
      </div>
    </div>
  )
}

export default PageLayout;