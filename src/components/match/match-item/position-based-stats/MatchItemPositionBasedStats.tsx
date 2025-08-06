import { isIndividualPositionType } from "@/api/match/enums";
import { getPositionStats, StatDescriptions } from "@/api/match/position-stats";
import { getPositionName } from "@/api/match/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMatchContext } from "@/contexts/MatchContext";
import { formatNumberToString } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";

export const MatchItemPositionBasedStats = () => {
  const { participant, match } = useMatchContext();
  const position = participant.individualPosition;

  if (!isIndividualPositionType(position)) return null;

  const stats = getPositionStats(participant.puuid, match);

  return (
    <div className={"text-white flex flex-col gap-2"}>
      <div className={"flex gap-1.5 font-bold"}>
        {getPositionName(position)} Stats
      </div>
      <div>
        <ul className={"flex flex-col text-slate-300"}>
          {stats.map((s) => {
            const { description, label, iconName } = StatDescriptions[s.key];

            return (
              <li
                className={"flex gap-1.5 group items-center"}
                key={`MatchItemPositionBasedStats#${s.key}-${participant.puuid}`}
              >
                <DynamicIcon name={iconName} className={"w-4"} />
                <span className={"tabular-nums"}>
                  {formatNumberToString(s.value)}
                </span>
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon
                        className={
                          "w-3 invisible group-hover:visible text-yellow-200"
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <div className={"font-bold text-center"}>{label}</div>
                        <p>{description}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
