import {
  getCirculatingSupplyHistory,
  getGenericMetrics,
} from "@/services/numia";
import { queryOptions } from "@tanstack/react-query";

export const circulatingSupplyHistoryQuery = queryOptions({
  queryKey: ["circulating-supply-history"],
  queryFn: getCirculatingSupplyHistory,
});

export const genericMetricsQuery = queryOptions({
  queryKey: ["generic-metrics"],
  queryFn: getGenericMetrics,
});
