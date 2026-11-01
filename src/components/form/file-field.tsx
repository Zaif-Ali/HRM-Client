import { useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, controlProps } from '@/components/form/field-frame';

function fileAllowed(file: File, accept?: string) {
  if (!accept) return true;
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return accept.split(',').some((rule) => {
    const expected = rule.trim().toLowerCase();
    if (!expected) return false;
    if (expected.startsWith('.')) return name.endsWith(expected);
    if (expected.endsWith('/*')) return type.startsWith(expected.slice(0, -1));
    return type === expected;
  });
}

function FileField({
  label,
  description,
  accept,
  maxBytes,
  required,
  disabled,
  readOnly,
}: {
  label: string;
  description?: string;
  accept?: string;
  maxBytes?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const field = useFieldContext<string>();
  const inputRef = useRef<HTMLInputElement>(null);

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
        const locked = props.disabled || props.readOnly;
        return (
          <div className="flex min-w-0 items-center gap-3">
            <input
              ref={inputRef}
              type="file"
              name={field.name}
              accept={accept}
              tabIndex={-1}
              aria-hidden
              className="sr-only"
              disabled={locked}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = '';
                if (!file) return;
                if (!fileAllowed(file, accept)) {
                  toast.error('That file type is not allowed.');
                  return;
                }
                if (maxBytes && file.size > maxBytes) {
                  toast.error('That file is too large.');
                  return;
                }
                field.handleChange(file.name);
              }}
            />
            <Button
              type="button"
              variant="outline"
              id={props.id}
              disabled={locked}
              aria-invalid={props['aria-invalid']}
              aria-describedby={props['aria-describedby']}
              aria-required={props['aria-required']}
              aria-readonly={control.readOnly || undefined}
              onBlur={field.handleBlur}
              onClick={() => inputRef.current?.click()}
            >
              Choose file
            </Button>
            <span className="min-w-0 truncate text-sm text-muted-foreground">
              {field.state.value || 'No file chosen'}
            </span>
          </div>
        );
      }}
    </FieldFrame>
  );
}

export { FileField };
