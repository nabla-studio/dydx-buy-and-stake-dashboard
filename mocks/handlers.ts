import { http, HttpResponse } from "msw";
import circulating from "./circulating.json";
import genericMetrics from "./generic-metrics.json";

console.log(`${process.env.NEXT_PUBLIC_API_URL}/circulating`);
export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/circulating`, () => {
    return HttpResponse.json(circulating, { status: 200 });
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/generic-metrics`, () => {
    return HttpResponse.json(genericMetrics, { status: 200 });
  }),
];
