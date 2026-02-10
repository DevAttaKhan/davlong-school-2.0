import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { AdminDashboard } from "@/components/features/admin/dashboard/Dashboard";
import { UserDashboard } from "@/components/features/user/dashboard/Dashboard";
import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { Loading } from "./loading";
import { Error } from "./error";

export const DashboardPage = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);

  return (
    <AppFalbackWrapper
      isLoading={false}
      isError={false}
      LoadingComponent={<Loading />}
      ErrorComponent={<Error />}
    >
      {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </AppFalbackWrapper>
  );
};
