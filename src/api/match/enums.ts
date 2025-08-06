export const Roles = ["SOLO", "NONE", "CARRY", "SUPPORT"] as const;
export type RoleType = (typeof Roles)[number];

export const IndividualPositions = [
  "TOP",
  "JUNGLE",
  "MIDDLE",
  "BOTTOM",
  "UTILITY",
] as const;
export type IndividualPositionType = (typeof IndividualPositions)[number];

export function isIndividualPositionType(
  pos: string
): pos is IndividualPositionType {
  return IndividualPositions.includes(pos as IndividualPositionType);
}
