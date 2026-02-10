import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { AdminTransactions } from "@/components/features/admin/transactions/Transactions";
import { Loading } from "./loading";
import { Error } from "./error";

export const TransactionsPage = () => (
  <AppFalbackWrapper
    isLoading={false}
    isError={false}
    LoadingComponent={<Loading />}
    ErrorComponent={<Error />}
  >
    <AdminTransactions />
  </AppFalbackWrapper>
);
