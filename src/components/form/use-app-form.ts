import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '@/components/form/context';
import { CheckboxField } from '@/components/form/checkbox-field';
import { ComboboxField } from '@/components/form/combobox-field';
import { DateField } from '@/components/form/date-field';
import { EmailField } from '@/components/form/email-field';
import { FileField } from '@/components/form/file-field';
import { OtpField } from '@/components/form/otp-field';
import { PasswordField } from '@/components/form/password-field';
import { PhoneField } from '@/components/form/phone-field';
import { SelectField } from '@/components/form/select-field';
import { SubmitButton } from '@/components/form/submit-button';
import { SwitchField } from '@/components/form/switch-field';
import { TextareaField } from '@/components/form/textarea-field';
import { TextField } from '@/components/form/text-field';

const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    EmailField,
    PasswordField,
    PhoneField,
    SelectField,
    ComboboxField,
    CheckboxField,
    SwitchField,
    DateField,
    FileField,
    OtpField,
  },
  formComponents: {
    SubmitButton,
  },
});

export { useAppForm, withForm };
