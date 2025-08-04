import { apiDateSchema } from "@/api/common";
import { IDSchema } from "@/api/id/types";
import * as v from "valibot";

export const MasterIDSchema = v.pipe(
  IDSchema,
  v.transform((data) => ({
    ...data,
    metadata: {
      hexColor: "black",
    },
  }))
);
export type MasteryIDType = v.InferOutput<typeof MasterIDSchema>;

export const MasterySchema = v.object({
  puuid: v.string(),
  lastPlayTime: apiDateSchema,
  level: v.number(),
  points: v.number(),

  champion: v.object({
    id: v.number(),
    name: v.string(),
    image: v.object({
      full: v.string(),
      sprite: v.string(),
    }),
  }),
});
export type MasteryType = v.InferOutput<typeof MasterySchema>;
export const MasteryResponseSchema = v.object({
  mastery: v.object({
    puuid: v.string(),
    data: v.array(MasterySchema),
    created_at: apiDateSchema,
  }),
  id: MasterIDSchema,
});

export type MasteryResponseType = v.InferOutput<typeof MasteryResponseSchema>;

export type MultiMasteryInfoType = {
  data: Array<Omit<MasteryType, "champion">>;
  totalChampionPoints: number;
  champion: MasteryType["champion"];
};

export type MultiSummonerMasteryType = {
  summoners: Array<MasteryIDType>;
  mastery: Array<MultiMasteryInfoType>;
};
