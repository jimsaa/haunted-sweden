import { SpokjaktArchiveClient } from "@/components/spokjakt/SpokjaktArchiveClient";

export const metadata = {
  title: "Spökjakt Locations — Haunted Sweden",
  description:
    "Explore haunted locations from Spökjakt with Joakim Lundell, Jonna Lundell and LaxTon Ghost Sweden. Watch the official playlist and discover places on Haunted Sweden.",
};

export default function SpokjaktArchivePage() {
  return <SpokjaktArchiveClient />;
}
