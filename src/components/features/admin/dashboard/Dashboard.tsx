import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { Loading } from "./loading";
import { Error } from "./error";

export const AdminDashboard = () => {
  return (
    <AppFalbackWrapper
      isLoading={false}
      isError={false}
      LoadingComponent={<Loading />}
      ErrorComponent={<Error />}
    >
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome. Select an item from the sidebar.
        </p>
      </div>
    </AppFalbackWrapper>
  );
};
