import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = {
  code: string;
  name: string;
  region: string;
};

type RegionGroup = {
  region: string;
  platforms: Platform[];
};

const REGION_GROUPS: RegionGroup[] = [
  {
    region: "Americas",
    platforms: [
      { code: "na1", name: "North America", region: "Americas" },
      { code: "br1", name: "Brazil", region: "Americas" },
      { code: "la1", name: "LAN (Latin America North)", region: "Americas" },
      { code: "la2", name: "LAS (Latin America South)", region: "Americas" },
    ],
  },
  {
    region: "Europe",
    platforms: [
      { code: "euw1", name: "Europe West", region: "Europe" },
      { code: "eun1", name: "Europe Nordic & East", region: "Europe" },
      { code: "tr1", name: "Turkey", region: "Europe" },
      { code: "ru", name: "Russia", region: "Europe" },
    ],
  },
  {
    region: "Asia",
    platforms: [
      { code: "kr", name: "Korea", region: "Asia" },
      { code: "jp1", name: "Japan", region: "Asia" },
    ],
  },
  {
    region: "Oceania",
    platforms: [{ code: "oc1", name: "Oceania", region: "Oceania" }],
  },
];

const ALL_PLATFORMS: Platform[] = REGION_GROUPS.flatMap((g) => g.platforms);

export type RiotPlatformSelectProps = {
  value: string;
  onChange?: (platformCode: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
  showRegionBadge?: boolean;
};

export function RiotPlatformSelect({
  value,
  onChange = (v) => console.log("Selected platform:", v),
  placeholder = "Select a Riot platform",
  className,
  buttonClassName,
  disabled = false,
  showRegionBadge = true,
}: RiotPlatformSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string>(value);

  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  const selected = internal
    ? (ALL_PLATFORMS.find((p) => p.code === internal) ?? null)
    : null;

  const handleSelect = (code: string) => {
    setInternal(code);
    onChange(code);
    setOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a Riot platform"
            className={cn(
              "w-full justify-between",
              !selected && "text-muted-foreground",
              buttonClassName
            )}
            disabled={disabled}
          >
            <div className="flex items-center gap-2 truncate">
              <Globe className="h-4 w-4 shrink-0" />
              {selected ? (
                <span className="truncate">
                  {selected.name}{" "}
                  <span className="text-muted-foreground">
                    ({selected.code})
                  </span>
                </span>
              ) : (
                <span className="truncate">{placeholder}</span>
              )}
              {selected && showRegionBadge ? (
                <Badge variant="secondary" className="ml-1 shrink-0">
                  {selected.region}
                </Badge>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <ChevronsUpDown className="h-4 w-4 opacity-60" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[min(520px,90vw)]" align="start">
          <Command>
            <div className="px-1 pt-1">
              <CommandInput
                placeholder="Search platform by code, name, or region..."
                autoFocus
              />
            </div>
            <CommandList>
              <CommandEmpty>No platform found.</CommandEmpty>

              {REGION_GROUPS.map((group, idx) => (
                <React.Fragment key={group.region}>
                  <CommandGroup heading={group.region}>
                    {group.platforms.map((platform) => {
                      const isSelected = selected?.code === platform.code;
                      return (
                        <CommandItem
                          key={platform.code}
                          // Value is used for fuzzy search; include code, name, and region.
                          value={`${platform.code} ${platform.name} ${platform.region}`}
                          onSelect={() => handleSelect(platform.code)}
                          className="flex items-center gap-2"
                        >
                          <Check
                            className={cn(
                              "h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {platform.name}{" "}
                              <span className="text-muted-foreground">
                                ({platform.code})
                              </span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Region: {platform.region}
                            </span>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  {idx < REGION_GROUPS.length - 1 ? <CommandSeparator /> : null}
                </React.Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
