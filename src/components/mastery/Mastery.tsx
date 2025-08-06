import type { MultiMasteryInfoType } from "@/api/mastery/types";
import { Tooltip } from "@/components/mastery/Tooltip";
import { useMasteryContext } from "@/contexts/MasteryContext";
import { cn, formatter } from "@/lib/utils";
import { useSearch, useNavigate, useLoaderData } from "@tanstack/react-router";

type Props = {
  mastery: MultiMasteryInfoType;
};

export function Mastery({ mastery }: Props) {
  const { c, hs } = useSearch({ from: "/mastery/" });
  const navigate = useNavigate({ from: "/mastery" });
  const { urls } = useLoaderData({ from: "__root__" });

  const { getSummonerFromPuuid, getSummonerIndexFromPuuid } =
    useMasteryContext();

  const isVisible = mastery.champion.name
    .toUpperCase()
    .startsWith(c.toUpperCase());

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 cursor-pointer hover:bg-gray-100 rounded-md",
        {
          hidden: !isVisible,
        }
      )}
    >
      <div className="flex rounded-md flex-col md:flex-row gap-3">
        <div className="flex">
          <img
            src={urls.getChampionIconUrl(mastery.champion.image.full)}
            className="rounded-md w-full md:h-[120px] aspect-square"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold">
              <span>
                <span className="bg-yellow-300">
                  {mastery.champion.name.slice(0, c.length)}
                </span>
                <span>{mastery.champion.name.slice(c.length)}</span>
              </span>
            </h3>
            <div>{formatter.format(mastery.totalChampionPoints)}</div>
          </div>
          <div className="bg-gray-100 rounded-md h-6 flex">
            {mastery.data.map((m) => {
              const summoner = getSummonerFromPuuid(m.puuid);
              const index = getSummonerIndexFromPuuid(m.puuid);

              return (
                <div
                  key={`mastery-${m.puuid}`}
                  style={{
                    width: `${(m.points / mastery.totalChampionPoints) * 100}%`,
                    backgroundColor: `${summoner.metadata.hexColor}`,
                    opacity: hs === null || hs === index ? 1 : 0.3,
                  }}
                  className="first:rounded-l-md last:rounded-r-md relative group"
                  onClick={() => {
                    navigate({
                      search: (prev) => ({
                        ...prev,
                        hs: hs === index ? null : index,
                      }),
                    });
                  }}
                >
                  <Tooltip
                    mastery={m}
                    summoner={getSummonerFromPuuid(m.puuid)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
