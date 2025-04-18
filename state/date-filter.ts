import { parseAsIsoDate } from "nuqs";

export const today = new Date();
export const thirtyDaysAgo = new Date("2025-03-11");

export const dateFilterParsers = {
  from: parseAsIsoDate.withDefault(thirtyDaysAgo),
  to: parseAsIsoDate.withDefault(today),
};
