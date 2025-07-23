import * as v from "valibot";
import {
  ChampionSchema,
  MasteryResponseSchema,
  MasteryType,
  SummonerType,
} from "../api/mastery/types";

export type MasteryResponseType = v.InferOutput<typeof MasteryResponseSchema>;
export type SummonerResponseType = MasteryResponseType["summoner"];

export type MultiMasteryInfoType = {
  data: Array<Omit<MasteryType, "champion">>;
  totalChampionPoints: number;
  champion: v.InferOutput<typeof ChampionSchema>;
};

export type MultiSummonerMasteryType = {
  summoners: Array<SummonerType>;
  mastery: Array<MultiMasteryInfoType>;
  // champion: v.InferOutput<typeof ChampionSchema>;
};
