import { PasswordInput } from '@/components/ui/password-input';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function PasswordField({
  label,
  description,
  autoComplete,
  placeholder,
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  autoComplete?: string;
  placeholder?: string;
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
      {(control) => (
        <PasswordInput
          name={field.name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(value) => field.handleChange(value)}
          {...controlProps(control)}
        />
      )}
    </FieldFrame>
  );
}

export { PasswordField };
