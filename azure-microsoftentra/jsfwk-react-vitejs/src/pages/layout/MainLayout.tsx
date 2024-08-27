import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Topbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}