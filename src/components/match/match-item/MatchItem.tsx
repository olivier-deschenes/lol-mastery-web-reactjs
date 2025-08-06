import type { IDType } from "@/api/id/types";
import type { GoodCachedInfoSchema } from "@/api/match/types";
import { MatchItemFooter } from "@/components/match/footer/MatchItemFooter";
import { MatchItemContent } from "@/components/match/match-item/content/MatchItemContent";
import { MatchItemHeader } from "@/components/match/match-item/header/MatchItemHeader";
import { MastchProvider } from "@/contexts/MatchContext";
import { useLoaderData } from "@tanstack/react-router";

type Props = {
  data: GoodCachedInfoSchema;
  id: IDType;
};

export const MatchItem = ({ data, id }: Props) => {
  const { urls } = useLoaderData({ from: "__root__" });

  const participant = data.data.participants.find((p) => p.puuid === id.puuid)!;
  const team = participant.teamId;

  if (!data.data.teams.find((t) => t.teamId === team))
    console.log(data.id, { data, id });

  const win = data.data.teams.find((t) => t.teamId === team)!.win;
  const matchColor = win ? "emerald" : "red";

  return (
    <MastchProvider match={data} puuid={id.puuid}>
      <li
        className={`relative flex items-start p-5`}
        style={
          {
            "--color-match-300": `var(--color-${matchColor}-300)`,
            "--color-match-900": `var(--color-${matchColor}-900)`,
            "--color-match": `var(--color-${matchColor})`,
          } as React.CSSProperties
        }
      >
        <div className={"flex"}>
          <div className={"flex"}>
            <img
              src={urls.getProfileIconUrl(id.profile_icon_id)}
              alt=""
              className="rounded-full w-16 border-slate-500 border-2"
            />
          </div>
        </div>
        <div className={"flex flex-col w-full"}>
          <MatchItemHeader />
          <MatchItemContent />
          <MatchItemFooter />
        </div>
      </li>
    </MastchProvider>
  );
};
