import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Settings } from "@/components/features/common/settings/Settings";
import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { Loading } from "./loading";
import { Error } from "./error";

export const SettingsPage = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);

  return (
    <AppFalbackWrapper
      isLoading={false}
      isError={false}
      LoadingComponent={<Loading />}
      ErrorComponent={<Error />}
    >
      <Settings />
    </AppFalbackWrapper>
  );
};
