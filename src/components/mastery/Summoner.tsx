import type { MasteryIDType } from "@/api/mastery/types";
import { useMasteryContext } from "@/contexts/MasteryContext";
import { cn } from "@/lib/utils";
import { useRefreshMastery } from "@/queries/getMasteries";
import { useLoaderData, useNavigate, useSearch } from "@tanstack/react-router";
import { RefreshCcwIcon } from "lucide-react";

const timeAgo = (input: Date | number | string) => {
  const date = new Date(input).getTime();
  const now = Date.now();
  const diff = date - now;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units = [
    { ms: 1000 * 60 * 60 * 24 * 365, name: "year" },
    { ms: 1000 * 60 * 60 * 24 * 30, name: "month" },
    { ms: 1000 * 60 * 60 * 24 * 7, name: "week" },
    { ms: 1000 * 60 * 60 * 24, name: "day" },
    { ms: 1000 * 60 * 60, name: "hour" },
    { ms: 1000 * 60, name: "minute" },
    { ms: 1000, name: "second" },
  ];
  for (const u of units) {
    if (Math.abs(diff) >= u.ms || u.name === "second")
      return rtf.format(
        Math.round(diff / u.ms),
        u.name as Intl.RelativeTimeFormatUnit
      );
  }
};

type Props = {
  summoner: MasteryIDType;
};

export function Summoner({ summoner }: Props) {
  const { fs } = useSearch({ from: "/mastery/" });
  const navigate = useNavigate({ from: "/mastery" });

  const { urls } = useLoaderData({ from: "__root__" });

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

  const m_mastery = useRefreshMastery();

  const handleRefresh = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    m_mastery.mutate({
      s: `${summoner.game_name}#${summoner.tag_line}`,
      hexColor: summoner.metadata.hexColor,
    });
  };

  return (
    <div
      className={cn(
        "flex bg-gray-100 border-r-[1rem] rounded-r-md justify-center items-center w-auto transition-all duration-200 ease-in-out",
        {
          "opacity-50": !fs.includes(getSummonerIndexFromPuuid(summoner.puuid)),
        }
      )}
      style={{ borderColor: summoner.metadata.hexColor }}
    >
      <img
        src={urls.getProfileIconUrl(summoner.profile_icon_id)}
        className="w-12 rounded-l-md cursor-pointer hover:opacity-80"
        onClick={handleToggleSummoner}
      />
      <div className={"px-3 "}>
        <div className="font-semibold">
          <span>{summoner.game_name}</span>
          <span className="text-slate-600">#{summoner.tag_line}</span>
        </div>
        <button
          className={
            "bg-slate-300 px-1 flex justify-center items-center rounded hover:bg-slate-200 transition-all"
          }
          onClick={handleRefresh}
        >
          <span className={"font-mono px-1.5 text-xs"}>
            {m_mastery.isPending ? "refreshing" : timeAgo(summoner.created_at)}
          </span>
          <RefreshCcwIcon
            size={10}
            className={cn(m_mastery.isPending && "animate-spin")}
          />
        </button>
      </div>
    </div>
  );
}
