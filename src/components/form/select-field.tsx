import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

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
          <Select
            value={field.state.value}
            disabled={props.disabled || props.readOnly}
            onValueChange={(value) => field.handleChange(value)}
          >
            <SelectTrigger
              id={props.id}
              className="w-full"
              aria-invalid={props['aria-invalid']}
              aria-describedby={props['aria-describedby']}
              aria-required={props['aria-required']}
              aria-readonly={control.readOnly || undefined}
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
