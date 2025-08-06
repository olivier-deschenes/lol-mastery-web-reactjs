import { riotIDFromParticipant } from "@/api/match/utils";
import { useMatchContext } from "@/contexts/MatchContext";
import { timeago } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import { Dot } from "lucide-react";

export const MatchItemHeader = () => {
  const { platform } = useParams({ from: "/$platform/s/$id" });
  const { participant, match } = useMatchContext();

  return (
    <div className={"flex w-full h-16 justify-between px-2.5"}>
      <div className={"flex items-center w-full"}>
        <div className={"flex gap-2.5"}>
          <div className={"text-white font-extrabold flex"}>
            {participant.riotIdGameName}
          </div>
          <div className={"text-slate-500 font-extrabold flex"}>
            <Link
              to={"/$platform/s/$id"}
              params={{
                id: riotIDFromParticipant(participant),
                platform: platform,
              }}
            >
              {`@${participant.riotIdGameName}`}
              <span>#</span>
              <span>{`${participant.riotIdTagline}`}</span>
            </Link>
          </div>
        </div>
        <div className={"flex text-white"}>
          <Dot />
          {timeago(match.played_at)}
        </div>
      </div>
    </div>
  );
};
