import { array, string, Output, object } from "valibot";

export const SearchCacheSummonerSchema = object({
  puuid: string(),
  gameName: string(),
  tagLine: string(),
  profileIconUrl: string(),
});
export type SearchCacheSummonerType = Output<typeof SearchCacheSummonerSchema>;


export const SearchCacheSchema = array(array(SearchCacheSummonerSchema));
export type SeachCacheType = Output<typeof SearchCacheSchema>;
