import { useMasteryContext } from "../../contexts/MasteryContext";
import { useMasteries } from "../../queries/getMasteries";
import { Route } from "../../routes/mastery";
import { Summoner } from "./Summoner";

export function SummonersList() {
  const { mastery } = useMasteryContext();

  const { s } = Route.useSearch();
  const q_masteries = useMasteries(s);

  const isFetching = q_masteries.some((q) => q.isLoading || q.isPending);

  return (
    <div className="flex items-start md:items-center md:gap-5 flex-col md:flex-row flex-wrap select-none">
      {isFetching
        ? Array.from({ length: s.length }).map((_, i) => (
            <div key={`fetching-summoner-${i}`}>
              <div className="animate-pulse bg-gray-300 rounded-md h-8 w-[10rem]"></div>
            </div>
          ))
        : mastery.summoners.map((summoner) => (
            <Summoner key={`summoner-${summoner.puuid}`} summoner={summoner} />
          ))}
    </div>
  );
}
