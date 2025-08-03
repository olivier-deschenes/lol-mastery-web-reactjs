import { MetadataResponseSchema } from "@/api/metadata/types";
import { apiClient } from "@/lib/utils";
import { queryOptions, useQuery } from "@tanstack/react-query";
import * as v from "valibot";

export const fetchMetadata = async () => {
  const data = await apiClient.get("metadata").json();

  return v.parse(MetadataResponseSchema, data);
};

export const getMetadataOptions = () =>
  queryOptions({
    queryKey: ["metadata"],
    retry: false,
    refetchInterval: false,
    queryFn: fetchMetadata,
  });

export const useMasteries = () => useQuery(getMetadataOptions());
