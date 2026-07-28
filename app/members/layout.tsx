import type { Metadata } from "next";
import "./members.css";

export const metadata: Metadata = {
  title: "Members | Haunted Sweden",
  robots: { index: false, follow: false },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
