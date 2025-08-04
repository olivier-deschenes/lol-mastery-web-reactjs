import { IDSchema } from "@/api/id/types";
import { apiClient } from "@/lib/utils";
import * as v from "valibot";

export const getID = async (platform: string, riotID: string) => {
  const response = await apiClient
    .get(`${platform}/${encodeURIComponent(riotID)}`)
    .json();

  return v.parse(IDSchema, response);
};
