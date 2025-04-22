import { ExternalLink, XIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogFooter } from "./ui/alert-dialog";
import { Button } from "./ui/button";

export const TradeButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer" asChild>
        <Button>Trade</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="relative">
          <AlertDialogTitle className="text-center font-bold text-2xl">
            Leaving site
          </AlertDialogTitle>
          <AlertDialogCancel asChild>
            <Button
              variant="link"
              size="icon"
              className="text-muted-foreground cursor-pointer absolute top-0 border-0 right-0"
            >
              <XIcon />
            </Button>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Leaving site. By clicking ‘Continue’, you will be leaving this website
          and accessing a website made available by a third party using dYdX v4
          open-source software that is independent from and unaffiliated with
          Nabla SRL Benefit Corporation (&quot;Nabla&quot;). Nabla is not
          responsible for any action taken by independent third parties or for
          content on any third-party websites, including the one you would
          access by clicking ‘Continue’.
          <br />
          <br />
          dYdX is not available to persons who are residents of, are located or
          incorporated in, or have a registered office in the U.S., Canada or a
          Restricted Territory. More details can be found in its{" "}
          <a
            href="https://www.dydx.foundation/terms-of-use"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline"
          >
            Terms of Use
          </a>
          . Learn more about dYdX v4 third-party front end options{" "}
          <a
            href="https://dydx.exchange/dydx-chain-front-end-options"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline"
          >
            here
          </a>
          .
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction className="w-full" asChild>
            <a
              href="https://dydx.trade/?utm_source=dydx-buy-and-stake-dashboard"
              target="_blank"
              rel="noreferrer"
            >
              Continue
              <ExternalLink className="w-4 h-4" />
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
