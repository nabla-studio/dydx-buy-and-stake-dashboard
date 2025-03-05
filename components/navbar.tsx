import Link from "next/link";
import { Button } from "./ui/button";

export const Navbar = () => (
  <nav className="container py-5 flex items-center justify-between">
    <Link href="/">Logo</Link>

    <Button asChild>
      <Link href="https://dydx.trade/?utm_source=dydx-buy-and-stake-dashboard">
        Trade
      </Link>
    </Button>
  </nav>
);
