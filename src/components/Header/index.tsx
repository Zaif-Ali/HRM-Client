import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import ThemeButton from '../Button/ThemeButton';
import { findPageTrail } from '@/data/navigation-routes';

const Header = () => {
  const { pathname } = useLocation();
  const trail = findPageTrail(pathname);

  return (
    <header className="sticky top-0 z-40 border-b bg-background px-4 pt-[env(safe-area-inset-top)]">
      <div className="flex h-12 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap gap-1.5 sm:gap-1.5">
              {trail.map((crumb, index) => {
                const current = index === trail.length - 1;
                return (
                  <Fragment key={`${crumb.title}-${index}`}>
                    {index > 0 ? <BreadcrumbSeparator /> : null}
                    <BreadcrumbItem className="min-w-0">
                      {current ? (
                        <BreadcrumbPage className="truncate">
                          {crumb.title}
                        </BreadcrumbPage>
                      ) : (
                        <span className="truncate">{crumb.title}</span>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
