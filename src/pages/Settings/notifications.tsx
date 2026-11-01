import { toast } from 'sonner';
import { z } from 'zod';
import { formValidators, useAppForm } from '@/components/form';
import { SettingsSection } from '@/components/settings/settings-section';
import { FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';

const notificationsSchema = z.object({
  securityAlerts: z.boolean(),
  billingReceipts: z.boolean(),
  productUpdates: z.boolean(),
  weeklySummary: z.boolean(),
});

const Notifications = () => {
  const form = useAppForm({
    defaultValues: {
      securityAlerts: true,
      billingReceipts: true,
      productUpdates: false,
      weeklySummary: true,
    },
    validators: formValidators(notificationsSchema),
    onSubmit: () => {
      toast.success('Notification settings saved');
    },
  });

  return (
    <div className="flex w-full max-w-3xl flex-col mx-auto">
      <h1 className="sr-only">Notifications</h1>
      <form
        className="flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <SettingsSection
          title="Account"
          description="Mail about sign-in, billing, and this account."
        >
          <FieldGroup className="gap-5">
            <form.AppField
              name="securityAlerts"
              children={(field) => (
                <field.SwitchField
                  label="Security alerts"
                  description="Sign-in attempts and password changes."
                />
              )}
            />
            <form.AppField
              name="billingReceipts"
              children={(field) => (
                <field.SwitchField
                  label="Billing receipts"
                  description="Invoices and payment receipts."
                />
              )}
            />
          </FieldGroup>
        </SettingsSection>

        <Separator />

        <SettingsSection
          title="Updates"
          description="News and a short summary of what happened."
        >
          <div className="flex flex-col gap-6">
            <FieldGroup className="gap-5">
              <form.AppField
                name="productUpdates"
                children={(field) => (
                  <field.SwitchField
                    label="Product updates"
                    description="New features and changes."
                  />
                )}
              />
              <form.AppField
                name="weeklySummary"
                children={(field) => (
                  <field.SwitchField
                    label="Weekly summary"
                    description="One email each week."
                  />
                )}
              />
            </FieldGroup>
            <div className="flex justify-end">
              <form.AppForm>
                <form.SubmitButton>Save changes</form.SubmitButton>
              </form.AppForm>
            </div>
          </div>
        </SettingsSection>
      </form>
    </div>
  );
};

export default Notifications;
