import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFieldContext } from '@/components/form/context';
import {
  FieldFrame,
  choiceControlProps,
  useReadOnlyOpen,
} from '@/components/form/field-frame';

function ComboboxField({
  label,
  description,
  placeholder = 'Select',
  searchPlaceholder = 'Search…',
  empty = 'No results.',
  options,
  required,
  disabled,
  readOnly,
}: Readonly<{
  label: string;
  description?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  empty?: string;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}>) {
  const field = useFieldContext<string>();
  const disclosure = useReadOnlyOpen(Boolean(readOnly));
  const selected = options.find((option) => option.value === field.state.value);

  return (
    <FieldFrame
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
    >
      {(control) => {
        const props = choiceControlProps(control);
        return (
          <Popover open={disclosure.open} onOpenChange={disclosure.onOpenChange}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                id={props.id}
                aria-expanded={disclosure.open}
                disabled={props.disabled}
                aria-invalid={props['aria-invalid']}
                aria-describedby={props['aria-describedby']}
                aria-required={props['aria-required']}
                aria-readonly={props['aria-readonly']}
                className={cn(
                  'w-full justify-between font-normal',
                  !selected && 'text-muted-foreground'
                )}
                onBlur={field.handleBlur}
              >
                <span className="truncate">
                  {selected?.label ?? placeholder}
                </span>
                <ChevronsUpDown data-icon="inline-end" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-(--radix-popover-trigger-width) p-0"
              align="start"
            >
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{empty}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          if (control.readOnly) return;
                          field.handleChange(option.value);
                          disclosure.onOpenChange(false);
                        }}
                      >
                        <span className="flex-1 truncate">{option.label}</span>
                        <Check
                          className={cn(
                            option.value === field.state.value
                              ? ''
                              : 'invisible'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    </FieldFrame>
  );
}

export { ComboboxField };
