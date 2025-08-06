import {
  type IndividualPositionType,
  isIndividualPositionType,
} from "@/api/match/enums";
import { getPositionName } from "@/api/match/utils";
import { Badge } from "@/components/ui/badge";
import { useMatchContext } from "@/contexts/MatchContext";
import { cn } from "@/lib/utils";
import { type IconName, DynamicIcon } from "lucide-react/dynamic";

const PositionIcons: Record<IndividualPositionType, IconName> = {
  TOP: "mountain",
  JUNGLE: "tree-pine",
  MIDDLE: "square-slash",
  BOTTOM: "users",
  UTILITY: "life-buoy",
};

export const MatchItemTags = () => {
  const { participant, win } = useMatchContext();

  const position = participant.individualPosition;

  if (!isIndividualPositionType(position)) return null;

  const color = win ? "text-emerald-400" : "text-red-400";

  return (
    <>
      <div className={"h-0.5 bg-slate-300/10 w-[50%] rounded-full"} />
      <div className={"flex flex-col"}>
        <div className={cn("flex gap-0.5 text-sm items-center", color)}>
          <DynamicIcon name={PositionIcons[position]} className={"w-3"} />
          {getPositionName(position)}
        </div>
        <div>
          <Badge>Test</Badge>
        </div>
      </div>
    </>
  );
};
