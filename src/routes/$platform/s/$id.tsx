import { MatchList } from "@/components/match/MatchList";
import { getIDOptions } from "@/queries/getID";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$platform/s/$id")({
  component: RouteComponent,
  loader: (ctx) =>
    ctx.context.queryClient.ensureQueryData(
      getIDOptions(ctx.params.id, ctx.params.platform)
    ),
});

function RouteComponent() {
  return (
    <div className={"w-full flex"}>
      <MatchList />
    </div>
  );
}
