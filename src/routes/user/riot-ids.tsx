import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/riot-ids")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/user/riot-ids"!</div>;
}
