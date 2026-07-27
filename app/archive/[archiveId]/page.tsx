import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookArchivePage } from "@/components/book-archive/BookArchivePage";
import {
  getBookArchiveById,
  getPublishedArchiveIds,
} from "@/lib/book-archive/load-books";

type PageProps = {
  params: Promise<{ archiveId: string }>;
};

export async function generateStaticParams() {
  const ids = await getPublishedArchiveIds();
  return ids.map((archiveId) => ({ archiveId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { archiveId } = await params;
  const book = await getBookArchiveById(archiveId);
  if (!book) {
    return {
      title: "Archive",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${book.title} — Investigation Archive`,
    description: "Private investigation archive for book readers.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-image-preview": "none",
        "max-snippet": -1,
      },
    },
    openGraph: undefined,
    twitter: undefined,
    alternates: undefined,
  };
}

export default async function BookArchiveRoute({ params }: PageProps) {
  const { archiveId } = await params;
  const book = await getBookArchiveById(archiveId);
  if (!book) notFound();

  return <BookArchivePage book={book} />;
}
