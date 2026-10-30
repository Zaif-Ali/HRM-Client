import SideBarLayout from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import Notifications from '@/pages/Settings/notifications';
import Profile from '@/pages/Settings/profile';
import ErrorPage from '@/utils/common/pages/error-page';
import NotFound from '@/utils/common/pages/not-found';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <SideBarLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/settings/profile',
            element: <Profile />,
          },
          {
            path: '/settings/notifications',
            element: <Notifications />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound/>,
      }
    ],
  },
]);
export default router;
