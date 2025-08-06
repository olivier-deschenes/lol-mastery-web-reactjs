import type { ParticipantType } from "@/api/match/types";
import { useMatchContext } from "@/contexts/MatchContext";
import { cn } from "@/lib/utils";
import { useLoaderData } from "@tanstack/react-router";

type Props = {
  itemId: ParticipantType["item0"];
};

export const MatchItemItemListItem = ({ itemId }: Props) => {
  const { urls } = useLoaderData({ from: "__root__" });
  const { win } = useMatchContext();

  return (
    <li
      className={cn(
        "w-9 aspect-square rounded-sm bg-center bg-no-repeat bg-cover",
        win ? "bg-emerald-900/10" : "bg-red-900/10"
      )}
      style={{
        backgroundImage: `url(${urls.getItemIconUrl(itemId)})`,
      }}
    />
  );
};
