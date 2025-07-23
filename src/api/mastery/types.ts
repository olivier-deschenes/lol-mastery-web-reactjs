import {
  array,
  number,
  object,
  pipe,
  string,
  transform,
  union,
  InferOutput,
  fallback,
} from "valibot";

export const SummonerMetadata = object({
  refreshed_at: pipe(
    union([string(), number()]),
    transform((input) => new Date(input))
  ),
  hexColor: fallback(string(), "black"),
});
export type SummonerMetadataType = InferOutput<typeof SummonerMetadata>;

export const ChampionSchema = object({
  id: string(),
  key: string(),
  name: string(),
  title: string(),
  image: string(),
});
export type ChampionType = InferOutput<typeof ChampionSchema>;

export const SummonerSchema = object({
  puuid: string(),
  profileIconId: number(),
  profileIconUrl: string(),
  revisionDate: number(),
  summonerLevel: number(),
  gameName: string(),
  tagLine: string(),
  metadata: SummonerMetadata,
});
export type SummonerType = InferOutput<typeof SummonerSchema>;

export const MasterySchema = object({
  champion: ChampionSchema,
  puuid: string(),
  championLevel: number(),
  championPoints: number(),
  lastPlayTime: pipe(
    union([string(), number()]),
    transform((input) => new Date(input))
  ),
});
export type MasteryType = InferOutput<typeof MasterySchema>;
export const MasteryResponseSchema = object({
  mastery: array(MasterySchema),
  summoner: SummonerSchema,
});
