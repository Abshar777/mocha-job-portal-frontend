import type { Metadata } from "next";
import { DM_Sans, Work_Sans } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import NextTopLoader from "nextjs-toploader";
import ReactQueryProvider from "@/utils/react-query";
import { Toaster } from "sonner";
import { StoreProvider } from "@/store/provider";
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mocha",
  description: "mocha - job portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${dmSans.variable} ${dmSans.className} text-secondary ${workSans.variable} ${workSans.className} antialiased`}
      >
        <NextTopLoader
          height={2}
          shadow="0 0 10px #F9CC16"
          color="#F9CC16"
          showSpinner={false}
          zIndex={99999999999}
        />
        <HeroUIProvider>
          <ReactQueryProvider>
            <Toaster
              visibleToasts={1}
              position="bottom-center"
              richColors
              theme="dark"
            />
            <StoreProvider>
              {children}
            </StoreProvider>
          </ReactQueryProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
