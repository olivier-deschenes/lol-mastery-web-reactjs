import { apiDateSchema } from "@/api/common";
import { type InferOutput, array, string } from "valibot";
import * as v from "valibot";

export const MatchIDsRiotQueryParamsSchema = v.object({
  queue: v.optional(v.number()),
  type: v.optional(v.string()),
  startTime: v.optional(v.number()),
  endTime: v.optional(v.number()),
  count: v.optional(v.number(), 20),
  start: v.optional(v.number(), 0),
});
export type MatchIDsRiotQueryParams = v.InferOutput<
  typeof MatchIDsRiotQueryParamsSchema
>;

export const MatchIDsCustomQueryParamsSchema = v.object({
  cursor: v.pipe(
    v.string(),
    v.transform((d) => Number(d)),
    v.number()
  ),
  queue: MatchIDsRiotQueryParamsSchema.entries.queue,
  type: MatchIDsRiotQueryParamsSchema.entries.type,
});
export type MatchIDsCustomQueryParams = v.InferOutput<
  typeof MatchIDsCustomQueryParamsSchema
>;

export const MatchIDsQueryParamsSchema = v.intersect([
  MatchIDsCustomQueryParamsSchema,
  MatchIDsRiotQueryParamsSchema,
]);

export type GetMatchIDsQueryParamsType = v.InferOutput<
  typeof MatchIDsQueryParamsSchema
>;

export const MatchIdSchema = string();
export type MatchIdType = InferOutput<typeof MatchIdSchema>;

export const MatchIdsResponseSchema = array(MatchIdSchema);
export type MatchIdsResponseType = InferOutput<typeof MatchIdsResponseSchema>;

export const ParticipantSchema = v.object({
  assists: v.number(),
  baronKills: v.number(),
  challenges: v.optional(
    v.object({
      damagePerMinute: v.number(),
      damageTakenOnTeamPercentage: v.number(),
      goldPerMinute: v.number(),
      kda: v.number(),
      killParticipation: v.optional(v.number()),
      teamDamagePercentage: v.number(),
      visionScorePerMinute: v.number(),
      wardTakedowns: v.number(),
      soloKills: v.number(),
      dragonTakedowns: v.number(),
      baronTakedowns: v.number(),
    })
  ),
  champExperience: v.number(),
  champLevel: v.number(),
  championId: v.number(),
  championName: v.string(),
  damageDealtToBuildings: v.number(),
  damageDealtToObjectives: v.number(),
  damageDealtToTurrets: v.number(),
  damageSelfMitigated: v.number(),
  deaths: v.number(),
  doubleKills: v.number(),
  dragonKills: v.number(),
  firstBloodAssist: v.boolean(),
  firstBloodKill: v.boolean(),
  firstTowerAssist: v.boolean(),
  firstTowerKill: v.boolean(),
  gameEndedInEarlySurrender: v.boolean(),
  gameEndedInSurrender: v.boolean(),
  goldEarned: v.number(),
  goldSpent: v.number(),
  individualPosition: v.string(),
  inhibitorKills: v.number(),
  inhibitorTakedowns: v.number(),
  inhibitorsLost: v.number(),
  item0: v.number(),
  item1: v.number(),
  item2: v.number(),
  item3: v.number(),
  item4: v.number(),
  item5: v.number(),
  item6: v.number(),
  itemsPurchased: v.number(),
  killingSprees: v.number(),
  kills: v.number(),
  lane: v.string(),
  largestCriticalStrike: v.number(),
  largestKillingSpree: v.number(),
  largestMultiKill: v.number(),
  longestTimeSpentLiving: v.number(),
  magicDamageDealt: v.number(),
  magicDamageDealtToChampions: v.number(),
  magicDamageTaken: v.number(),
  neutralMinionsKilled: v.number(),
  nexusKills: v.number(),
  nexusLost: v.number(),
  nexusTakedowns: v.number(),
  participantId: v.number(),
  pentaKills: v.number(),
  perks: v.object({
    statPerks: v.object({
      defense: v.number(),
      flex: v.number(),
      offense: v.number(),
    }),
    styles: v.array(
      v.object({
        description: v.string(),
        selections: v.array(
          v.object({
            perk: v.number(),
            var1: v.number(),
            var2: v.number(),
            var3: v.number(),
          })
        ),
        style: v.number(),
      })
    ),
  }),
  physicalDamageDealt: v.number(),
  physicalDamageDealtToChampions: v.number(),
  physicalDamageTaken: v.number(),
  placement: v.number(),
  profileIcon: v.number(),
  puuid: v.string(),
  quadraKills: v.number(),
  riotIdGameName: v.string(),
  riotIdTagline: v.string(),
  role: v.string(),
  subteamPlacement: v.number(),
  summoner1Id: v.number(),
  summoner2Id: v.number(),
  summonerId: v.string(),
  summonerLevel: v.number(),
  teamEarlySurrendered: v.boolean(),
  teamId: v.number(),
  teamPosition: v.string(),
  timeCCingOthers: v.number(),
  totalAllyJungleMinionsKilled: v.number(),
  totalDamageDealt: v.number(),
  totalDamageDealtToChampions: v.number(),
  totalDamageShieldedOnTeammates: v.number(),
  totalDamageTaken: v.number(),
  totalEnemyJungleMinionsKilled: v.number(),
  totalHeal: v.number(),
  totalHealsOnTeammates: v.number(),
  totalMinionsKilled: v.number(),
  totalTimeCCDealt: v.number(),
  totalTimeSpentDead: v.number(),
  timePlayed: v.number(),
  tripleKills: v.number(),
  trueDamageDealt: v.number(),
  trueDamageDealtToChampions: v.number(),
  trueDamageTaken: v.number(),
  turretKills: v.number(),
  turretTakedowns: v.number(),
  turretsLost: v.number(),
  unrealKills: v.number(),
  visionScore: v.number(),
  wardsKilled: v.number(),
  wardsPlaced: v.number(),
  win: v.boolean(),
});
export type ParticipantType = v.InferOutput<typeof ParticipantSchema>;

