import { MatchItem } from "@/components/match/MatchItem";
import { getIDOptions } from "@/queries/getID";
import { useMatchList } from "@/queries/getMatches";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$platform/s/$id")({
  component: RouteComponent,
  loader: (ctx) =>
    ctx.context.queryClient.ensureQueryData(
      getIDOptions(ctx.params.id, ctx.params.platform)
    ),
});

function RouteComponent() {
  const params = Route.useParams();
  const id = Route.useLoaderData();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useMatchList(params.platform, params.id);

  return (
    <div>
      Hello /region/s/$riotID!
      <div>{JSON.stringify(id, null, 2)}</div>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {data.pages.map((group, i) => (
            <ul key={i} className={"flex flex-col gap-5 bg-orange-300 p-5"}>
              {group.data.map((match) => (
                <MatchItem key={match.id} data={match} />
              ))}
            </ul>
          ))}
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetching}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </>
      )}
    </div>
  );
}
