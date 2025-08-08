import { MatchItem } from "@/components/match/match-item/MatchItem";
import { Button } from "@/components/ui/button";
import { useMatchList } from "@/queries/getMatches";
import { useParams, useLoaderData } from "@tanstack/react-router";

export const MatchList = () => {
  const params = useParams({ from: "/$platform/s/$id" });
  const id = useLoaderData({ from: "/$platform/s/$id" });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isPending,
  } = useMatchList(params.platform, params.id);

  if (isPending) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={"flex flex-col w-full"}>
      {data.pages.map((group, i) => (
        <ul
          key={i}
          className={
            "flex flex-col mx-auto divide-gray-800 divide-y-1 border-1 border-sidebar-border w-full rounded-md"
          }
        >
          {group.data.map((match) => {
            if (match.endOfGameResult != "GameComplete") {
              return <div>Fake game bro</div>;
            }

            return <MatchItem key={match.id} data={match} id={id} />;
          })}
        </ul>
      ))}
      <div className={"flex items-center justify-center p-5"}>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};
