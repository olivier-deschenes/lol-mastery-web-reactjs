import { apiDateSchema } from "@/api/common";
import * as v from "valibot";

export const IDSchema = v.object({
  puuid: v.string(),
  profile_icon_id: v.number(),
  revision_date: apiDateSchema,
  summoner_level: v.number(),
  riot_id: v.string(),
  game_name: v.string(),
  tag_line: v.string(),
  created_at: apiDateSchema,
});
export type IDType = v.InferOutput<typeof IDSchema>;
