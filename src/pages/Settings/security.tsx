import { useState } from 'react';
import { toast } from 'sonner';
import { SettingsSection } from '@/components/settings/settings-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Passkey = {
  id: string;
  name: string;
  added: string;
};

type Session = {
  id: string;
  device: string;
  detail: string;
  current?: boolean;
};

const STARTING_SESSIONS: Session[] = [
  {
    id: 'this-device',
    device: 'Mac · Chrome',
    detail: 'This device · Active now',
    current: true,
  },
  {
    id: 'iphone',
    device: 'iPhone · Safari',
    detail: 'Last active 2 days ago',
  },
];

const Security = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const [passkeys, setPasskeys] = useState<Passkey[]>([]);
  const [sessions, setSessions] = useState(STARTING_SESSIONS);

  return (
    <div className="flex w-full max-w-3xl flex-col mx-auto">
      <h1 className="sr-only">Security</h1>
      <SettingsSection
        title="Two-factor authentication"
        description="Ask for a second step when signing in."
      >
        <div className="flex flex-col gap-4 rounded-lg border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Authenticator app</p>
            <p className="text-sm text-muted-foreground">
              {twoFactor
                ? 'A code from an authenticator app is required at sign-in.'
                : 'Off. Sign-in uses the password only.'}
            </p>
          </div>
          <Button
            type="button"
            variant={twoFactor ? 'outline' : 'default'}
            onClick={() => {
              setTwoFactor((on) => !on);
              toast.success(twoFactor ? 'Two-factor turned off' : 'Two-factor turned on');
            }}
          >
            {twoFactor ? 'Turn off' : 'Turn on'}
          </Button>
        </div>
      </SettingsSection>

      <Separator />

      <SettingsSection
        title="Passkeys"
        description="Sign in with this device, without a password."
      >
        <div className="flex flex-col gap-4">
          {passkeys.length === 0 ? (
            <p className="text-sm text-muted-foreground">No passkeys yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {passkeys.map((passkey) => (
                <li
                  key={passkey.id}
                  className="flex flex-col gap-3 rounded-lg border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{passkey.name}</p>
                    <p className="text-sm text-muted-foreground">{passkey.added}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPasskeys((list) =>
                        list.filter((item) => item.id !== passkey.id)
                      );
                      toast.success('Passkey removed');
                    }}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => {
                setPasskeys((list) => [
                  {
                    id: crypto.randomUUID(),
                    name: 'This device',
                    added: 'Added just now',
                  },
                  ...list,
                ]);
                toast.success('Passkey added');
              }}
            >
              Add passkey
            </Button>
          </div>
        </div>
      </SettingsSection>

      <Separator />

      <SettingsSection
        title="Sessions"
        description="Devices signed in to this account."
      >
        <ul className="flex flex-col gap-3">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex flex-col gap-3 rounded-lg border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{session.device}</p>
                  {session.current ? <Badge variant="secondary">Current</Badge> : null}
                </div>
                <p className="text-sm text-muted-foreground">{session.detail}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={session.current}
                onClick={() => {
                  setSessions((list) =>
                    list.filter((item) => item.id !== session.id)
                  );
                  toast.success('Session revoked');
                }}
              >
                {session.current ? 'This device' : 'Revoke'}
              </Button>
            </li>
          ))}
        </ul>
      </SettingsSection>
    </div>
  );
};

export default Security;
