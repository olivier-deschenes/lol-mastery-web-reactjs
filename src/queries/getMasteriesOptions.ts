import { queryOptions } from "@tanstack/react-query";
import { MasteryResponseType, SummonerType } from "../types/api";
import { apiClient } from "../lib/utils";
import { SeachCacheType } from "@/types/localstorage";

export const SEARCH_CACHE_KEY = "search_cache";

const COLORS = [
  "#436bb2", // Medium blue
  "#0092D0", // Bright blue
  "#00B5CD", // Cyan
  "#00D4B0", // Aquamarine
  "#2A9D8F", // Teal
  "#8DEB88", // Light green
  "#9AE6B4", // Soft green
  "#F4E285", // Light yellow
  "#F9F871", // Bright yellow
  "#F4A261", // Sandy brown
  "#E76F51", // Burnt sienna
];

function saveToLocalStorage(summoners: SummonerType[]) {
  try {
    const cache = localStorage.getItem(SEARCH_CACHE_KEY);
    const searchCache: SeachCacheType = cache ? JSON.parse(cache) : [];

    searchCache.unshift(
      summoners.map((s) => ({
        puuid: s.puuid,
        gameName: s.gameName,
        tagLine: s.tagLine,
        profileIconUrl: s.profileIconUrl,
      }))
    );

    searchCache.splice(3);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (!s.length) {
        return [];
      }

      const masteries = await Promise.all(s.map((name) => fetchMastery(name)));

      saveToLocalStorage(masteries.map((m) => m.summoner));

      return masteries.map((m, i) => {
        console.log({
          name: m.summoner.gameName,
          hexColor: COLORS[i],
        });

        return {
          summoner: { ...m.summoner, hexColor: COLORS[i] },
          mastery: m.mastery,
        };
      });
    },
  });
