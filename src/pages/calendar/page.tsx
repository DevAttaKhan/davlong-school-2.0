import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { AdminCalendar } from "@/components/features/admin/calendar/Calendar";
import { Loading } from "./loading";
import { Error } from "./error";

export const CalendarPage = () => (
  <AppFalbackWrapper
    isLoading={false}
    isError={false}
    LoadingComponent={<Loading />}
    ErrorComponent={<Error />}
  >
    <AdminCalendar />
  </AppFalbackWrapper>
);
