"use client";

import { queryClient } from "@/configs/tanstack-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

export const Providers = (props: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
