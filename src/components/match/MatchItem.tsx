import type { MatchType } from "@/api/match/types";
import { cn } from "@/lib/utils";
import { useLoaderData } from "@tanstack/react-router";

type Props = {
  data: MatchType;
};

const cssVariables = (win: boolean) => {
  const winName = win ? "win" : "lose";
  return {
    "--color-match-300": `var(--color-${winName}-300)`,
    "--color-match-900": `var(--color-${winName}-900)`,
    "--color-match": `var(--color-${winName})`,
  } as React.CSSProperties;
};

export const MatchItem = ({ data }: Props) => {
  const id = useLoaderData({ from: "/$platform/s/$id" });
  const { urls, LOL_CHAMPIONS } = useLoaderData({ from: "__root__" });
  const puuid = id.puuid;

  const participant = data.data.participants.find((p) => p.puuid === puuid)!;
  const team = participant.teamId;
  const win = data.data.teams.find((t) => t.teamId === team)!.win;

  return (
    <div style={cssVariables(win)} className={cn("h-24 flex")}>
      <div
        style={{
          writingMode: "sideways-lr",
        }}
        className={
          "bg-match-300 h-full text-center align-middle rounded-l-md flex justify-center font-bold text-match"
        }
      >
        {win ? "win" : "lose"}
      </div>
      <div
        className={
          "bg-match flex w-full items-center p-2.5 rounded-md rounded-l-none gap-5"
        }
      >
        <div>
          <img
            src={urls.getChampionFullImage(
              LOL_CHAMPIONS[participant.championId].image.full
            )}
            alt=""
            className={"w-20"}
          />
        </div>
        <div>
          <div className={"text-xl font-bold font-mono"}>
            <span>{participant.kills}</span>/<span>{participant.assists}</span>/
            <span>{participant.deaths}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
