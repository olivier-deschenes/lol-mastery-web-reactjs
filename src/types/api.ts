export type SummonerChampionMasteryInfoType = {
  puuid: string;
  championLevel: number;
  championPoints: number;
  lastPlayTime: string;
};

export type BasicChampionMasteryType = {
  champion: {
    id: string;
    key: string;
    name: string;
    title: string;
    image: string;
  };
};

export type SummonerType = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  profileIconUrl: string;
  revisionDate: number;
  summonerLevel: number;
  gameName: string;
  tagLine: string;
};

export type MasteryResponseType = {
  mastery: Array<ChampionMasteryType>;
  summoner: SummonerType;
};

export type ChampionMasteryType = SummonerChampionMasteryInfoType &
  BasicChampionMasteryType;

export type MultiMasteryInfoType = {
  data: Array<SummonerChampionMasteryInfoType>;
  totalChampionPoints: number;
} & BasicChampionMasteryType;

export type MultiSummonerMasteryType = {
  summoners: Array<SummonerType>;
  mastery: Array<MultiMasteryInfoType>;
};
