"use client";

import type { Transaction } from "@/queries/options";
import { formatCompactNumber } from "@/utils/number";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { WalletBadge } from "./wallet-badge";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "datetime",
    header: "Date",
    cell(props) {
      return (
        <span className="text-muted-foreground">
          {Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(props.getValue() as string))}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell(props) {
      return (
        <span className="font-medium uppercase">{`${formatCompactNumber(props.getValue() as `${number}`)} ${props.row.original.denom}`}</span>
      );
    },
  },
  {
    accessorKey: "type",
    header() {
      return <span className="pl-[50px]">Type</span>;
    },
    cell(props) {
      return (
        <div className="pl-[50px]">
          {props.getValue() === "inflow" ? <ArrowDown /> : <ArrowUp />}
        </div>
      );
    },
  },
  {
    accessorKey: "sender",
    header() {
      return <span className="pl-[50px]">Sender</span>;
    },
    cell(props) {
      const value = props.getValue() as string;
      return (
        <div className="pl-[50px]">
          <WalletBadge address={value} />
        </div>
      );
    },
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
    cell(props) {
      const value = props.getValue() as string;
      return <WalletBadge address={value} />;
    },
  },
];
