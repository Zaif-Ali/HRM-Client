import { useId, type ReactNode } from 'react';
import { useStore } from '@tanstack/react-form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { useFieldContext } from '@/components/form/context';

type FieldControlProps = {
  id: string;
  invalid: boolean;
  describedBy?: string;
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
};

function controlProps({
  id,
  invalid,
  describedBy,
  required,
  disabled,
  readOnly,
}: FieldControlProps) {
  return {
    id,
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    required: required || undefined,
    disabled: disabled || undefined,
    readOnly: readOnly || undefined,
  };
}

function toFieldErrors(errors: ReadonlyArray<unknown>) {
  return errors.flatMap((error) => {
    if (typeof error === 'string') return [{ message: error }];
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      return [{ message: error.message }];
    }
    return [];
  });
}

function FieldFrame({
  label,
  description,
  required = false,
  disabled = false,
  readOnly = false,
  inline = false,
  children,
}: {
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  inline?: boolean;
  children: (props: FieldControlProps) => ReactNode;
}) {
  const field = useFieldContext<string>();
  const submitted = useStore(
    field.form.store,
    (state) => state.submissionAttempts > 0
  );
  const invalid =
    !field.state.meta.isValid && (field.state.meta.isTouched || submitted);
  const uid = useId();
  const id = `${uid}-${field.name}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = `${id}-error`;
  const describedBy =
    [descriptionId, invalid ? errorId : undefined].filter(Boolean).join(' ') ||
    undefined;
  const control = children({
    id,
    invalid,
    describedBy,
    required,
    disabled,
    readOnly,
  });

  return (
    <Field
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      {inline ? (
        <div className="flex items-center gap-3">
          <FieldLabel htmlFor={id} className="flex-1">
            {label}
            {required ? (
              <span className="text-destructive" aria-hidden>
                *
              </span>
            ) : null}
          </FieldLabel>
          {control}
        </div>
      ) : (
        <>
          <FieldLabel htmlFor={id}>
            {label}
            {required ? (
              <span className="text-destructive" aria-hidden>
                *
              </span>
            ) : null}
          </FieldLabel>
          {control}
        </>
      )}
      {description ? (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      ) : null}
      {invalid ? (
        <FieldError id={errorId} errors={toFieldErrors(field.state.meta.errors)} />
      ) : null}
    </Field>
  );
}

export { FieldFrame, controlProps };
export type { FieldControlProps };
