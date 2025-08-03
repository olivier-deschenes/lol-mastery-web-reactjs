import * as v from "valibot";
export const ChampionSchema = v.object({
  id: v.string(),
  name: v.string(),
  title: v.string(),
  blurb: v.string(),
  image: v.object({
    full: v.string(),
    sprite: v.string(),
  }),
});
export type ChampionType = v.InferOutput<typeof ChampionSchema>;

export const MetadataResponseSchema = v.object({
  LOL_LATEST_VESION: v.string(),
  LOL_CHAMPIONS: v.record(v.string(), ChampionSchema),
});
export type MasteryResponseType = v.InferOutput<typeof MetadataResponseSchema>;
