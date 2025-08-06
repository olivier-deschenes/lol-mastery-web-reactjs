import { CachedMatchSchema } from "@/api/match/types";
import { apiClient } from "@/lib/utils";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import * as v from "valibot";

const CachedMatchesResponseSchema = v.object({
  data: v.array(CachedMatchSchema),
  next_cursor: v.nullable(v.number()),
});

export const fetchMatches = async (
  platform: string,
  riotID: string,
  cursor: number
) => {
  const data = await apiClient
    .get(`${platform}/${encodeURIComponent(riotID)}/matches`, {
      searchParams: {
        cursor: cursor,
      },
    })
    .json();

  return v.parse(CachedMatchesResponseSchema, data);
};

export const getMatchesOptions = (platform: string, riotID: string) =>
  infiniteQueryOptions({
    queryKey: ["matches"],
    queryFn: ({ pageParam }) => fetchMatches(platform, riotID, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next_cursor,
    retry: false,
    staleTime: 0,
  });

export const useMatchList = (platform: string, riotID: string) =>
  useInfiniteQuery(getMatchesOptions(platform, riotID));
