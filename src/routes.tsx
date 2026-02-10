import { createBrowserRouter } from "react-router";

import {
  LoginPage,
  HomePage,
  BookingPage,
  DashboardPage,
  QuotationsPage,
  CalendarPage,
  UsersPage,
  TransactionsPage,
  EmailTemplatesPage,
  SettingsPage,
} from "@/pages";
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
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "quotations", element: <QuotationsPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "email-templates", element: <EmailTemplatesPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
