import { parse } from "valibot";
import { apiClient } from "../../lib/utils";
import { MasteryResponseSchema } from "./types";

export const getMasteryBySummonerName = async (
  name: string,
  refresh: boolean
) => {
  const params = new URLSearchParams([["refresh", refresh ? "true" : "false"]]);

  const response = await apiClient
    .get(`mastery/${encodeURIComponent(name)}?${params.toString()}`)
    .json();

  return parse(MasteryResponseSchema, response);
};
