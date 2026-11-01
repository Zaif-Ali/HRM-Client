import { format, isValid, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function toDate(value: string) {
  if (!value) return undefined;
  const date = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(date) ? date : undefined;
}

function DateField({
  label,
  description,
  placeholder = 'Pick a date',
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const field = useFieldContext<string>();
  const selected = toDate(field.state.value);

  return (
    <FieldFrame
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
    >
      {(control) => {
        const props = controlProps(control);
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                id={props.id}
                disabled={props.disabled || props.readOnly}
                aria-invalid={props['aria-invalid']}
                aria-describedby={props['aria-describedby']}
                aria-required={props['aria-required']}
                aria-readonly={control.readOnly || undefined}
                className={cn(
                  'w-full justify-between font-normal',
                  !selected && 'text-muted-foreground'
                )}
                onBlur={field.handleBlur}
              >
                {selected ? format(selected, 'd MMM yyyy') : placeholder}
                <CalendarIcon data-icon="inline-end" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={(date) =>
                  field.handleChange(date ? format(date, 'yyyy-MM-dd') : '')
                }
              />
            </PopoverContent>
          </Popover>
        );
      }}
    </FieldFrame>
  );
}

export { DateField };
