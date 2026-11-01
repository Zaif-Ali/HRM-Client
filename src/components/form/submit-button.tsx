import { useSelector } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/form/context';

function SubmitButton({
  children,
  disabled,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'type'>) {
  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <Button
      type="submit"
      status={isSubmitting ? "loading" : undefined}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
}

export { SubmitButton };
