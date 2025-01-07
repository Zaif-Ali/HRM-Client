import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Check,
  CheckCheck,
  CircleX,
  Clock,
  LucideIcon,
  PlusCircle,
  Search,
} from 'lucide-react';
import React from 'react';

type RequestT = {
  label: string;
  value: string;
  icon?: LucideIcon;
  availableRequests: number;
};

const RequestStatus: RequestT[] = [
  {
    label: 'Pending',
    value: 'pending',
    icon: Clock,
    availableRequests: 10,
  },
  {
    label: 'Approved',
    value: 'approved',
    icon: CheckCheck,
    availableRequests: 2,
  },
  {
    label: 'Rejected',
    value: 'rejected',
    icon: CircleX,
    availableRequests: 9,
  },
];

const RequestType: RequestT[] = [
  {
    label: 'Leave',
    value: 'leave',
    availableRequests: 2,
  },
  {
    label: 'Overtime',
    value: 'overtime',
    availableRequests: 10,
  },
  {
    label: 'Travel',
    value: 'travel',
    availableRequests: 9,
  },
  {
    label: 'Training',
    value: 'training',
    availableRequests: 1,
  },
  {
    label: 'Promotion',
    value: 'promotion',
    availableRequests: 1,
  },
  {
    label: 'Meeting',
    value: 'meeting',
    availableRequests: 1,
  },
  {
    label: 'Other',
    value: 'other',
    availableRequests: 1,
  },
];

const Nav = () => {
  const [SelectedValues, setSelectedValues] = React.useState<RequestT[]>([]);
  const [SelectedType , setSelectedType] = React.useState<RequestT[]>([]);
  const handleSelectedValue = (value: string) => {
    if (SelectedValues.find((item) => item.value === value)) {
      setSelectedValues((prev) => {
        return prev.filter((item) => item.value !== value);
      });
      return;
    }
    const newSelectedValue = RequestStatus.find(
      (option) => option.value === value
    );
    if (newSelectedValue) {
      setSelectedValues((prev) => {
        return [...prev, newSelectedValue];
      });
    }
  };
  const handleSelectedType = (value: string) => {
    if (SelectedType.find((item) => item.value === value)) {
      setSelectedType((prev) => {
        return prev.filter((item) => item.value !== value);
      });
      return;
    }
    const newSelectedValue = RequestType.find(
      (option) => option.value === value
    );
    if (newSelectedValue) {
      setSelectedType((prev) => {
        return [...prev, newSelectedValue];
      });
    }
  };
  return (
    <React.Fragment>
      <div className="flex items-center gap-3">
        <div className="relative w-1/4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground " />
          <Input placeholder="Search" className="pl-8 shadow-none" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="border-dashed">
              <PlusCircle />
              Status
              {SelectedValues.length > 0 && (
                <React.Fragment>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal lg:hidden"
                  >
                    {SelectedValues.length}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex justify-center items-center">
                    {SelectedValues.length > 2 ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {SelectedValues.length} selected
                      </Badge>
                    ) : (
                      RequestStatus.filter((option) =>
                        SelectedValues.find(
                          (item) => item.value === option.value
                        )
                      ).map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                    )}
                  </div>
                </React.Fragment>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command className="">
              <CommandInput placeholder={'Search status...'} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {RequestStatus.map((option) => {
                    const isSelected = SelectedValues.find(
                      (value) => value.value === option.value
                    );
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          handleSelectedValue(option.value);
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <Check />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {option.availableRequests}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {SelectedValues.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setSelectedValues([])}
                        className="justify-center text-center"
                      >
                        Clear filters
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="border-dashed">
              <PlusCircle />
              Type
              {SelectedType.length > 0 && (
                <React.Fragment>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal lg:hidden"
                  >
                    {SelectedType.length}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex justify-center items-center">
                    {SelectedType.length > 2 ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {SelectedType.length} selected
                      </Badge>
                    ) : (
                      RequestType.filter((option) =>
                        SelectedType.find(
                          (item) => item.value === option.value
                        )
                      ).map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                    )}
                  </div>
                </React.Fragment>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command className="">
              <CommandInput placeholder={'Search status...'} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {RequestType.map((option) => {
                    const isSelected = SelectedType.find(
                      (value) => value.value === option.value
                    );
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          handleSelectedType(option.value);
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <Check />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {option.availableRequests}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {SelectedValues.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => setSelectedType([])}
                        className="justify-center text-center"
                      >
                        Clear filters
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </React.Fragment>
  );
};

export default Nav;
