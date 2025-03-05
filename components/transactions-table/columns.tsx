"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  hash: string;
  date: string;
  amount: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "hash",
    header: "Hash",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
