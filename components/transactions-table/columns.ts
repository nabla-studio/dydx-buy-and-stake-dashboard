"use client";

import { formatShortDate } from "@/utils/date";
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
    cell(props) {
      return Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(props.getValue()));
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
