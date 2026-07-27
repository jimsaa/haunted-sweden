import type { Metadata } from "next";

/**
 * Book Archive layout — hidden from search engines, no site navigation.
 * Access only via secret URL printed in purchased books.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function BookArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
