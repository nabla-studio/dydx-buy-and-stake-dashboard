import { parseAsIsoDate } from "nuqs";

export const today = new Date();
export const thirtyDaysAgo = new Date("03-08-2025");

export const dateFilterParsers = {
  from: parseAsIsoDate.withDefault(thirtyDaysAgo),
  to: parseAsIsoDate.withDefault(today),
};
