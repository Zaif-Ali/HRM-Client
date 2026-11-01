import { Checkbox } from '@/components/ui/checkbox';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, choiceControlProps } from '@/components/form/field-frame';

function CheckboxField({
  label,
  description,
  required,
  disabled,
  readOnly,
}: Readonly<{
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}>) {
  const field = useFieldContext<boolean>();

  return (
    <FieldFrame
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      inline
    >
      {(control) => {
        const props = choiceControlProps(control);
        return (
          <Checkbox
            id={props.id}
            name={field.name}
            checked={field.state.value}
            disabled={props.disabled}
            aria-invalid={props['aria-invalid']}
            aria-describedby={props['aria-describedby']}
            aria-required={props['aria-required']}
            aria-readonly={props['aria-readonly']}
            onBlur={field.handleBlur}
            onCheckedChange={(checked) => {
              if (control.readOnly) return;
              field.handleChange(checked === true);
            }}
          />
        );
      }}
    </FieldFrame>
  );
}

export { CheckboxField };
