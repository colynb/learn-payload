import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  value: string;
  label: string;
  type: string;
}

interface GroupedOptions {
  [key: string]: Option[];
}

interface SearchParams {
  city?: string;
  zipcode?: string;
  lp?: string;
  hp?: string;
}

export function LocationSelect({
  locations,
  onChange,
}: {
  locations: Option[];
  onChange: (params: SearchParams) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Option | null>(null);

  const groupedOptions = locations.reduce<GroupedOptions>((acc, option) => {
    if (!acc[option.type]) {
      acc[option.type] = [];
    }
    acc[option.type].push(option);
    return acc;
  }, {});

  const handleUpdateLocation = (currentValue: string) => {
    const option = locations.find((option) => option.value === currentValue);
    if (!option) return;

    setValue(option);
    setOpen(false);

    onChange({
      [option.type]: option.value,
    });
  };

  const handleFilter = (value: string, search: string) => {
    const option = locations.find((option) => option.value === value);
    if (!option) return 0;
    if (option.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      return 1;
    return 0;
  };

  const selectedOption = value
    ? locations.find((option) => option.value === value.value)
    : null;

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="select"
            role="combobox"
            aria-expanded={open}
            className="justify-between max-w-none lg:col-span-6 text-brand-primary font-display ring-offset-background focus-visible:ring-offset-2 flex w-full border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 h-[50px] rounded-md text-xl px-5 py-3"
          >
            {value ? (
              `${selectedOption?.label} (${selectedOption?.type})`
            ) : (
              <span className="text-muted-foreground">
                City, county, or postal code...
              </span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: "var(--radix-popper-anchor-width)" }}
        >
          <Command filter={handleFilter}>
            <CommandInput placeholder="Search..." className="text-lg" />
            <CommandList className="text-lg">
              <CommandEmpty>No locations found.</CommandEmpty>
              {Object.entries(groupedOptions).map(
                ([groupKey, groupOptions]) => {
                  return (
                    <CommandGroup key={groupKey}>
                      <div className="font-bold bg-slate-200 px-2 py-1 capitalize">
                        {groupKey}
                      </div>
                      <div>
                        {groupOptions.map((option, i) => (
                          <CommandItem
                            key={`${option.value}-${i}`}
                            value={option.value}
                            onSelect={handleUpdateLocation}
                            className="text-lg"
                          >
                            {option.label}
                          </CommandItem>
                        ))}
                      </div>
                    </CommandGroup>
                  );
                }
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
