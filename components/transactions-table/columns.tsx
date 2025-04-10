"use client";

import { formatCurrencyNumber } from "@/utils/number";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export type Transaction = {
  datetime: string;
  amount: string;
  type: "inflow" | "outflow";
  denom: string;
  sender: string;
  recipient: string;
};

const stakingWalletAddress = "dydx1p3ucd3ptpw902fluyjzhq3ffgq4ntdda3u7e39";
const buyBackWalletAddress = "dydx18vgsfaarveyg7xy585657ak8a9jvut9z8yuzmv";

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
        <span className="font-medium">{`${formatCurrencyNumber(props.getValue() as `${number}`)} ${props.row.original.denom}`}</span>
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

      if (stakingWalletAddress === value) {
        return (
          <div className="pl-[50px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge size="md">Staking Wallet Address</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{value}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      }

      if (buyBackWalletAddress === value) {
        return (
          <div className="pl-[50px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge size="md" variant="muted">
                    Buyback Wallet Address
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{value}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      }

      return (
        <span className="pl-[50px] font-medium text-muted-foreground">
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
    cell(props) {
      const value = props.getValue() as string;

      if (stakingWalletAddress === value) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge size="md">Staking Wallet Address</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{value}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      if (buyBackWalletAddress === value) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge size="md" variant="muted">
                  Buyback Wallet Address
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{value}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return <span className="font-medium text-muted-foreground">{value}</span>;
    },
  },
];
