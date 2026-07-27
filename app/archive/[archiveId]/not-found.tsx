import Link from "next/link";

export default function BookArchiveNotFound() {
  return (
    <div className="book-archive book-archive--not-found">
      <main className="book-archive-main book-archive-main--centered">
        <p className="book-archive-eyebrow">Investigation Archive</p>
        <h1 className="book-archive-title">Archive not found</h1>
        <p className="book-archive-lead">
          This URL does not match a known archive. Check the address printed in
          your book.
        </p>
        <Link href="/" className="book-archive-map-link">
          Return to Haunted Sweden
        </Link>
      </main>
    </div>
  );
}
