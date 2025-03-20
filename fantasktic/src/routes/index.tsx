// Node Modules
import { createBrowserRouter } from 'react-router';

// Pages

// Layouts
import RootLayout from '@/layouts/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
]);

export default router;
