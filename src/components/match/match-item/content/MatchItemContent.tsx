import { calculateKDA } from "@/api/match/utils";
import { MatchItemItemList } from "@/components/match/match-item/item-list/MatchItemItemList";
import { MatchItemParticipantList } from "@/components/match/match-item/participant-list/MatchItemParticipantList";
import { MatchItemPositionBasedStats } from "@/components/match/match-item/position-based-stats/MatchItemPositionBasedStats";
import { MatchItemTags } from "@/components/match/match-item/tags/MatchItemTags";
import { useMatchContext } from "@/contexts/MatchContext";
import { cn, formatSeconds } from "@/lib/utils";
import { useLoaderData } from "@tanstack/react-router";

export const MatchItemContent = () => {
  const { participant, win, match } = useMatchContext();
  const { urls, getQueueName } = useLoaderData({ from: "__root__" });

  const borderColor = win ? "border-emerald-900/50" : "border-red-900/50";
  const childBorderColor = win
    ? "[&>img]:border-emerald-900/50"
    : "[&>img]:border-red-900/50";

  return (
    <div
      className={cn(
        "flex gap-2.5 w-full rounded-md bg-linear-to-r to-black p-5 m-2.5 mt-0 h-34",
        win ? "from-emerald-300/20" : "from-red-300/20"
      )}
    >
      <div className={"flex gap-5"}>
        <div className={"flex flex-col justify-between"}>
          <div className={"flex flex-col"}>
            <div
              className={cn(
                "text-white font-extrabold leading-none",
                win ? "text-emerald-400" : "text-red-400"
              )}
            >
              {getQueueName(match.data.queueId)}
            </div>
            <div className={"text-gray-400 text-sm"}>
              {formatSeconds(match.data.gameDuration)}
            </div>
          </div>
          <MatchItemTags />
        </div>
        <div className={"flex items-center gap-2.5"}>
          <div className={"flex items-center relative h-24 my-auto"}>
            <img
              src={urls.getChampionIconUrlFromParticipant(participant)}
              alt=""
              className={cn("rounded-lg w-24 border-2", borderColor)}
            />
            <div
              className={cn(
                "absolute bottom-0 right-0 w-8 text-white font-mono tabular-nums bg-black py-0.5 rounded-md border-2 text-center",
                borderColor
              )}
            >
              {participant.champLevel}
            </div>
          </div>
          <div
            className={cn(
              "gap-2 flex flex-col [&>img]:rounded-md [&>img]:w-11 [&>img]:border-2",
              childBorderColor
            )}
          >
            <img
              src={urls.getSummonerSpellIconUrl(participant.summoner1Id)}
              alt=""
            />
            <img
              src={urls.getSummonerSpellIconUrl(participant.summoner2Id)}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={"flex px-5 items-center flex-col justify-center"}>
        <div className={"flex text-slate-300 gap-2 font-bold tabular-nums"}>
          <span>{participant.kills}</span>
          <span className={"text-slate-600"}>/</span>
          <span>{participant.deaths}</span>
          <span className={"text-slate-600"}>/</span>
          <span>{participant.assists}</span>
        </div>
        <div className={"text-slate-500"}>{calculateKDA(participant)} KDA</div>
      </div>
      <div className={"flex px-5 items-center flex-col justify-center"}>
        <MatchItemItemList />
      </div>
      <div className={"flex px-5 flex-col justify-center"}>
        <MatchItemPositionBasedStats />
      </div>
      <div className={"flex ml-auto"}>
        <MatchItemParticipantList />
      </div>
    </div>
  );
};
