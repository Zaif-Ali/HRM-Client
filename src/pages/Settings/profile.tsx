import { useRef, useState } from 'react';
import { Check, ImageIcon, Trash2, Upload, X } from 'lucide-react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import { z } from 'zod';
import { cn } from 'cn';
import { formValidators, useAppForm } from '@/components/form';
import { SettingsSection } from '@/components/settings/settings-section';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3569&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const MAX_AVATAR_BYTES = 1024 * 1024;

const GENDERS = [
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'unspecified', label: 'Prefer not to say' },
];

const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'At least 12 characters',
    test: (value: string) => value.length >= 12,
  },
  {
    id: 'lower',
    label: 'At least 1 lowercase letter',
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    id: 'upper',
    label: 'At least 1 uppercase letter',
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: 'number',
    label: 'At least 1 number',
    test: (value: string) => /\d/.test(value),
  },
  {
    id: 'special',
    label: 'At least 1 special character',
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

const profileSchema = z.object({
  avatar: z.string(),
  firstName: z.string().trim().min(1, 'Enter your first name.'),
  lastName: z.string().trim().min(1, 'Enter your last name.'),
  username: z
    .string()
    .regex(/^[a-z0-9-]{2,}$/, 'Use letters, numbers, and dashes.'),
  mobile: z
    .string()
    .refine(
      (value) => value === '' || isValidPhoneNumber(value),
      'Enter a valid phone number.'
    ),
  gender: z.string(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.currentPassword === '' && value.newPassword === '') return;
    if (value.currentPassword === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currentPassword'],
        message: 'Enter your current password.',
      });
    }
    const failed = PASSWORD_RULES.some((rule) => !rule.test(value.newPassword));
    if (failed) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
        message: 'Choose a password that meets every requirement.',
      });
    }
  });

