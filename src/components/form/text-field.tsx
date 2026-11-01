import { Input } from '@/components/ui/input';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function TextField({
  label,
  description,
  placeholder,
  autoComplete,
  required,
  disabled,
  readOnly,
  type = 'text',
  spellCheck,
  parse,
}: {
  label: string;
  description?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  type?: 'text' | 'email' | 'url';
  spellCheck?: boolean;
  parse?: (value: string) => string;
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
        <Input
          name={field.name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          spellCheck={spellCheck}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) =>
            field.handleChange(
              parse ? parse(event.target.value) : event.target.value
            )
          }
          {...controlProps(control)}
        />
      )}
    </FieldFrame>
  );
}

export { TextField };
