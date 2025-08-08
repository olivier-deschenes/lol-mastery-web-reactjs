import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { redirect } from "@tanstack/react-router";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        riot_ids: {
          type: "string[]",
        },
      },
    }),
  ],
});

export function assertLoggedIn(
  user: typeof authClient.$Infer.Session.user | undefined
): asserts user is typeof authClient.$Infer.Session.user {
  if (!user) {
    throw redirect({
      to: "/",
    });
  }
}
