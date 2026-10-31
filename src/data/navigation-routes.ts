import {
  Bell,
  Building,
  Building2,
  CreditCard,
  Home,
  Key,
  Lock,
  LucideIcon,
  Mail,
  ScrollText,
  Settings,
  Settings2,
  Shield,
  ShieldCheck,
  User,
  Users,
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
        title: 'User Management',
        slug: 'user-management',
        type: 'dropdown',
        icon: Users,
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
    ],
  },
  {
    title: 'General',
    items: [
      {
        title: 'Workspace',
        slug: 'workspace',
        type: 'dropdown',
        icon: Building2,
        items: [
          {
            title: 'General',
            slug: 'general',
            url: '/workspace',
            icon: Settings2,
            type: 'route',
          },
          {
            title: 'Billing',
            slug: 'billing',
            url: '/workspace/billing',
            icon: CreditCard,
            type: 'route',
          },
          {
            title: 'API keys',
            slug: 'api-keys',
            url: '/workspace/api-keys',
            icon: Key,
            type: 'route',
          },
          {
            title: 'Audit log',
            slug: 'audit-log',
            url: '/workspace/audit-log',
            icon: ScrollText,
            type: 'route',
          },
        ],
      },
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
          {
            title: 'Security',
            slug: 'security',
            url: '/settings/security',
            icon: ShieldCheck,
            type: 'route',
          },
        ],
      },
    ],
  },
];

export function findDropdown(slug: string | null) {
  if (!slug) return null;
  for (const section of navigationRoutes) {
    for (const item of section.items) {
      if (item.type === 'dropdown' && item.slug === slug) return item;
    }
  }
  return null;
}

export function findDropdownForPath(pathname: string) {
  for (const section of navigationRoutes) {
    for (const item of section.items) {
      if (
        item.type === 'dropdown' &&
        item.items.some(
          (subItem) =>
            pathname === subItem.url || pathname.startsWith(`${subItem.url}/`),
        )
      ) {
        return item;
      }
    }
  }
  return null;
}
