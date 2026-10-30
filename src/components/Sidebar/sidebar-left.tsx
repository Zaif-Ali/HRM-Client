import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import CommandBox from './command-box';
import ProfileDropdown from './profile-dropdown';
import { WorkspaceSwitcher } from './workspace-switcher';

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" variant="sidebar" side="left" {...props}>
      <SidebarHeader className="gap-2 p-2">
        <WorkspaceSwitcher />
        <CommandBox />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <NavMain />
      </SidebarContent>
      <SidebarFooter className="p-2">
        <ProfileDropdown />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
