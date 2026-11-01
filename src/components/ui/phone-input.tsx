import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { cn } from 'cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type CountryOption = {
  value?: RPNInput.Country;
  label: string;
  divider?: boolean;
};

function Flag({
  country,
  countryName,
}: {
  country?: RPNInput.Country;
  countryName: string;
}) {
  const FlagIcon = country ? flags[country] : undefined;

  return (
    <span
      aria-hidden
      className="flex h-4 w-5 overflow-hidden rounded-sm bg-muted"
    >
      {FlagIcon ? <FlagIcon title={countryName} /> : null}
    </span>
  );
}

function CountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
}: {
  value?: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const countries = options.filter(
    (option): option is CountryOption & { value: RPNInput.Country } =>
      Boolean(option.value) && !option.divider
  );
  const selected = countries.find((option) => option.value === value);

  return (
    <InputGroupAddon align="inline-start">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <InputGroupButton
            size="sm"
            aria-label="Phone country"
            disabled={disabled || readOnly}
          >
            <Flag country={value} countryName={selected?.label ?? 'Country'} />
            <span>
              {value ? `+${RPNInput.getCountryCallingCode(value)}` : '+'}
            </span>
            <ChevronsUpDown />
          </InputGroupButton>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country…" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={`${option.label} +${RPNInput.getCountryCallingCode(option.value)}`}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <Flag country={option.value} countryName={option.label} />
                    <span className="flex-1 truncate">{option.label}</span>
                    <span className="text-muted-foreground">
                      +{RPNInput.getCountryCallingCode(option.value)}
                    </span>
                    <Check
                      className={cn(option.value === value ? '' : 'invisible')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </InputGroupAddon>
  );
}

function PhoneNumberControl(props: React.ComponentProps<'input'>) {
  return <InputGroupInput {...props} />;
}

function PhoneInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  disabled,
  readOnly,
  required,
  defaultCountry = 'PK',
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
  'aria-required': ariaRequired,
}: {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  defaultCountry?: RPNInput.Country;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
}) {
  return (
    <RPNInput.default
      id={id}
      name={name}
      value={value || undefined}
      onChange={(next) => onChange(next ?? '')}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      aria-describedby={ariaDescribedBy}
      aria-required={ariaRequired}
      defaultCountry={defaultCountry}
      international={false}
      addInternationalOption={false}
      smartCaret={false}
      flags={flags}
      limitMaxLength
      countrySelectComponent={CountrySelect}
      inputComponent={PhoneNumberControl}
      containerComponent={InputGroup}
      aria-invalid={ariaInvalid}
      className="w-full"
    />
  );
}

export { PhoneInput };
