import * as v from "valibot";

export const apiDateSchema = v.pipe(
  v.string(),
  v.transform((d) => new Date(d))
);

export const LolPlatform = [
  "na1",
  "br1",
  "la1",
  "la2",
  "euw1",
  "eune1",
  "tr1",
  "ru",
  "kr",
  "jp1",
  "oc1",
  "ph2",
  "sg2",
  "th2",
  "tw2",
  "vn2",
] as const;
