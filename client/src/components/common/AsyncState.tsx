export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="async-state" role="status">
      <span className="spinner" aria-hidden="true" />
      {label}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="async-state error" role="alert">
      <strong>Couldn’t load this section.</strong>
      <span>{message}</span>
      <small>Is the API running and the database seeded? (npm run seed)</small>
    </div>
  );
}
