import { parse } from "valibot";
import { apiClient } from "../../lib/utils";
import { MasteryResponseSchema } from "./types";

export const getMasteryBySummonerName = async (
  name: string,
  refresh: boolean
) => {
  const params = new URLSearchParams([
    ["summonerName", encodeURIComponent(name)],
    ["refresh", refresh ? "true" : "false"],
  ]);

  const response = await apiClient.get(`mastery?${params.toString()}`).json();

  return parse(MasteryResponseSchema, response);
};
