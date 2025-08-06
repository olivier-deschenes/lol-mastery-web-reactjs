import type { ParticipantType } from "@/api/match/types";
import { riotIDFromParticipant } from "@/api/match/utils";
import { useMatchContext } from "@/contexts/MatchContext";
import { cn } from "@/lib/utils";
import { Link, useLoaderData, useParams } from "@tanstack/react-router";

type Props = {
  teamId: ParticipantType["teamId"];
};

export const MatchItemParticipantListItem = ({ teamId }: Props) => {
  const { match, participant } = useMatchContext();

  const { urls } = useLoaderData({ from: "__root__" });
  const { platform } = useParams({ from: "/$platform/s/$id" });
  const teamParticipants = match.data.participants.filter(
    (p) => p.teamId === teamId
  );

  return (
    <div className={"flex flex-col"}>
      <ul className={"flex flex-col"}>
        {teamParticipants.map((p, i) => (
          <li
            key={`MatchItemParticipantList#${i}-${p.puuid}`}
            className={"group"}
          >
            <Link
              to={"/$platform/s/$id"}
              params={{ id: riotIDFromParticipant(p), platform: platform }}
              className={"flex gap-1 items-center"}
            >
              <img
                src={urls.getChampionIconUrlFromParticipant(p)}
                alt=""
                className={"w-6"}
              />
              <span
                className={cn(
                  p.puuid === participant.puuid
                    ? "text-yellow-600"
                    : "text-white",
                  "group text-sm"
                )}
              >
                {p.riotIdGameName}
                <span
                  className={"invisible group-hover:visible text-slate-500"}
                >
                  #{p.riotIdTagline}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
