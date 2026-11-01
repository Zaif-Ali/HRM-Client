import { Mail } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function EmailField({
  label,
  description,
  placeholder = 'Email address',
  autoComplete = 'email',
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  placeholder?: string;
  autoComplete?: string;
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
        <InputGroup>
          <InputGroupInput
            name={field.name}
            type="email"
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
            {...controlProps(control)}
          />
          <InputGroupAddon align="inline-end">
            <Mail />
          </InputGroupAddon>
        </InputGroup>
      )}
    </FieldFrame>
  );
}

export { EmailField };
