import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ReverseProtectedRoute from "./components/ReverseProtectedRoute";
import Custom404 from "./pages/404";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import HomePage from "./pages/HomePage";
import BlankPage from "./pages/layout/BlankPage";
import MainLayout from "./pages/layout/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signin" element={<ReverseProtectedRoute><SignIn /></ReverseProtectedRoute>} />
        <Route path="/auth/signup" element={<ReverseProtectedRoute><SignUp /></ReverseProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<BlankPage />} />
        </Route>
        <Route path="*" element={<Custom404 />} />
      </Routes>
    </BrowserRouter>
  );
}