import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$platform/s/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/$platform/s/"!</div>;
}
