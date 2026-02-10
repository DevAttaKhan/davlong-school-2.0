import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { AdminUsersList } from "@/components/features/admin/users/UsersList";
import { Loading } from "./loading";
import { Error } from "./error";

export const UsersPage = () => (
  <AppFalbackWrapper
    isLoading={false}
    isError={false}
    LoadingComponent={<Loading />}
    ErrorComponent={<Error />}
  >
    <AdminUsersList />
  </AppFalbackWrapper>
);
