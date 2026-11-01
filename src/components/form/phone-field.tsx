import type { Country } from 'react-phone-number-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function PhoneField({
  label,
  description,
  defaultCountry = 'PK',
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  defaultCountry?: Country;
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
        <PhoneInput
          name={field.name}
          defaultCountry={defaultCountry}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(value) => field.handleChange(value)}
          {...controlProps(control)}
        />
      )}
    </FieldFrame>
  );
}

export { PhoneField };
