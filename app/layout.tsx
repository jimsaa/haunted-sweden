import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { HauntedAmbienceProvider } from "@/components/map/HauntedAmbienceContext";
import { SiteHeader } from "@/components/SiteHeader";
import { BRAND_LOGO_SRC } from "@/lib/brand";

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
  title: "Haunted Sweden — Discover Sweden's Haunted Places",
  description:
    "Explore haunted locations, paranormal reports and local legends across Sweden.",
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
    <html lang="en" className={`${cinzel.variable} h-full`} suppressHydrationWarning>
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
