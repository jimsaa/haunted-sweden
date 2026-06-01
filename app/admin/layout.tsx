import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Haunted Sweden",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell min-h-[calc(100vh-4rem)] bg-[#050508] text-white">
      {children}
    </div>
  );
}
