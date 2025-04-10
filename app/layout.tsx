import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { Providers } from "./providers";

const satoshi = localFont({
  src: "../public/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  openGraph: {
    title: "DYDX Buyback Program",
  },
  twitter: {
    card: "summary_large_image",
    title: "DYDX Buyback Program",
  },
  title: "dYdX Buyback Tracker: Powered by the Community",
  description:
    "A transparent view into the DYDX Buyback Program. Monitor protocol revenue, monthly buybacks, staking metrics, and the broader dYdX ecosystem, all in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} font-sans antialiased dark`}>
        <Providers>
          <Navbar />
          <main className="px-5 xl:px-10 2xl:container">{children}</main>
          <footer className="px-5 xl:px-10 2xl:container pt-20 pb-5">
            <Link href="/">
              <Image alt="dYdX logo" src="/logo.svg" width={100} height={32} />
            </Link>

            <div className="flex items-center justify-between mt-5 mb-10">
              <p className="text-muted-foreground text-xs font-bold">
                © {new Date().getFullYear()} dYdX Foundation. All rights
                reserved.
              </p>

              <ul className="flex gap-4 items-center">
                <li>
                  <a
                    href="https://github.com/dydxprotocol"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      alt="Github"
                      src="/github.svg"
                      width={24}
                      height={24}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/invite/dydx"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      alt="Discord"
                      src="/discord.svg"
                      width={24}
                      height={24}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/dydxprotocol/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      alt="Reddit"
                      src="/reddit.svg"
                      width={24}
                      height={24}
                    />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/dYdX" target="_blank" rel="noreferrer">
                    <Image alt="X" src="/x.svg" width={24} height={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@dYdXprotocol"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      alt="Youtube"
                      src="/youtube.svg"
                      width={24}
                      height={24}
                    />
                  </a>
                </li>
              </ul>
            </div>

            <p className=" leading-normal text-muted-foreground text-xs">
              Nothing in this website should be used or considered as legal,
              financial, tax, or any other advice, nor as an instruction or
              invitation to act by anyone. Users should conduct their own
              research and due diligence before making any decisions.
              <br />
              The information in this website may be altered or updated at any
              time and nabla srl benefit corporation assumes no obligation to
              publicly disclose any such change. Most of the information in this
              website has been obtained from third-party sources and has not
              been independently verified. nabla srl benefit corporation assumes
              no responsibility for the accuracy or completeness of the
              information in this website, which is made available to the public
              for free in good faith and for informational purposes only.
              Crypto-assets can be highly volatile and trading crypto-assets
              involves risk of loss, particularly when using leverage.
              Investment into crypto-assets may not be regulated and may not be
              adequate for retail investors. Do your own research and due
              diligence before engaging in any activity involving crypto-assets.
              dYdX is a decentralised, disintermediated and permissionless
              protocol, and is not available in the U.S. or to U.S. persons as
              well as in other restricted jurisdictions.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
