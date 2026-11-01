import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, Search, Undo2, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Kbd } from '@/components/ui/kbd';
import { navigationRoutes } from '@/data/navigation-routes';

type SearchItem = {
  label: string;
  url: string;
  icon: LucideIcon;
};

type SearchGroup = {
  heading: string;
  items: SearchItem[];
};

function buildGroups(): SearchGroup[] {
  const groups: SearchGroup[] = [];

  for (const section of navigationRoutes) {
    const routes: SearchItem[] = [];

    for (const item of section.items) {
      if (item.type === 'route') {
        routes.push({
          label: item.title,
          url: item.url,
          icon: item.icon,
        });
        continue;
      }

      if (routes.length > 0) {
        groups.push({ heading: section.title, items: routes.splice(0) });
      }

      groups.push({
        heading: item.title,
        items: item.items.map((subItem) => ({
          label: subItem.title,
          url: subItem.url,
          icon: subItem.icon,
        })),
      });
    }

    if (routes.length > 0) {
      groups.push({ heading: section.title, items: routes });
    }
  }

  return groups;
}

const groups = buildGroups();

const CommandBox = () => {
  const navigate = useNavigate();
  const openInPlace = React.useRef(true);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-8 w-full justify-start border-sidebar-border bg-sidebar px-2 font-normal text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Search />
        Search
        <Kbd className="ml-auto">⌘K</Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        showCloseButton={false}
        className="gap-0 p-0 sm:max-w-lg"
      >
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group, index) => (
            <React.Fragment key={group.heading}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup
                heading={group.heading}
                className="**:[[cmdk-group-items]]:flex **:[[cmdk-group-items]]:flex-col **:[[cmdk-group-items]]:gap-1"
              >
                {group.items.map((item) => (
                  <CommandItem
                    key={item.url}
                    asChild
                    value={`${group.heading} ${item.label}`}
                    onSelect={() => {
                      setOpen(false);
                      if (openInPlace.current) navigate(item.url);
                      openInPlace.current = true;
                    }}
                  >
                    <Link
                      to={item.url}
                      onPointerDown={(event) => {
                        openInPlace.current = !(
                          event.metaKey ||
                          event.ctrlKey ||
                          event.shiftKey ||
                          event.altKey ||
                          event.button !== 0
                        );
                      }}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
        <CommandSeparator />
        <div className="flex flex-wrap items-center gap-4 p-4 text-muted-foreground">
          <div className="flex flex-1 items-center gap-2">
            <kbd className="rounded border px-1 text-sm">esc</kbd>
            <span>To close</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded border">
              <Undo2 className="size-4" />
            </div>
            <span>To select</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded border">
              <ArrowUp className="size-4" />
            </div>
            <div className="flex size-5 items-center justify-center rounded border">
              <ArrowDown className="size-4" />
            </div>
            <span>To navigate</span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};

export default CommandBox;
