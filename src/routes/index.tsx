import SideBarLayout from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import Notifications from '@/pages/Settings/notifications';
import Profile from '@/pages/Settings/profile';
import Security from '@/pages/Settings/security';
import ApiKeys from '@/pages/Workspace/api-keys';
import AuditLog from '@/pages/Workspace/audit-log';
import Billing from '@/pages/Workspace/billing';
import WorkspaceGeneral from '@/pages/Workspace/general';
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
          {
            path: '/settings/security',
            element: <Security />,
          },
          {
            path: '/workspace',
            element: <WorkspaceGeneral />,
          },
          {
            path: '/workspace/billing',
            element: <Billing />,
          },
          {
            path: '/workspace/api-keys',
            element: <ApiKeys />,
          },
          {
            path: '/workspace/audit-log',
            element: <AuditLog />,
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
