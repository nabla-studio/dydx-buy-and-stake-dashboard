"use client";

import { queryClient } from "@/configs/tanstack-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development" || typeof window === "undefined") {
    return;
  }

  const { worker } = await import("../mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

/* enableMocking(); */

export const Providers = (props: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
