import {
  Banknote,
  Bell,
  Building,
  Cctv,
  Home,
  Lock,
  LucideIcon,
  Mail,
  Settings,
  Shield,
  User,
} from 'lucide-react';

type NavigationRoute = {
  title: string;
  slug: string;
  url: string;
  icon: LucideIcon;
  type: 'route';
};

type DropdownNavigationRoute = {
  title: string;
  slug: string;
  type: 'dropdown';
  icon: LucideIcon;
  items: NavigationRoute[];
};

export type TNavigationRoutes = {
  title: string;
  items: (NavigationRoute | DropdownNavigationRoute)[];
};

export const navigationRoutes: TNavigationRoutes[] = [
  {
    title: 'Navigation',
    items: [
      {
        title: 'Home',
        slug: '/',
        url: '/',
        icon: Home,
        type: 'route',
      },
      {
        title: 'Attendance',
        slug: 'attendance',
        url: '/attendance',
        icon: Cctv,
        type: 'route',
      },
      {
        title: 'Payroll',
        slug: 'payroll',
        url: '/payroll',
        icon: Banknote,
        type: 'route',
      },
    ],
  },
  {
    title: 'User Management',
    items: [
      {
        title: 'Users',
        slug: 'users',
        url: '/users',
        icon: User,
        type: 'route',
      },
      {
        title: 'Roles',
        slug: 'roles',
        url: '/roles',
        icon: Shield,
        type: 'route',
      },
      {
        title: 'Permissions',
        slug: 'permissions',
        url: '/permissions',
        icon: Lock,
        type: 'route',
      },
      {
        title: 'Departments',
        slug: 'departments',
        url: '/departments',
        icon: Building,
        type: 'route',
      },
      {
        title: 'Invitations',
        slug: 'invitations',
        url: '/invitations',
        icon: Mail,
        type: 'route',
      },
    ],
  },
  {
    title: 'General',
    items: [
      {
        title: 'Settings',
        slug: 'settings',
        type: 'dropdown',
        icon: Settings,
        items: [
          {
            title: 'Profile',
            slug: 'profile',
            url: '/settings/profile',
            icon: User,
            type: 'route',
          },
          {
            title: 'Notifications',
            slug: 'notifications',
            url: '/settings/notifications',
            icon: Bell,
            type: 'route',
          },
        ],
      },
    ],
  },
];
