import { Route } from "../../routes/mastery";

export function PendingComponent() {
  const search = Route.useSearch();

  return (
    <div>
      Loading
      <div>{JSON.stringify(search)}</div>
    </div>
  );
}
