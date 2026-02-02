import { createBrowserRouter } from "react-router";

import { LoginPage, HomePage, BookingPage } from "@/pages";

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
]);
