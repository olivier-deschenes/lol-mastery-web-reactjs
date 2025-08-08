import { apiClient } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

const handleAddRiotId = async (id: string) => {
  const data = await apiClient
    .patch(`user/riot-id`, {
      body: JSON.stringify({
        riot_id: id,
      }),
    })
    .json();

  console.log({ data });

  return data;
};

export const usePatchRiotId = () => {
  return useMutation({
    mutationFn: async ({ riotId: riotId }: { riotId: string }) => {
      const data = await handleAddRiotId(riotId);

      return data;
    },
  });
};
