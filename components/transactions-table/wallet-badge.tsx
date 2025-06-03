import {
  binanceBuyBackWalletAddress,
  buyBackWalletAddress,
  opsSubDAOWalletAddress,
  stakingWalletAddress,
} from "@/queries/options";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const WALLET_CONFIGS = {
  [stakingWalletAddress]: {
    label: "Staking Wallet Address",
    labelColor: "#FFFFFF",
    bgColor: "#1D283D",
  },
  [buyBackWalletAddress]: {
    label: "Buyback Wallet Address",
    labelColor: "#FFFFFF",
    bgColor: "#7573FE",
  },
  [binanceBuyBackWalletAddress]: {
    label: "Binance Buyback Address",
    labelColor: "#1D283D",
    bgColor: "#AEADF7",
  },
  [opsSubDAOWalletAddress]: {
    label: "OTC Recipient No. 1",
    labelColor: "#FFFFFF",
    bgColor: "#5A5A91",
  },
} as const;

export const WalletBadge = ({ address }: { address: string }) => {
  const config = WALLET_CONFIGS[address as keyof typeof WALLET_CONFIGS];

  if (!config) {
    return <span className="font-medium text-muted-foreground">{address}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            size="md"
            style={{
              backgroundColor: config.bgColor,
              color: config.labelColor,
            }}
          >
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{address}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
