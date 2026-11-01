import { Switch } from '@/components/ui/switch';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, choiceControlProps } from '@/components/form/field-frame';

function SwitchField({
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
          <Switch
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
              field.handleChange(checked);
            }}
          />
        );
      }}
    </FieldFrame>
  );
}

export { SwitchField };
