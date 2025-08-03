import { IDType } from "../../api/mastery/types";
import { formatter } from "../../lib/utils";
import { MultiMasteryInfoType } from "../../types/api";
type Props = {
  summoner: IDType;
  mastery: MultiMasteryInfoType["data"][0];
};
export function Tooltip({ mastery, summoner }: Props) {
  return (
    <span className="hidden group-hover:block absolute text-xs p-1.5 rounded-md text-nowrap font-bold text-white bg-black bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span>{summoner.game_name}</span>
      <span className="font-mono italic">#{summoner.tag_line}</span> :{" "}
      {formatter.format(mastery.points)}
    </span>
  );
}
