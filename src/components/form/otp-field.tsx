import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function OtpField({
  label,
  description,
  length = 6,
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  length?: number;
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
          <InputOTP
            id={props.id}
            name={field.name}
            maxLength={length}
            pattern={REGEXP_ONLY_DIGITS}
            inputMode="numeric"
            autoComplete="one-time-code"
            value={field.state.value}
            disabled={props.disabled || props.readOnly}
            aria-invalid={props['aria-invalid']}
            aria-describedby={props['aria-describedby']}
            aria-required={props['aria-required']}
            onBlur={field.handleBlur}
            onChange={(value) => field.handleChange(value)}
          >
            <InputOTPGroup>
              {Array.from({ length }, (_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  aria-invalid={props['aria-invalid']}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        );
      }}
    </FieldFrame>
  );
}

export { OtpField };
