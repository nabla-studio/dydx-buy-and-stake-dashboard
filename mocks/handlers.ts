import { http, HttpResponse } from "msw";
import circulating from "./circulating.json";
import genericMetrics from "./generic-metrics.json";

console.log(`${process.env.NEXT_PUBLIC_API_URL}/circulating`);
export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/circulating`, async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return HttpResponse.json(circulating, { status: 200 });
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/generic-metrics`, async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return HttpResponse.json(genericMetrics, { status: 200 });
  }),
];
