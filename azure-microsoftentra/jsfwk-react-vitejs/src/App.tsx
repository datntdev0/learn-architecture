import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlankPage from "./components/layout/BlankPage";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import ReverseProtectedRoute from "./components/routes/ReverseProtectedRoute";
import Custom404 from "./pages/404";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import HomePage from "./pages/HomePage";

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