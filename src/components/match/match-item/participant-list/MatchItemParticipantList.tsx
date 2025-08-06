import { MatchItemParticipantListItem } from "@/components/match/match-item/participant-list/MatchItemParticipantListItem";

export const MatchItemParticipantList = () => {
  return (
    <div className={"flex gap-1 items-center"}>
      <MatchItemParticipantListItem teamId={100} />
      <MatchItemParticipantListItem teamId={200} />
    </div>
  );
};
