import { useState, createContext, useMemo, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowDown01,
  ArrowDownAZIcon,
  ArrowUp10Icon,
  ArrowUpDownIcon,
  ArrowUpZAIcon,
  Eraser,
  MedalIcon,
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
import { createFileRoute } from "@tanstack/react-router";
import { getMasteriesOptions } from "../../queries/getMasteriesOptions";
import { Button } from "@/components/ui/button";
import { HistoryDialog } from "@/components/mastery/HistoryDialog";
import { SummonerQuickTips } from "../../components/mastery/SummonerQuickTips";
import { useQuery } from "@tanstack/react-query";
import { SummonersList } from "../../components/mastery/SummonersList";
import { MasteryList } from "../../components/mastery/MasteryList";
import { toast } from "sonner";

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
  component: Index,
  validateSearch: (search) => parse(MasterySearchParamSchema, search),
  loaderDeps: ({ search }) => ({
    s: search.s,
  }),
});

function Index() {
  const [summonerNamesInput, setSummonerNamesInput] = useState("");
  const { mSort, c, cSort, fs, s } = Route.useSearch();

  const q_masteries = useQuery(getMasteriesOptions({ s }));

  const data = q_masteries.data;

  const navigate = Route.useNavigate();

  useEffect(() => {
    if (q_masteries.isError) {
      toast.error("An error occurred while fetching the data.");

      navigate({ search: {} });
    }
  }, [navigate, q_masteries.error, q_masteries.isError]);

  const liveMergedData = useMemo<MultiSummonerMasteryType>(() => {
    if (!data) return { summoners: [], mastery: [] };

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
      <div className="container flex flex-col mx-auto">
        <header>
          <h1
            className={
              "text-3xl font-bold py-5 text-primary flex gap-1.5 items-center"
            }
          >
            <MedalIcon />
            ChampionMastery.lol
          </h1>
        </header>
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-center mx-auto gap-3">
          <div className="w-full">
            <Textarea
              placeholder="Enter summoner names."
              className="h-24"
              value={summonerNamesInput}
              onChange={(e) => setSummonerNamesInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.stopPropagation();
                  e.preventDefault();
                  handleClick();
                }
              }}
            />
          </div>
          <SummonerQuickTips />
          <div className="flex justify-between w-full">
            <div className={"flex gap-1 ml-auto"}>
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
            <SummonersList />
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
          <MasteryList />
        </div>
      </div>
    </MasteryProvider>
  );
}
