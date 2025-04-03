import { parseAsIsoDate } from "nuqs";

export const today = new Date();
export const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);

export const dateFilterParsers = {
  from: parseAsIsoDate.withDefault(thirtyDaysAgo),
  to: parseAsIsoDate.withDefault(today),
};
