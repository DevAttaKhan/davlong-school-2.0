import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { getSidebarConfig } from "@/data/sidebar-config";
import type { DashboardRole } from "@/data/sidebar-config";
import { EHeader } from "../eheader";
import { Sidebar } from "../sidebar";

/** Same /dashboard route for both roles; UI (header, sidebar, content) depends on login role. */
export const DashboardLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const dashboardRole: DashboardRole =
    user?.role === "admin" ? "admin" : "user";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const sidebarConfig = getSidebarConfig(dashboardRole);

  return (
    <div className="flex min-h-screen flex-col">
      <EHeader role={dashboardRole} />
      <div className="flex flex-1 min-h-0">
        <Sidebar config={sidebarConfig} role={dashboardRole} />
        <main className="flex-1 min-w-0 overflow-auto bg-[#F0F2F4]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
