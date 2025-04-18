"use client";

import { queryClient } from "@/configs/tanstack-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";

export const Providers = (props: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </NuqsAdapter>
  );
};
