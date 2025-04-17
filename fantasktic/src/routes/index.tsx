// Node Modules
import { createBrowserRouter } from "react-router";

// Layouts
import RootLayout from "@/layouts/RootLayout";
import AppLayout from "@/layouts/AppLayout";

// Root Pages
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import AuthSyncPage from "@/pages/AuthSyncPage";

// App Pages
import InboxPage from "@/pages/InboxPage";

// Error Pages
import RootErrorPage from "@/pages/RootErrorPage";

// Actions
import appAction from "@/routes/actions/appAction";

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
  {
    path: "auth-sync",
    element: <AuthSyncPage />,
  },
];

const appRouteChildren: RouteObject[] = [
  {
    path: "inbox",
    element: <InboxPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: rootRouteChildren,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction,
  },
]);

export default router;
