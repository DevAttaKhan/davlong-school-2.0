import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { AdminDashboard } from "@/components/features/admin/dashboard/Dashboard";
import { UserDashboard } from "@/components/features/user/dashboard/Dashboard";

export const DashboardPage = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);

  if (role === "admin") {
    return <AdminDashboard />;
  }
  return <UserDashboard />;
};
