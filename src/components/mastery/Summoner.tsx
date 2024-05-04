import { SummonerType } from "../../types/api";
import { cn } from "../../lib/utils";
import { useMasteryContext } from "../../contexts/MasteryContext";
import { Route } from "../../routes/mastery";
type Props = {
  summoner: SummonerType;
};
export function Summoner({ summoner }: Props) {
  const { fs } = Route.useSearch();
  const navigate = Route.useNavigate();

  const {
    mastery: { summoners },
    getSummonerIndexFromPuuid,
    summonerPuuidsToIndexes,
  } = useMasteryContext();

  const summonerIndex = getSummonerIndexFromPuuid(summoner.puuid);
  const selected = fs.includes(summonerIndex);

  const handleToggleSummoner = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const fctKey = e.metaKey || e.ctrlKey;
    const shiftKey = e.shiftKey;

    let selectedPuuids: Array<number> = [];

    // If the user is holding the shift key, we want to select all the summoners between the first and the last selected
    if (shiftKey) {
      const endIndex = summoners.findIndex((s) => s.puuid === summoner.puuid);
      const startIndex = Math.min(...fs);

      if (startIndex === -1 || endIndex === -1) return;

      const newSelected = summoners.slice(
        Math.min(startIndex, endIndex),
        Math.max(startIndex, endIndex) + 1
      );

      selectedPuuids = summonerPuuidsToIndexes(newSelected.map((s) => s.puuid));

      return;
      // If the user is holding the ctrl key, we want to toggle the selection of the summoner
    } else if (fctKey) {
      if (selected) {
        selectedPuuids = fs.filter((s) => s !== summonerIndex);
      } else {
        selectedPuuids = [...fs, summonerIndex];
      }
    } else if (selected && fs.length === 1 && fs[0] === summonerIndex) {
      selectedPuuids = summonerPuuidsToIndexes(summoners.map((s) => s.puuid));
    } else {
      selectedPuuids = [summonerIndex];
    }

    navigate({
      search: (prev) => ({
        ...prev,
        fs: selectedPuuids,
      }),
    });
  };

  return (
    <div
      onClick={handleToggleSummoner}
      className={cn(
        "flex bg-gray-100 rounded-r-md justify-center items-center w-auto hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out",
        {
          "opacity-50": !fs.includes(getSummonerIndexFromPuuid(summoner.puuid)),
        }
      )}
    >
      <img src={summoner.profileIconUrl} className="w-8 rounded-l-md" />
      <div className="px-3">
        <span>{summoner.gameName}</span>
        <span className="text-slate-600">#{summoner.tagLine}</span>
      </div>
      <div>
        <div
          className="w-4 h-8 rounded-r-md"
          style={{ backgroundColor: summoner.hexColor }}
        />
      </div>
    </div>
  );
}
