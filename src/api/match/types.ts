import { apiDateSchema } from "@/api/common";
import * as v from "valibot";

const ChallengesSchema = v.object({
  abilityUses: v.number(),
  damagePerMinute: v.number(),
  damageTakenOnTeamPercentage: v.number(),
  goldPerMinute: v.number(),
  kda: v.number(),
  killParticipation: v.number(),
  teamDamagePercentage: v.number(),
  visionScorePerMinute: v.number(),
  wardTakedowns: v.number(),
  dragonTakedowns: v.optional(v.number()),
  baronTakedowns: v.optional(v.number()),
});

const PerkStyleSelectionSchema = v.object({
  perk: v.number(),
});

const PerkStyleSchema = v.object({
  description: v.string(),
  selections: v.array(PerkStyleSelectionSchema),
  style: v.number(),
});

const PerksSchema = v.object({
  statPerks: v.object({
    defense: v.number(),
    flex: v.number(),
    offense: v.number(),
  }),
  styles: v.array(PerkStyleSchema),
});

const ParticipantSchema = v.object({
  assists: v.number(),
  challenges: v.optional(ChallengesSchema), //
  champLevel: v.number(),
  championId: v.number(),
  championName: v.string(),
  deaths: v.number(),
  doubleKills: v.number(),
  goldEarned: v.number(),
  individualPosition: v.string(),
  inhibitorKills: v.number(),
  item0: v.number(),
  item1: v.number(),
  item2: v.number(),
  item3: v.number(),
  item4: v.number(),
  item5: v.number(),
  item6: v.number(),
  killingSprees: v.number(),
  kills: v.number(),
  lane: v.string(),
  largestKillingSpree: v.number(),
  largestMultiKill: v.number(),
  neutralMinionsKilled: v.number(),
  perks: PerksSchema, //
  profileIcon: v.number(),
  puuid: v.string(),
  riotIdGameName: v.string(),
  riotIdTagline: v.string(),
  role: v.string(),
  summoner1Id: v.number(),
  summoner2Id: v.number(),
  teamId: v.number(),
  teamPosition: v.string(),
  totalDamageDealtToChampions: v.number(),
  totalDamageTaken: v.number(),
  totalMinionsKilled: v.number(),
  tripleKills: v.number(),
  turretKills: v.number(),
  visionScore: v.number(),
  wardsKilled: v.number(),
  wardsPlaced: v.number(),
  win: v.boolean(),
});

const SimpleBanSchema = v.object({
  championId: v.number(),
});

const ObjectiveSchema = v.object({
  first: v.boolean(),
  kills: v.number(),
});

const ObjectivesSchema = v.object({
  baron: ObjectiveSchema,
  dragon: ObjectiveSchema,
  inhibitor: ObjectiveSchema,
  tower: ObjectiveSchema,
});

const TeamSchema = v.object({
  bans: v.array(SimpleBanSchema),
  objectives: ObjectivesSchema,
  teamId: v.number(),
  win: v.boolean(),
});

const InfoSchema = v.object({
  gameDuration: v.number(),
  gameEndTimestamp: apiDateSchema,
  gameId: v.number(),
  gameMode: v.string(),
  gameStartTimestamp: apiDateSchema,
  gameVersion: v.string(),
  mapId: v.number(),
  participants: v.array(ParticipantSchema),
  queueId: v.number(),
  teams: v.array(TeamSchema),
});

const MetadataSchema = v.object({
  matchId: v.string(),
  participants: v.array(v.string()),
});

export const MatchSchema = v.object({
  champion_ids: v.array(v.number()),
  created_at: apiDateSchema,
  data: InfoSchema,
  id: v.string(),
  played_at: apiDateSchema,
  puuids: v.array(v.string()),
  region: v.string(),
});

export const MatchesResponseSchema = v.object({
  next_cursor: v.nullable(v.number()),
  data: v.array(MatchSchema),
});

export type MatchesResponseType = v.InferOutput<typeof MatchesResponseSchema>;
export type MatchType = v.InferOutput<typeof MatchSchema>;
export type ChallengesType = v.InferOutput<typeof ChallengesSchema>;
export type PerkStyleSelectionType = v.InferOutput<
  typeof PerkStyleSelectionSchema
>;
export type PerkStyleType = v.InferOutput<typeof PerkStyleSchema>;
export type PerksType = v.InferOutput<typeof PerksSchema>;
export type ParticipantType = v.InferOutput<typeof ParticipantSchema>;
export type SimpleBanType = v.InferOutput<typeof SimpleBanSchema>;
export type ObjectiveType = v.InferOutput<typeof ObjectiveSchema>;
export type ObjectivesType = v.InferOutput<typeof ObjectivesSchema>;
export type TeamType = v.InferOutput<typeof TeamSchema>;
export type InfoType = v.InferOutput<typeof InfoSchema>;
export type MetadataType = v.InferOutput<typeof MetadataSchema>;
