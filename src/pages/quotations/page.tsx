import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { AdminQuotations } from "@/components/features/admin/quotations/Quotations";
import { Loading } from "./loading";
import { Error } from "./error";

export const QuotationsPage = () => (
  <AppFalbackWrapper
    isLoading={false}
    isError={false}
    LoadingComponent={<Loading />}
    ErrorComponent={<Error />}
  >
    <AdminQuotations />
  </AppFalbackWrapper>
);
