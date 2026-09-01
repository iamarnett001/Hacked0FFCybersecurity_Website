import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

import { site } from "@/lib/site";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cybersecurity for family businesses",
    template: "%s",
  },
  description: site.description,
  openGraph: {
    title: "Cybersecurity for family businesses",
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