const BanSchema = v.object({
  championId: v.number(),
  pickTurn: v.number(),
});

const FeatSchema = v.object({
  featState: v.number(),
});

const FeatsSchema = v.object({
  EPIC_MONSTER_KILL: FeatSchema,
  FIRST_BLOOD: FeatSchema,
  FIRST_TURRET: FeatSchema,
});

const ObjectiveSchema = v.object({
  first: v.boolean(),
  kills: v.number(),
});

const ObjectivesSchema = v.object({
  baron: ObjectiveSchema,
  champion: ObjectiveSchema,
  dragon: ObjectiveSchema,
  horde: ObjectiveSchema,
  inhibitor: ObjectiveSchema,
  riftHerald: ObjectiveSchema,
  tower: ObjectiveSchema,
});

const TeamSchema = v.object({
  bans: v.array(BanSchema),
  feats: v.optional(FeatsSchema),
  objectives: ObjectivesSchema,
  teamId: v.number(),
  win: v.boolean(),
});

export const BadGameResults = [
  "Abort_Unexpected",
  "Abort_TooFewPlayers",
  "Abort_AntiCheatExit ",
] as const;
export type BadGameResult = (typeof BadGameResults)[number];

export const GoodGameResults = ["GameComplete"] as const;
export type GoodGameResult = (typeof GoodGameResults)[number];

export const GameResults = [...BadGameResults, ...GoodGameResults] as const;
export type GameResult = (typeof GameResults)[number];

export const isGoodGameResult = (
  result: MatchType["info"]
): result is v.InferOutput<typeof CompletedInfoSchema> => {
  return GoodGameResults.includes(result.endOfGameResult as any);
};

const BaseInfoSchema = v.object({
  gameCreation: v.number(),
  gameDuration: v.number(),
  gameId: v.number(),
  gameMode: v.string(),
  gameName: v.string(),
  gameType: v.string(),
  gameVersion: v.string(),
  mapId: v.number(),
  platformId: v.string(),
  queueId: v.number(),
  tournamentCode: v.string(),
  gameEndTimestamp: apiDateSchema,
  gameStartTimestamp: apiDateSchema,
});

const CompletedInfoSchema = v.intersect([
  BaseInfoSchema,
  v.object({
    endOfGameResult: v.literal("GameComplete"),
    participants: v.array(ParticipantSchema),
    teams: v.array(TeamSchema),
  }),
]);

const AbortedInfoSchema = v.intersect([
  BaseInfoSchema,
  v.object({
    endOfGameResult: v.picklist([
      "Abort_Unexpected",
      "Abort_TooFewPlayers",
      "Abort_AntiCheatExit",
    ]),
    participants: v.pipe(v.array(v.unknown()), v.empty()),
    teams: v.pipe(v.array(v.unknown()), v.empty()),
  }),
]);

export const MatchSchema = v.object({
  metadata: v.object({
    dataVersion: v.string(),
    matchId: v.string(),
    participants: v.array(v.string()),
  }),
  info: v.union([CompletedInfoSchema, AbortedInfoSchema]),
});

// Inferred TypeScript type from the schema (discriminated union)
export type MatchType = v.InferOutput<typeof MatchSchema>;

const BaseCachedInfoSchema = v.object({
  created_at: apiDateSchema,
  id: v.string(),
  puuids: v.array(v.string()),
  region: v.string(),
  played_at: apiDateSchema,
});
const GoodCachedInfoSchema = v.intersect([
  BaseCachedInfoSchema,
  v.object({
    endOfGameResult: v.literal("GameComplete"),
    champion_ids: v.array(v.number()),
    data: CompletedInfoSchema,
  }),
]);
export type GoodCachedInfoSchema = v.InferOutput<typeof GoodCachedInfoSchema>;

const BadCachedInfoSchema = v.intersect([
  BaseCachedInfoSchema,
  v.object({
    endOfGameResult: v.picklist([
      "Abort_Unexpected",
      "Abort_TooFewPlayers",
      "Abort_AntiCheatExit",
    ]),
  }),
]);
export type BadCachedInfoSchema = v.InferOutput<typeof GoodCachedInfoSchema>;

export const CachedMatchSchema = v.union([
  GoodCachedInfoSchema,
  BadCachedInfoSchema,
]);
export type CachedMatchType = v.InferOutput<typeof CachedMatchSchema>;
