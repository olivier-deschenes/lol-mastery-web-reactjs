import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SEARCH_CACHE_KEY } from "@/queries/getMasteriesOptions";
import { Route } from "@/routes/mastery";
import {
  SearchCacheSchema,
  SearchCacheSummonerType,
} from "@/types/localstorage";
import { HistoryIcon, Search } from "lucide-react";
import { useState } from "react";
import { parse } from "valibot";

export function HistoryDialog() {
  const [open, setOpen] = useState(false);

  const summoners = localStorage.getItem(SEARCH_CACHE_KEY);
  const navigate = Route.useNavigate();

  const handleSearch = (summoners: SearchCacheSummonerType[]) => {
    navigate({
      search: {
        s: summoners.map((s) => `${s.gameName}#${s.tagLine}`),
        fs: summoners.map((_, index) => index),
      },
    });

    setOpen(false);
  };

  if (!summoners) {
    return null;
  }

  const searches = parse(SearchCacheSchema, JSON.parse(summoners));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <HistoryIcon className="w-4 mr-1" /> History
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen">
        <DialogHeader>
          <DialogTitle>Search History</DialogTitle>
        </DialogHeader>
        <div className={"flex flex-col divide-y"}>
          {searches.slice(0, 3).map((search, index) => (
            <div
              key={`search-${index}`}
              className={"flex py-2.5 group hover:bg-gray-100 cursor-pointer"}
              onClick={() => handleSearch(search)}
            >
              <div className={"flex justify-center items-center px-5"}>
                <Search className="w-4" />
              </div>
              <div className={"flex flex-row flex-wrap gap-1.5"}>
                {search.map((s) => (
                  <div
                    key={`search-${index}-${s.puuid}`}
                    className={"flex justify-center items-center"}
                  >
                    <img
                      src={s.profileIconUrl}
                      alt=""
                      className={"w-8 rounded-l-md"}
                    />
                    <div
                      className={
                        "bg-gray-200 px-1.5 rounded-r-md h-full flex items-center"
                      }
                    >
                      <span>{s.gameName}</span>#<span>{s.tagLine}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
