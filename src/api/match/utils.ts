import type { IndividualPositionType } from "@/api/match/enums";
import type { ParticipantType } from "@/api/match/types";
import { toTitleCase } from "@/lib/utils";

export const riotIDFromParticipant = (p: ParticipantType) =>
  `${p.riotIdGameName}#${p.riotIdTagline}`;

export const calculateKDA = (p: ParticipantType) => {
  return ((p.kills + p.assists) / (p.deaths || 1)).toFixed(2);
};

export const getPositionName = (p: IndividualPositionType) => {
  const name = p === "UTILITY" ? "SUPPORT" : p;

  return toTitleCase(name);
};
