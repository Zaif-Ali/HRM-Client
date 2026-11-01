import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFieldContext } from '@/components/form/context';
import {
  FieldFrame,
  choiceControlProps,
  useReadOnlyOpen,
} from '@/components/form/field-frame';

function SelectField({
  label,
  description,
  placeholder,
  options,
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const field = useFieldContext<string>();
  const disclosure = useReadOnlyOpen(Boolean(readOnly));

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
          <Select
            value={field.state.value === '' ? undefined : field.state.value}
            open={disclosure.open}
            disabled={props.disabled}
            onOpenChange={disclosure.onOpenChange}
            onValueChange={(value) => {
              if (control.readOnly) return;
              field.handleChange(value);
            }}
          >
            <SelectTrigger
              id={props.id}
              className="w-full"
              aria-invalid={props['aria-invalid']}
              aria-describedby={props['aria-describedby']}
              aria-required={props['aria-required']}
              aria-readonly={props['aria-readonly']}
              onBlur={field.handleBlur}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      }}
    </FieldFrame>
  );
}

export { SelectField };
