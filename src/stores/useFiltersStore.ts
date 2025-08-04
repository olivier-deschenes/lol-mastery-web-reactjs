import type { MasteryIDType } from "@/api/mastery/types";
import { create } from "zustand";

interface State {
  championName: string;
  summoners: Array<MasteryIDType["puuid"]>;
  sortDirection: "asc" | "desc";

  changeChampionName: (name: string) => void;

  toggleSummoner: (puuid: MasteryIDType["puuid"]) => void;
  setSummoners: (puuids: Array<MasteryIDType["puuid"]>) => void;

  toggleSortDirection: () => void;
}

export const useFilterStore = create<State>()((set) => ({
  championName: "",
  summoners: [],
  sortDirection: "desc",

  changeChampionName: (name) => set({ championName: name }),
  toggleSummoner: (puuid) =>
    set((state) => ({
      summoners: state.summoners.includes(puuid)
        ? state.summoners.filter((s) => s !== puuid)
        : [...state.summoners, puuid],
    })),
  setSummoners: (puuids) => set({ summoners: puuids }),
  toggleSortDirection: () =>
    set((state) => ({
      sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
    })),
}));
