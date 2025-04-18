import type { ToggleGroupSingleProps } from "@radix-ui/react-toggle-group";
import { useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const today = new Date();
const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st of current year

const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

export const useFilters = () => {
  const [filter, setFilter] = useState("ytd");

  const filters = useMemo(() => {
    return {
      start: filter === "ytd" ? startOfYear : oneMonthAgo,
      end: today,
    };
  }, [filter]);

  return {
    filter,
    filters,
    setFilter,
  };
};

export const Filters = (props: Partial<ToggleGroupSingleProps>) => {
  return (
    <ToggleGroup {...props} type="single" variant="outline">
      <ToggleGroupItem value="30d" aria-label="30 days">
        30D
      </ToggleGroupItem>
      <ToggleGroupItem value="ytd" aria-label="Year to date">
        YTD
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
