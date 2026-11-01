import { Textarea } from '@/components/ui/textarea';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function TextareaField({
  label,
  description,
  placeholder,
  required,
  disabled,
  readOnly,
  rows = 4,
}: {
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
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
        <Textarea
          name={field.name}
          rows={rows}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          {...controlProps(control)}
        />
      )}
    </FieldFrame>
  );
}

export { TextareaField };
