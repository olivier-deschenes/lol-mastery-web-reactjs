import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$region/s/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello</div>;
}
