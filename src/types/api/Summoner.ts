import { array, number, object, string } from "valibot";

export const summoner = object({
  puuid: string(),
  profileIconId: number(),
  profileIconUrl: string(),
  summonerLevel: number(),
});
export type SummonerType = typeof summoner;

export const account = object({
  puuid: string(),
  gameName: string(),
  tagLine: string(),
  summonerName: string(),
});
export type AccountType = typeof account;

export const league = object({});
export type LeagueType = typeof league;

export const GetSummonerResponseSchema = object({
  summoner,
  account,
  leagues: array(league),
});
