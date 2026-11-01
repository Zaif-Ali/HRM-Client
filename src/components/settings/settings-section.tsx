import type { ReactNode } from 'react';

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start md:gap-12">
      <div className="flex max-w-[28ch] flex-col gap-1">
        <h2 className="text-sm font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export { SettingsSection };
