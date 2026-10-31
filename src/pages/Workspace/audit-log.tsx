const AuditLog = () => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">Audit log</h1>
      <p className="text-sm text-muted-foreground">
        A record of changes in this workspace.
      </p>
    </div>
  );
};

export default AuditLog;
