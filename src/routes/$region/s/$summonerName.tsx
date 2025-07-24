import { createFileRoute } from "@tanstack/react-router";
import { apiClient } from "../../../lib/utils";

export const Route = createFileRoute("/$region/s/$summonerName")({
  component: RouteComponent,
  loader: (ctx) => {
    const { region, summonerName } = ctx.params;

    return apiClient
      .get(`summoner/${region}/${encodeURIComponent(summonerName)}`)
      .json();
  },
});

function RouteComponent() {
  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <div>{JSON.stringify(Route.useParams(), null, 2)}</div>
      <div>{JSON.stringify(Route.useLoaderData(), null, 2)}</div>
    </div>
  );
}
