import * as v from "valibot";

export const apiDateSchema = v.pipe(
  v.string(),
  v.transform((d) => new Date(d))
);
