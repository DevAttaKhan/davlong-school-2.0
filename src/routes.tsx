import { createBrowserRouter } from "react-router";

import { LoginPage, HomePage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);
