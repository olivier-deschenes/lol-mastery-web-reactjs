import * as v from "valibot";
import {
  MasteryResponseSchema,
  MasteryType,
  IDType,
} from "../api/mastery/types";

export type MasteryResponseType = v.InferOutput<typeof MasteryResponseSchema>;

export type MultiMasteryInfoType = {
  data: Array<Omit<MasteryType, "champion">>;
  totalChampionPoints: number;
  champion: MasteryType["champion"];
};

export type MultiSummonerMasteryType = {
  summoners: Array<IDType>;
  mastery: Array<MultiMasteryInfoType>;
};
