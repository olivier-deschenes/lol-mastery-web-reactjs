import { useState, createContext, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowDown01,
  ArrowDownAZIcon,
  ArrowUp10Icon,
  ArrowUpDownIcon,
  ArrowUpZAIcon,
  Eraser,
  RefreshCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { MultiMasteryInfoType, MultiSummonerMasteryType } from "@/types/api";
import { MasteryProvider } from "@/contexts/MasteryContext";
import {
  Output,
  array,
  nullable,
  number,
  object,
  optional,
  parse,
  picklist,
  string,
} from "valibot";
import { Summoner } from "@/components/mastery/Summoner";
import { Mastery } from "@/components/mastery/Mastery";
import { createFileRoute } from "@tanstack/react-router";
import { getMasteriesOptions } from "../../queries/getMasteriesOptions";
import { Button } from "@/components/ui/button";
import { HistoryDialog } from "@/components/mastery/HistoryDialog";

export const MasteryContext = createContext(null);

const sortSchema = picklist(["asc", "desc"]);

const MasterySearchParamSchema = object({
  s: optional(array(string()), []), // Summoners
  mSort: optional(nullable(sortSchema), "desc"), // Mastery Points Sort
  cSort: optional(nullable(sortSchema), null), // Champion Name Sort
  fs: optional(array(number()), []), // Filtered Summoners
  c: optional(string(), ""), // Champion Name filter
  hs: optional(nullable(number()), null), // Summoner hightlight
});

type MasterySearchParamType = Output<typeof MasterySearchParamSchema>;

export const Route = createFileRoute("/mastery/")({
  component: MasteryList,
  validateSearch: (search) => parse(MasterySearchParamSchema, search),
  loaderDeps: ({ search }) => ({
    s: search.s,
  }),
  loader: async ({ deps, context: { queryClient } }) =>
    queryClient.ensureQueryData(getMasteriesOptions({ s: deps.s })),
  pendingComponent: () => <div>Loading...</div>,
});

function MasteryList() {
  //     "odeschenes#001\nopaxx#1234\nodeschenes#003\nOlivierDeschênes#004\nodeschenes4#1234\nOlivierDeschênes#006\nodeschenes#005"

  const [summonerNamesInput, setSummonerNamesInput] = useState("");

  const { mSort, c, cSort, fs } = Route.useSearch();
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();

  const liveMergedData = useMemo<MultiSummonerMasteryType>(() => {
    const summoners = data.map((m) => m.summoner);
    const mastery = data.map((m) => m.mastery).flat();

    const masteryMap = new Map<string, MultiMasteryInfoType>();

    mastery.forEach((m) => {
      const key = m.champion.id;
      const summonerIndex = summoners.findIndex((s) => s.puuid === m.puuid)!;

      if (!fs.includes(summonerIndex)) {
        return;
      }

      if (!masteryMap.has(key)) {
        masteryMap.set(key, {
          champion: m.champion,
          data: [
            {
              championLevel: m.championLevel,
              championPoints: m.championPoints,
              lastPlayTime: m.lastPlayTime,
              puuid: m.puuid,
            },
          ],
          totalChampionPoints: m.championPoints,
        });
      } else {
        const current = masteryMap.get(key)!;

        current.data.push({
          championLevel: m.championLevel,
          championPoints: m.championPoints,
          lastPlayTime: m.lastPlayTime,
          puuid: m.puuid,
        });

        current.totalChampionPoints += m.championPoints;

        masteryMap.set(key, current);
      }
    });

    const multiMastery = {
      summoners,
      mastery: Array.from(masteryMap.values()),
    };

    return multiMastery;
  }, [data, fs]);

  const mergedData = useMemo<MultiSummonerMasteryType>(() => {
    return {
      mastery: liveMergedData.mastery.sort((a, b) => {
        if (mSort) {
          return mSort === "asc"
            ? a.totalChampionPoints - b.totalChampionPoints
            : b.totalChampionPoints - a.totalChampionPoints;
        }

        return cSort === "asc"
          ? a.champion.name.localeCompare(b.champion.name)
          : b.champion.name.localeCompare(a.champion.name);
      }),
      summoners: liveMergedData.summoners,
    };
  }, [cSort, liveMergedData.mastery, liveMergedData.summoners, mSort]);

  const handleClick = () => {
    const summonerNames = summonerNamesInput.trim().split("\n").filter(Boolean);

    if (!summonerNames.length) {
      setSummonerNamesInput("");
      return;
    }

    navigate({
      search: (prev) => ({
        ...prev,
        s: summonerNames,
        fs: summonerNames.map((_, index) => index),
      }),
    });
    setSummonerNamesInput("");
  };

  const handleSortChange = (
    key: keyof Pick<MasterySearchParamType, "cSort" | "mSort">
  ) => {
    const newSort =
      (key === "mSort" ? mSort : cSort) === "asc" ? "desc" : "asc";
    const otherKey = key === "mSort" ? "cSort" : "mSort";

    navigate({
      search: (prev) => ({ ...prev, [key]: newSort, [otherKey]: null }),
    });
  };

  return (
    <MasteryProvider mastery={mergedData}>
      <div className="container flex flex-col gap-10 mt-10 mx-auto">
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-center mx-auto gap-3">
          <div className="w-full">
            <Textarea
              placeholder="Enter summoner names."
              className="h-24"
              value={summonerNamesInput}
              onChange={(e) => setSummonerNamesInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  e.preventDefault();
                  handleClick();
                }
              }}
            />
          </div>
          <div className="flex justify-between w-full">
            <div>
              <Button variant={"ghost"}>
                <RefreshCcw className="w-4 mr-1" /> Refresh Colors
              </Button>
            </div>
            <div className={"flex gap-1"}>
              <HistoryDialog />
              <Button onClick={handleClick}>Search</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <div className="items-center">
              <h2 className="font-mono font-bold">Summoners</h2>
            </div>
            <div className="flex items-start md:items-center gap-1.5 md:gap-5 flex-col md:flex-row flex-wrap select-none">
              {mergedData.summoners.map((summoner) => (
                <Summoner
                  key={`summoner-${summoner.puuid}`}
                  summoner={summoner}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="items-center flex justify-between">
              <div>
                <h2 className="font-mono font-bold">Filters</h2>
              </div>
              <div className="flex flex-row">
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange("cSort")}
                >
                  {cSort === null ? (
                    <ArrowUpDownIcon className="w-4 mr-1" />
                  ) : cSort === "asc" ? (
                    <ArrowDownAZIcon className="w-4 mr-1" />
                  ) : (
                    <ArrowUpZAIcon className="w-4 mr-1" />
                  )}{" "}
                  Champion Name
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange("mSort")}
                >
                  {mSort === null ? (
                    <ArrowUpDownIcon className="w-4 mr-1" />
                  ) : mSort === "asc" ? (
                    <ArrowDown01 className="w-4 mr-1" />
                  ) : (
                    <ArrowUp10Icon className="w-4 mr-1" />
                  )}{" "}
                  Mastery Points
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate({ search: {} })}
                >
                  <Eraser className="w-4 mr-1" /> Clear Data
                </Button>
              </div>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Enter a champion name"
                value={c}
                onChange={(e) =>
                  navigate({
                    search: (prev) => ({ ...prev, c: e.target.value }),
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-12">
            {mergedData.mastery.map((mastery) => (
              <Mastery
                mastery={mastery}
                key={`mastery-${mastery.champion.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </MasteryProvider>
  );
}
