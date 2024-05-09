import { useQuery } from "@tanstack/react-query";
import { useMasteryContext } from "../../contexts/MasteryContext";
import { getMasteriesOptions } from "../../queries/getMasteriesOptions";
import { Route } from "../../routes/mastery";
import { Mastery } from "./Mastery";
import { cn } from "../../lib/utils";

export function MasteryList() {
  const { mastery } = useMasteryContext();

  const { s } = Route.useSearch();
  const q_masteries = useQuery(getMasteriesOptions({ s }));

  const isFetching = q_masteries.isLoading || q_masteries.isPending;

  return (
    <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-12">
      {isFetching
        ? Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`fetching-mastery-${i}`}
              className={cn("flex flex-col gap-0.5")}
            >
              <div className="flex rounded-md flex-col md:flex-row gap-3">
                <div className="flex">
                  <div className="rounded-md w-full md:h-[120px] aspect-square animate-pulse bg-primary/20" />
                </div>
                <div className="flex flex-1 flex-col justify-between rounded-md bg-primary/10">
                  <div>
                    <h3 className="text-xl font-bold">
                      <span>
                        <span className="bg-yellow-300"></span>
                        <span></span>
                      </span>
                    </h3>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : mastery.mastery.map((mastery) => (
            <Mastery mastery={mastery} key={`mastery-${mastery.champion.id}`} />
          ))}
    </div>
  );
}
