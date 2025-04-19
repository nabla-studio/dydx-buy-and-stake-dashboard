import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Providers } from "./providers";

const satoshi = localFont({
  src: "../public/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_DASHBOARD_URL
    ? new URL(process.env.NEXT_PUBLIC_DASHBOARD_URL)
    : undefined,
  openGraph: {
    title: "dYdX Buyback Tracker: Powered by the Community",
  },
  twitter: {
    card: "summary_large_image",
    title: "dYdX Buyback Tracker: Powered by the Community",
  },
  title: "dYdX Buyback Tracker: Powered by the Community",
  description:
    "A transparent view into the DYDX Buyback Program. Monitor protocol revenue, monthly Buybacks, staking metrics, and the broader dYdX ecosystem, all in real time.",
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
            <div className="flex justify-between mb-10">
              <a href="https://www.dydx.xyz/" target="_blank" rel="noreferrer">
                <Image
                  alt="dYdX logo"
                  src="/logo.svg"
                  width={100}
                  height={32}
                />
              </a>

              <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-end">
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
                    <a
                      href="https://x.com/dYdX"
                      target="_blank"
                      rel="noreferrer"
                    >
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
                  <li className="ml-auto lg:ml-4">
                    <Button asChild>
                      <a
                        href="https://dydx.trade/?utm_source=dydx-buy-and-stake-dashboard"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Trade
                      </a>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-justify leading-normal text-muted-foreground text-xs">
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
              well as in other restricted jurisdictions. nabla srl benefit
              corporation has received a grant from the dYdX Ecosystem
              Development Program to create and administer the Site, without any
              ongoing control or direction by the dYdX Foundation, dYdX Trading
              Inc. and/or any other dYdX-affiliated entities (collectively,
              “dYdX Entities”). nabla srl benefit corporation is fully
              independent from, and unaffiliated with, any of the dYdX entities.
              Under no circumstances shall any of the dYdX Entities be held
              liable for any loss or damage of any kind incurred as a result of
              the use of the Site or the information or the activities herein,
              including but not limited to, direct, indirect, incidental,
              punitive, and consequential damages.
            </p>

            <div className="flex justify-end">
              <a
                href="https://www.nabla.studio/"
                target="_blank"
                rel="noreferrer"
                className="group mt-5 text-sm font-bold flex items-center gap-1"
              >
                <span className="opacity-50">proudly made by</span>
                <Image
                  src="/nabla_logo.svg"
                  alt="nabla"
                  className="w-auto h-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  width={443}
                  height={81}
                />
              </a>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
