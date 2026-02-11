import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { AdminQuotations } from "@/components/features/admin/quotations/Quotations";
import { UserQuotations } from "@/components/features/user/quotations/UserQuotations";



export const QuotationsPage = () => {
  const role = useSelector((state: RootState) => state.auth.user?.role);


  if (role === 'admin') return <AdminQuotations />
  if (role === 'user') return <UserQuotations />


}