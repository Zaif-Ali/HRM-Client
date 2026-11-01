import { useRef, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useFieldContext } from '@/components/form/context';
import { FieldFrame, choiceControlProps } from '@/components/form/field-frame';

type FileFieldControls = ReturnType<typeof choiceControlProps> & {
  open: () => void;
  clear: () => void;
  onBlur: () => void;
};

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
  onFile,
  children,
}: Readonly<{
  label: string;
  description?: string;
  accept?: string;
  maxBytes?: number;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onFile?: (file: File) => void;
  children?: (controls: FileFieldControls) => ReactNode;
}>) {
  const field = useFieldContext<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const reject = (message: string) => {
    field.setMeta((prev) => ({
      ...prev,
      isTouched: true,
      errorMap: { ...prev.errorMap, onChange: message },
      errorSourceMap: { ...prev.errorSourceMap, onChange: 'field' },
    }));
  };

  const clearError = () => {
    field.setMeta((prev) => ({
      ...prev,
      errorMap: { ...prev.errorMap, onChange: undefined },
      errorSourceMap: { ...prev.errorSourceMap, onChange: undefined },
    }));
  };

  return (
    <FieldFrame
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
    >
      {(control) => {
        const props = choiceControlProps(control);
        const open = () => {
          if (control.readOnly || control.disabled) return;
          inputRef.current?.click();
        };
        const clear = () => {
          clearError();
          field.handleChange('');
        };
        const controls: FileFieldControls = {
          ...props,
          open,
          clear,
          onBlur: field.handleBlur,
        };
        return (
          <>
            <input
              ref={inputRef}
              type="file"
              name={field.name}
              accept={accept}
              tabIndex={-1}
              aria-hidden
              className="sr-only"
              disabled={props.disabled}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file || control.readOnly) {
                  event.target.value = '';
                  return;
                }
                if (!fileAllowed(file, accept)) {
                  event.target.value = '';
                  reject('That file type is not allowed.');
                  return;
                }
                if (maxBytes && file.size > maxBytes) {
                  event.target.value = '';
                  reject('That file is too large.');
                  return;
                }
                onFile?.(file);
                clearError();
                field.handleChange(file.name);
                event.target.value = '';
              }}
            />
            {children ? (
              children(controls)
            ) : (
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  id={props.id}
                  disabled={props.disabled}
                  aria-invalid={props['aria-invalid']}
                  aria-describedby={props['aria-describedby']}
                  aria-required={props['aria-required']}
                  aria-readonly={props['aria-readonly']}
                  onBlur={field.handleBlur}
                  onClick={open}
                >
                  Choose file
                </Button>
                <span className="min-w-0 truncate text-sm text-muted-foreground">
                  {field.state.value || 'No file chosen'}
                </span>
              </div>
            )}
          </>
        );
      }}
    </FieldFrame>
  );
}

export { FileField };
