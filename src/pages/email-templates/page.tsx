import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { AdminEmailTemplates } from "@/components/features/admin/email-templates/EmailTemplates";
import { Loading } from "./loading";
import { Error } from "./error";

export const EmailTemplatesPage = () => (
  <AppFalbackWrapper
    isLoading={false}
    isError={false}
    LoadingComponent={<Loading />}
    ErrorComponent={<Error />}
  >
    <AdminEmailTemplates />
  </AppFalbackWrapper>
);
