import * as v from "valibot";

const apiDateSchema = v.pipe(
  v.string(),
  v.transform((input) => new Date(input))
);

export const IDSchema = v.pipe(
  v.object({
    puuid: v.string(),
    profile_icon_id: v.number(),
    revision_date: apiDateSchema,
    summoner_level: v.number(),
    riot_id: v.string(),
    game_name: v.string(),
    tag_line: v.string(),
    created_at: apiDateSchema,
  }),
  v.transform((data) => ({
    ...data,
    metadata: {
      hexColor: "black",
    },
  }))
);
export type IDType = v.InferOutput<typeof IDSchema>;

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
  id: IDSchema,
});
