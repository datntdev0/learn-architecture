import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import React from 'react';
import { loginRequest } from "../config/authConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { instance } = useMsal();

  function handleOnLoginButtonClick(): void {
    instance.loginRedirect(loginRequest)
      .catch(e => console.error(e));
  }

  return (
    <>
      <AuthenticatedTemplate>
        {children}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <section className="bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-center">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                401
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Unauthorized acccess
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can&apos;st allow you to access this page. Login is required to view this content.
              </p>
              <a
                href="/"
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                onClick={() => handleOnLoginButtonClick()}
              >
                Login
              </a>
            </div>
          </div>
        </section>
      </UnauthenticatedTemplate>
    </>
  );
}

export default ProtectedRoute;