// Node Modules
import { createBrowserRouter } from 'react-router';

// Pages
import HomePage from '@/pages/HomePage';

// Layouts
import RootLayout from '@/layouts/RootLayout';

// Types
import type { RouteObject } from 'react-router';

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: rootRouteChildren,
  },
]);

export default router;