const Profile = () => {
  const uploadedUrl = useRef<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(DEFAULT_AVATAR);
  const [savedName, setSavedName] = useState('Huzaifa Majeed');
  const [deletionScheduled, setDeletionScheduled] = useState(false);

  const profileForm = useAppForm({
    defaultValues: {
      avatar: '',
      firstName: 'Huzaifa',
      lastName: 'Majeed',
      username: 'huzaifa',
      mobile: '+923001234567',
      gender: '',
    },
    validators: formValidators(profileSchema),
    onSubmit: ({ value }) => {
      setSavedName(`${value.firstName.trim()} ${value.lastName.trim()}`);
      toast.success('Profile saved');
    },
  });

  const passwordForm = useAppForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    validators: formValidators(passwordSchema),
    onSubmit: ({ value, formApi }) => {
      const changedPassword = value.newPassword !== '';
      formApi.setFieldValue('currentPassword', '');
      formApi.setFieldValue('newPassword', '');
      toast.success(changedPassword ? 'Password saved' : 'No changes to save');
    },
  });

  const showAvatar = (file: File) => {
    if (uploadedUrl.current) URL.revokeObjectURL(uploadedUrl.current);
    const url = URL.createObjectURL(file);
    uploadedUrl.current = url;
    setAvatarUrl(url);
  };

  const removeAvatar = () => {
    if (uploadedUrl.current) {
      URL.revokeObjectURL(uploadedUrl.current);
      uploadedUrl.current = null;
    }
    setAvatarUrl(null);
  };

  return (
    <div className="flex w-full max-w-3xl flex-col mx-auto">
      <h1 className="sr-only">Profile</h1>
      <SettingsSection
        title="Personal information"
        description="Manage your personal information."
      >
        <form
          className="flex flex-col gap-6"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void profileForm.handleSubmit();
          }}
        >
          <profileForm.AppField
            name="avatar"
            children={(field) => (
              <field.FileField
                label="Your avatar"
                description="Pick a photo up to 1MB."
                accept="image/png,image/jpeg,image/webp"
                maxBytes={MAX_AVATAR_BYTES}
                onFile={showAvatar}
              >
                {(controls) => (
                  <div className="flex items-center gap-3">
                    <Avatar className="size-16 border">
                      {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
                      <AvatarFallback>
                        <ImageIcon />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      id={controls.id}
                      aria-label="Upload avatar"
                      disabled={controls.disabled}
                      aria-invalid={controls['aria-invalid']}
                      aria-describedby={controls['aria-describedby']}
                      aria-required={controls['aria-required']}
                      aria-readonly={controls['aria-readonly']}
                      onBlur={controls.onBlur}
                      onClick={controls.open}
                    >
                      <Upload data-icon="inline-start" />
                      Upload avatar
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Remove avatar"
                      disabled={!avatarUrl}
                      onClick={() => {
                        controls.clear();
                        removeAvatar();
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                )}
              </field.FileField>
            )}
          />

          <FieldGroup className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <profileForm.AppField
              name="firstName"
              children={(field) => (
                <field.TextField
                  label="First name"
                  autoComplete="given-name"
                  required
                />
              )}
            />
            <profileForm.AppField
              name="lastName"
              children={(field) => (
                <field.TextField
                  label="Last name"
                  autoComplete="family-name"
                  required
                />
              )}
            />
            <profileForm.AppField
              name="username"
              children={(field) => (
                <field.TextField
                  label="Username"
                  autoComplete="username"
                  spellCheck={false}
                  required
                  parse={(value) =>
                    value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                  }
                />
              )}
            />
            <profileForm.AppField
              name="mobile"
              children={(field) => (
                <field.PhoneField label="Mobile" defaultCountry="PK" />
              )}
            />
            <profileForm.AppField
              name="gender"
              children={(field) => (
                <field.SelectField
                  label="Gender"
                  placeholder="Select"
                  options={GENDERS}
                />
              )}
            />
          </FieldGroup>

          <div className="flex justify-end">
            <profileForm.AppForm>
              <profileForm.SubmitButton>Save changes</profileForm.SubmitButton>
            </profileForm.AppForm>
          </div>
        </form>
      </SettingsSection>

      <Separator />

      <SettingsSection
        title="Password"
        description="Change the password for this account."
      >
        <form
          className="flex flex-col gap-5"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void passwordForm.handleSubmit();
          }}
        >
          <passwordForm.AppField
            name="currentPassword"
            children={(field) => (
              <field.PasswordField
                label="Current password"
                autoComplete="current-password"
                required
              />
            )}
          />
          <passwordForm.AppField
            name="newPassword"
            children={(field) => (
              <field.PasswordField
                label="New password"
                autoComplete="new-password"
                required
              />
            )}
          />

          <passwordForm.Subscribe selector={(state) => state.values.newPassword}>
            {(password) => (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Enter a password. Must contain:
                </p>
                <ul className="flex flex-col gap-1.5">
                  {PASSWORD_RULES.map((rule) => {
                    const met = rule.test(password);
                    return (
                      <li
                        key={rule.id}
                        className={cn(
                          'flex items-center gap-2 text-sm',
                          met ? 'text-success' : 'text-muted-foreground'
                        )}
                      >
                        {met ? (
                          <Check className="size-4" />
                        ) : (
                          <X className="size-4" />
                        )}
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </passwordForm.Subscribe>

          <div className="flex justify-end">
            <passwordForm.AppForm>
              <passwordForm.SubmitButton>Save changes</passwordForm.SubmitButton>
            </passwordForm.AppForm>
          </div>
        </form>
      </SettingsSection>

      <Separator />

      <SettingsSection
        title="Danger zone"
        description="Delete your account permanently. This action will remove all your data and cannot be undone."
      >
        <div className="flex flex-col gap-4 rounded-lg border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-sm text-muted-foreground">
              {deletionScheduled
                ? 'Deletion scheduled. This account closes in 30 days.'
                : 'Delete your account permanently. This action will remove all your data and cannot be undone.'}
            </p>
          </div>
          {deletionScheduled ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeletionScheduled(false);
                toast.success('Deletion cancelled');
              }}
            >
              Cancel deletion
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 data-icon="inline-start" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`This permanently deletes ${savedName}. This cannot be undone.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => {
                      setDeletionScheduled(true);
                      toast.success('Deletion scheduled');
                    }}
                  >
                    Delete account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </SettingsSection>
    </div>
  );
};

export default Profile;
