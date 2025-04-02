// Node Modules
import { createBrowserRouter } from "react-router";

// Pages
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";

// Error Pages
import RootErrorPage from "@/pages/RootErrorPage";

// Layouts
import RootLayout from "@/layouts/RootLayout";

// Types
import type { RouteObject } from "react-router";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: rootRouteChildren,
  },
]);

export default router;
