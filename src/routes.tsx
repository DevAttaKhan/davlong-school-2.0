import { createBrowserRouter } from "react-router";

import { LoginPage, HomePage, BookingPage, DashboardPage } from "@/pages";
import { DashboardLayout } from "@/components/common/layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/booking",
    element: <BookingPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
]);
