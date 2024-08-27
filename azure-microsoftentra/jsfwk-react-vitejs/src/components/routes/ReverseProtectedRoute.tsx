import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import React from 'react';
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ReverseProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <>
      <AuthenticatedTemplate>
        <Navigate to="/admin" />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {children}
      </UnauthenticatedTemplate>
    </>
  );
}

export default ReverseProtectedRoute;