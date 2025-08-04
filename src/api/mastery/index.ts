import { parse } from "valibot";
import { apiClient } from "../../lib/utils";
import { MasteryResponseSchema } from "./types";

export const getMasteryBySummonerName = async (
  platform: string,
  riotID: string,
  refresh: boolean = false
) => {
  try {
    const searchParams = new URLSearchParams([
      ["refresh", refresh ? "1" : "0"],
    ]);

    const response = await apiClient
      .get(
        `${platform}/${encodeURIComponent(riotID)}/mastery?${searchParams.toString()}`
      )
      .json();
    return parse(MasteryResponseSchema, response);
  } catch (e) {
    console.error(e);

    throw e;
  }
};
