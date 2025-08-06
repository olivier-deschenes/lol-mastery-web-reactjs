import ky from "ky";
import * as v from "valibot";

export const QueueSchema = v.object({
  queueId: v.number(),
  map: v.string(),
  description: v.nullable(v.string()),
  notes: v.nullable(v.string()),
});
export type QueueType = v.InferOutput<typeof QueueSchema>;

const FetchQueuesSchema = v.array(QueueSchema);

export const fetchQueues = async () => {
  const data = await ky
    .get("https://static.developer.riotgames.com/docs/lol/queues.json")
    .json();

  const parsed = v.parse(FetchQueuesSchema, data);

  return parsed.reduce(
    (acc, queue: QueueType) => {
      acc[queue.queueId] = queue;

      return acc;
    },
    {} as Record<QueueType["queueId"], QueueType>
  );
};
