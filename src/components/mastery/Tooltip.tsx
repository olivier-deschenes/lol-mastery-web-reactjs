// @flow
import { formatter } from "../../lib/utils";
import { SummonerChampionMasteryInfoType, SummonerType } from "../../types/api";
type Props = {
  summoner: SummonerType;
  mastery: SummonerChampionMasteryInfoType;
};
export function Tooltip({ mastery, summoner }: Props) {
  return (
    <span className="hidden group-hover:block absolute text-xs p-1.5 rounded-md text-nowrap font-bold text-white bg-black bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {summoner.gameName} :{formatter.format(mastery.championPoints)}
    </span>
  );
}
