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
import TodayPage from "@/pages/TodayPage";
import UpcomingPage from "@/pages/UpcomingPage";
import CompletedPage from "@/pages/CompletedPage";

// Error Pages
import RootErrorPage from "@/pages/RootErrorPage";

// Actions
import appAction from "@/routes/actions/appAction";
import projectAction from "@/routes/actions/projectAction";

// Loaders
import inboxTaskLoader from "@/routes/loaders/inboxLoader";
import todayTaskLoader from "@/routes/loaders/todayLoader";
import upcomingTaskLoader from "@/routes/loaders/upcomingLoader";
import completedTaskLoader from "@/routes/loaders/completedLoader";

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
    loader: inboxTaskLoader,
  },
  {
    path: "today",
    element: <TodayPage />,
    loader: todayTaskLoader,
  },
  {
    path: "upcoming",
    element: <UpcomingPage />,
    loader: upcomingTaskLoader,
  },
  {
    path: "completed",
    element: <CompletedPage />,
    loader: completedTaskLoader,
  },
  {
    path: "projects",
    action: projectAction,
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
