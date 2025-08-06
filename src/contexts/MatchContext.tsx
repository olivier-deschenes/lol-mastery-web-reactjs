import type { GoodCachedInfoSchema, ParticipantType } from "@/api/match/types";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

type MatchContextType = {
  match: GoodCachedInfoSchema;
  puuid: ParticipantType["puuid"];
  participant: ParticipantType;
  win: boolean;
};

const context = createContext<MatchContextType>({} as MatchContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useMatchContext = () => {
  const _context = useContext(context);

  if (!_context) {
    throw new Error("useMatchContext must be used within a MasteryProvider");
  }

  return _context;
};

type Props = {
  match: GoodCachedInfoSchema;
  puuid: ParticipantType["puuid"];
};

export const MastchProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  match,
  puuid,
}) => {
  const participant = match.data.participants.find((p) => p.puuid === puuid)!;
  const win = match.data.teams.find(
    (t) => t.teamId === participant.teamId
  )!.win;

  const value = useMemo(() => {
    return {
      match,
      puuid,
      participant,
      win,
    };
  }, [match, participant, puuid, win]);

  return <context.Provider value={value}>{children}</context.Provider>;
};
