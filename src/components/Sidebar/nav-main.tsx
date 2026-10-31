import { ArrowLeft, ChevronRight } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import {
  findDropdown,
  findDropdownForPath,
  navigationRoutes,
} from '@/data/navigation-routes';
import React from 'react';

export function NavMain() {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    setActiveSlug(findDropdownForPath(pathname)?.slug ?? null);
  }, [pathname]);

  const activeDropdown = findDropdown(activeSlug);

  const closeMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  if (activeDropdown) {
    return (
      <SidebarGroup className="animate-in fade-in slide-in-from-left-2 gap-1 px-2 pb-2 pt-0 duration-200 motion-reduce:animate-none">
        <div className="flex h-8 items-center">
          <button
            type="button"
            aria-label="Back"
            className="flex size-8 shrink-0 items-center justify-center rounded-md outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            onClick={() => setActiveSlug(null)}
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="flex-1 text-center text-sm font-medium">
            {activeDropdown.title}
          </div>
          <div className="size-8 shrink-0" />
        </div>
        <SidebarGroupContent>
          <SidebarMenu>
            {activeDropdown.items.map((subItem) => (
              <SidebarMenuItem key={subItem.slug}>
                <SidebarMenuButton
                  asChild
                  tooltip={subItem.title}
                  isActive={subItem.url === pathname}
                  onClick={closeMobile}
                >
                  <Link to={subItem.url}>
                    <subItem.icon />
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <>
      {navigationRoutes.map((section) => (
        <SidebarGroup key={section.title} className="gap-1 px-2 pb-2 pt-0">
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.type === 'route' ? (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={item.url === pathname}
                    >
                      <Link to={item.url} onClick={closeMobile}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.items.some(
                        (subItem) => subItem.url === pathname,
                      )}
                      onClick={() => setActiveSlug(item.slug)}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto" />
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
