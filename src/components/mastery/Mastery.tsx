import { MultiMasteryInfoType } from "../../types/api";
import { cn, formatter } from "../../lib/utils";
import { useMasteryContext } from "../../contexts/MasteryContext";
import { Tooltip } from "./Tooltip";
import { Route } from "../../routes/mastery";
type Props = {
  mastery: MultiMasteryInfoType;
};

export function Mastery({ mastery }: Props) {
  const { c } = Route.useSearch();

  const { getSummonerFromPuuid } = useMasteryContext();

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
            src={mastery.champion.image}
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
            {mastery.data.map((m) => (
              <div
                key={`mastery-${m.puuid}`}
                style={{
                  width: `${
                    (m.championPoints / mastery.totalChampionPoints) * 100
                  }%`,
                  /* backgroundColor: `${getSummonerFromPuuid(m.puuid).hexColor}`, */
                }}
                className="first:rounded-l-md last:rounded-r-md relative group"
              >
                <Tooltip mastery={m} summoner={getSummonerFromPuuid(m.puuid)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
