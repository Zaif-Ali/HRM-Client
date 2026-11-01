import { Checkbox } from '@/components/ui/checkbox';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function CheckboxField({
  label,
  description,
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}) {
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
        const props = controlProps(control);
        return (
          <Checkbox
            id={props.id}
            name={field.name}
            checked={field.state.value}
            disabled={props.disabled || props.readOnly}
            aria-invalid={props['aria-invalid']}
            aria-describedby={props['aria-describedby']}
            aria-required={props['aria-required']}
            aria-readonly={control.readOnly || undefined}
            onBlur={field.handleBlur}
            onCheckedChange={(checked) => field.handleChange(checked === true)}
          />
        );
      }}
    </FieldFrame>
  );
}

export { CheckboxField };
