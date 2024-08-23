import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Custom404 from "./pages/404.tsx";
import HomePage from "./pages/HomePage.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Custom404 />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
