import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { IDType } from "../api/mastery/types";
import { MultiSummonerMasteryType } from "../types/api";

type MasteryContextType = {
  mastery: MultiSummonerMasteryType;

  getSummonerFromPuuid: (puuid: IDType["puuid"]) => IDType;
  getSummonerFromIndex: (index: number) => IDType;
  getSummonerIndexFromPuuid: (puuid: IDType["puuid"]) => number;

  summonerIndexesToPuuids: (indexes: number[]) => IDType["puuid"][];
  summonerPuuidsToIndexes: (puuids: IDType["puuid"][]) => number[];
};

const context = createContext<MasteryContextType>({} as MasteryContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useMasteryContext = () => {
  const _context = useContext(context);

  if (!_context) {
    throw new Error("useMasteries must be used within a MasteryProvider");
  }

  return _context;
};

type Props = {
  mastery: MultiSummonerMasteryType;
};

export const MasteryProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  mastery,
}) => {
  const value = useMemo<MasteryContextType>(() => {
    return {
      mastery,
      getSummonerFromPuuid: (puuid: IDType["puuid"]) => {
        return mastery.summoners.find((s) => s.puuid === puuid)!;
      },
      getSummonerFromIndex: (index: number) => {
        return mastery.summoners[index];
      },
      getSummonerIndexFromPuuid: (puuid: IDType["puuid"]) => {
        return mastery.summoners.findIndex((s) => s.puuid === puuid);
      },
      summonerIndexesToPuuids: (indexes: number[]) => {
        return indexes.map((index) => mastery.summoners[index].puuid);
      },
      summonerPuuidsToIndexes: (puuids: IDType["puuid"][]) => {
        return puuids.map((puuid) =>
          mastery.summoners.findIndex((s) => s.puuid === puuid)
        );
      },
    };
  }, [mastery]);

  return <context.Provider value={value}>{children}</context.Provider>;
};
