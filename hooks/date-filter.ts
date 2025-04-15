import { dateFilterParsers } from "@/state/date-filter";
import { useQueryStates } from "nuqs";

export const useDateFilter = () => {
  const [dates, setDate] = useQueryStates(dateFilterParsers);

  const notDefaultValue =
    dateFilterParsers.from.defaultValue.getTime() !== dates.from.getTime() ||
    dateFilterParsers.to.defaultValue.getTime() !== dates.to.getTime();

  return {
    dates,
    setDate,
    notDefaultValue,
  };
};
