import { MatchItemItemListItem } from "@/components/match/match-item/item-list/MatchItemItemListItem";
import { useMatchContext } from "@/contexts/MatchContext";

const itemKeys = [
  "item0",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  //"item6",
] as const;

export const MatchItemItemList = () => {
  const { match, participant } = useMatchContext();

  return (
    <ul className={"grid grid-cols-3 grid-rows-2 gap-2.5"}>
      {itemKeys.map((key) => (
        <MatchItemItemListItem
          key={`${match.id}-MatchItemItemList-${participant.puuid}-${key}`}
          itemId={participant[key]}
        />
      ))}
    </ul>
  );
};
