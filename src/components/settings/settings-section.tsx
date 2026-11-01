import type { ReactNode } from 'react';

function SettingsSection({
  title,
  description,
  children,
}: Readonly<{
  title: string;
  description: string;
  children: ReactNode;
}>) {
  return (
    <section className="flex flex-col gap-6 py-8">
      <div className="flex max-w-[65ch] flex-col gap-1">
        <h2 className="text-sm font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export { SettingsSection };
