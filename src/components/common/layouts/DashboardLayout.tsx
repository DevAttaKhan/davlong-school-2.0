import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import type { RootState } from "@/store/store";
import { getSidebarConfig } from "@/data/sidebar-config";
import type { DashboardRole } from "@/data/sidebar-config";
import { DashboardHeader } from "../dashboard-header";
import { Sidebar } from "../sidebar";

/** Same /dashboard route for both roles; UI (header, sidebar, content) depends on login role. */
export const DashboardLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const dashboardRole: DashboardRole =
    user?.role === "admin" ? "admin" : "user";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lifted sidebar state
  const storageKey = useMemo(
    () => `sidebar-collapsed-${dashboardRole}`,
    [dashboardRole]
  );
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem(storageKey);
      return v === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(collapsed));
    } catch { }
  }, [collapsed, storageKey]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { main: mainConfig, bottom: bottomConfig } =
    getSidebarConfig(dashboardRole);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <DashboardHeader
        role={dashboardRole}
        onMenuClick={() => setMobileMenuOpen(true)}
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          mainConfig={mainConfig}
          bottomConfig={bottomConfig}
          role={dashboardRole}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <main className="flex-1 min-w-0 overflow-hidden bg-[#F0F2F4]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
