import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { HauntedAmbienceProvider } from "@/components/map/HauntedAmbienceContext";
import { SiteHeader } from "@/components/SiteHeader";
import { BRAND_LOGO_SRC } from "@/lib/brand";
import { SITE_URL } from "@/lib/seo/constants";
import { getHomeDescription } from "@/lib/seo/descriptions";
import { SEO_TITLES } from "@/lib/seo/titles";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata({
    title: SEO_TITLES.home,
    description: getHomeDescription("sv"),
    path: "/",
  }),
  icons: {
    icon: BRAND_LOGO_SRC,
    apple: BRAND_LOGO_SRC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${cinzel.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-black text-white antialiased">
        <LanguageProvider>
          <HauntedAmbienceProvider>
            <SiteHeader />
            {children}
          </HauntedAmbienceProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
