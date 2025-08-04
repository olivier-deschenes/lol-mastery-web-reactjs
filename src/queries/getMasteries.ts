import {
  queryOptions,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { getMasteryBySummonerName } from "../api/mastery";

export const SEARCH_CACHE_KEY = "search_cache";

const COLORS = [
  "#F94144", // Red
  "#F3722C", // Orange
  "#F9C74F", // Yellow
  "#90BE6D", // Light green
  "#43AA8B", // Teal
  "#577590", // Blue
  "#9B5DE5", // Purple
];

export const getMasteryOptions = (s: string, i: number) =>
  queryOptions({
    queryKey: ["mastery", s],
    retry: false,
    refetchInterval: false,
    queryFn: async () => {
      const m = await getMasteryBySummonerName("na1", s);

      return {
        ...m,
        id: {
          ...m.id,
          metadata: {
            ...m.id.metadata,
            hexColor: COLORS[i],
          },
        },
      };
    },
  });

export const useMasteries = (names: string[]) =>
  useQueries({
    queries: names.map((s, i) => getMasteryOptions(s, i)),
  });

export const useRefreshMastery = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ s, hexColor }: { s: string; hexColor: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = await getMasteryBySummonerName("na1", s, true);

      data.id.metadata.hexColor = hexColor;

      qc.setQueryData(["mastery", s], data);
    },
  });
};
