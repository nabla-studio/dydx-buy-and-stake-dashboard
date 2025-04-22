import Image from "next/image";
import Link from "next/link";
import { TradeButton } from "./trade-button";

export const Navbar = () => (
  <nav className="px-5 xl:px-10 2xl:container pb-5 pt-10 flex items-center justify-between">
    <Link className="flex items-center gap-4" href="/">
      <Image alt="dYdX logo" src="/logo.svg" width={100} height={32} />

      <span className="text-[10px] text-primary font-bold uppercase leading-tight">
        Buyback
        <br />
        program
      </span>
    </Link>

    <TradeButton />
  </nav>
);
