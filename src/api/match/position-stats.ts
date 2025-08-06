import { isIndividualPositionType } from "@/api/match/enums";
import {
  type GoodCachedInfoSchema,
  type ParticipantType,
} from "@/api/match/types";
import type { IconName } from "lucide-react/dynamic";

export type StatKeyType = keyof typeof StatDescriptions;

export const StatDescriptions = {
  OBJECTIVES_DESTROYED: {
    label: "Objectives Destroyed",
    description:
      "The total number of inhibitors and turrets destroyed by the player.",
    iconName: "land-plot",
  },
  DAMAGE_TO_OBJECTIVES: {
    label: "Damage to Objectives",
    description:
      "The amount of damage dealt to objectives like turrets and inhibitors.",
    iconName: "pickaxe",
  },
  DAMAGE_TAKEN: {
    label: "Damage Taken",
    description:
      "The total amount of damage the player has taken from champions.",
    iconName: "shield-user",
  },
  DRAGONS_KILLED: {
    label: "Dragons Killed",
    description: "The number of dragons slain by the player.",
    iconName: "bug",
  },
  DAMAGE_TO_ENEMIES: {
    label: "Damage to Enemies",
    description: "The total damage dealt to enemy champions.",
    iconName: "swords",
  },
  WARDS_DESTROYED: {
    label: "Wards Destroyed",
    description: "The number of enemy wards eliminated by the player.",
    iconName: "eye-off",
  },
  LARGEST_CRIT: {
    label: "Largest Crit",
    description: "The highest critical strike damage dealt in a single hit.",
    iconName: "zap",
  },
  SOLO_KILLS: {
    label: "Solo Kills",
    description: "The number of enemies killed without assistance.",
    iconName: "crown",
  },
  VISION_SCORE: {
    label: "Vision Score",
    description:
      "A score representing the player's contribution to team vision.",
    iconName: "eye",
  },
} satisfies Record<
  string,
  {
    label: string;
    description: string;
    iconName: IconName;
  }
>;

export type StatType = {
  value: number;
  key: StatKeyType;
};

export type PositionStatsType = StatType[];

export const getPositionStats = (
  puuid: ParticipantType["puuid"],
  match: GoodCachedInfoSchema
) => {
  const participant = match.data.participants.find((p) => p.puuid === puuid)!;
  const position = participant.individualPosition;

  if (!isIndividualPositionType(position))
    throw new Error("Not handled position for stats");

  switch (position) {
    case "TOP":
      return getTopPositionStats(participant);
    case "JUNGLE":
      return getJunglePositionStats(participant);
    case "MIDDLE":
      return getMiddlePositionStats(participant);
    case "BOTTOM":
      return getBottomPositionStats(participant);
    case "UTILITY":
      return getUtilityPositionStats(participant);
  }
};

type GetPositionStatsFunctionType = (
  participant: ParticipantType
) => PositionStatsType;

const getTopPositionStats: GetPositionStatsFunctionType = (p) => {
  const objectivesDestroyed = p.inhibitorKills + p.turretKills;
  const damageToObjectives = p.damageDealtToObjectives;
  const damageTaken = p.totalDamageDealtToChampions;

  return [
    {
      key: "OBJECTIVES_DESTROYED",
      value: objectivesDestroyed,
      iconName: "trophy",
    },
    {
      key: "DAMAGE_TO_OBJECTIVES",
      value: damageToObjectives,
      iconName: "shield",
    },
    { key: "DAMAGE_TAKEN", value: damageTaken, iconName: "heart-pulse" },
  ];
};

const getJunglePositionStats: GetPositionStatsFunctionType = (p) => {
  // Dragons killed
  const dragonsKilled = p.dragonKills;
  // Damage delt to enemies
  const damageToEnemies = p.totalDamageDealtToChampions;
  // Visions detroyed
  const wardsDestroyed = p.visionScore;

  return [
    {
      key: "DRAGONS_KILLED",
      value: dragonsKilled,
    },
    {
      key: "DAMAGE_TO_ENEMIES",
      value: damageToEnemies,
    },
    {
      key: "WARDS_DESTROYED",
      value: wardsDestroyed,
    },
  ];
};

const getMiddlePositionStats: GetPositionStatsFunctionType = (p) => {
  // Damage delt to enemies
  const damageToEnemies = p.totalDamageDealtToChampions;
  // Largest Crit
  const largestCrit = p.largestCriticalStrike;
  // Solo Kills
  const soloKills = p.challenges?.soloKills || 0;

  return [
    {
      key: "DAMAGE_TO_ENEMIES",
      value: damageToEnemies,
    },
    {
      key: "LARGEST_CRIT",
      value: largestCrit,
    },
    {
      key: "SOLO_KILLS",
      value: soloKills,
    },
  ];
};

const getBottomPositionStats: GetPositionStatsFunctionType = (p) => {
  return getMiddlePositionStats(p);
};

const getUtilityPositionStats: GetPositionStatsFunctionType = (p) => {
  // Vision Score
  const visionScore = p.visionScore;
  // Damage to enemies
  const damageToEnemies = p.totalDamageDealtToChampions;
  // Wards destroyed
  const wardsDestroyed = p.challenges?.wardTakedowns || 0;

  return [
    {
      key: "VISION_SCORE",
      value: visionScore,
    },
    {
      key: "DAMAGE_TO_ENEMIES",
      value: damageToEnemies,
    },
    {
      key: "WARDS_DESTROYED",
      value: wardsDestroyed,
    },
  ];
};
