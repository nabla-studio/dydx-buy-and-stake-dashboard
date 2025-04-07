"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type HTMLAttributes, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDateFilter } from "@/hooks/date-filter";
import { cn } from "@/lib/utils";
import { dateFilterParsers } from "@/state/date-filter";

export function DatePickerWithRange({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { dates, notDefaultValue, setDate } = useDateFilter();

  const selectedDate = useMemo(() => {
    return {
      from: dates.from ?? undefined,
      to: dates.to ?? undefined,
    };
  }, [dates]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dates && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {notDefaultValue && dates?.from ? (
              dates.to ? (
                <>
                  {format(dates.from, "LLL dd, y")} -{" "}
                  {format(dates.to, "LLL dd, y")}
                </>
              ) : (
                format(dates.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dates?.from ?? undefined}
            selected={selectedDate}
            onSelect={(value) => {
              setDate({
                from: value?.from ?? null,
                to: value?.to ?? null,
              });
            }}
            numberOfMonths={2}
            disabled={{
              before: new Date("03/11/2025"),
              after: new Date(),
            }}
          />

          <div className="p-4 flex justify-end pt-0">
            <Button
              variant="outline"
              onClick={() => {
                setDate({
                  from: dateFilterParsers.from.defaultValue,
                  to: dateFilterParsers.to.defaultValue,
                });
              }}
            >
              Reset
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
