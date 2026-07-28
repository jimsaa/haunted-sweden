import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Members | Haunted Sweden",
  robots: { index: false, follow: false },
};

export default function MembersIndexPage() {
  redirect("/members/dashboard");
}
