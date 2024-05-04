import { queryOptions } from "@tanstack/react-query";
import { MasteryResponseType, SummonerType } from "../types/api";
import { apiClient } from "../lib/utils";
import { SeachCacheType } from "@/types/localstorage";

export const SEARCH_CACHE_KEY = "search_cache";

function saveToLocalStorage(summoners: SummonerType[]) {
  try {
    const cache = localStorage.getItem(SEARCH_CACHE_KEY);
    const searchCache: SeachCacheType = cache ? JSON.parse(cache) : [];

    searchCache.push(
      summoners.map((s) => ({
        puuid: s.puuid,
        gameName: s.gameName,
        tagLine: s.tagLine,
        profileIconUrl: s.profileIconUrl,
      }))
    );

    localStorage.setItem(SEARCH_CACHE_KEY, JSON.stringify(searchCache));
  } catch (error) {
    console.error("An error occurred while saving to the local storage.");
    localStorage.removeItem(SEARCH_CACHE_KEY);
  }
}

const fetchMastery = async (name: string) => {
  const response = await apiClient.get(
    `mastery?summonerName=${encodeURIComponent(name)}`
  );

  const responseData = (await response.json()) as MasteryResponseType;

  return responseData;
};

export const getMasteriesOptions = ({ s }: { s: Array<string> }) =>
  queryOptions({
    queryKey: ["masteries", s],
    queryFn: async () => {
      if (!s.length) {
        return [];
      }

      const masteries = await Promise.all(s.map((name) => fetchMastery(name)));

      saveToLocalStorage(masteries.map((m) => m.summoner));

      return masteries;
    },
  });
