import { getID } from "@/api/id";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getIDOptions = (s: string, platform: string) =>
  queryOptions({
    queryKey: ["id", s],
    retry: false,
    refetchInterval: false,
    queryFn: () => getID(platform, s),
  });

export const useID = (s: string, platform: string) =>
  useQuery(getIDOptions(s, platform));
