import { NextResponse } from "next/server";
import { getBookArchiveById } from "@/lib/book-archive/load-books";
import {
  isEmailSignupStorageReady,
  upsertCommunityWaitlistEmail,
  upsertNewsletterSubscriber,
} from "@/lib/email-signups/waitlist";

type Body = {
  email?: string;
  archiveId?: string;
  bookTitle?: string;
  consent?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    if (!isEmailSignupStorageReady()) {
      console.error("[archive/newsletter] Email storage not configured");
      return NextResponse.json(
        {
          error: "Newsletter is temporarily unavailable.",
          errorSv: "Nyhetsbrevet är tillfälligt otillgängligt.",
        },
        { status: 503 }
      );
    }

    const body = (await request.json()) as Body;
    const email = body.email?.trim().toLowerCase();
    const archiveId = body.archiveId?.trim();
    const bookTitle = body.bookTitle?.trim();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
          errorSv: "Ange en giltig e-postadress.",
        },
        { status: 400 }
      );
    }

    if (!archiveId) {
      return NextResponse.json(
        { error: "Archive ID required.", errorSv: "Arkiv-ID krävs." },
        { status: 400 }
      );
    }

    const book = await getBookArchiveById(archiveId);
    if (!book) {
      return NextResponse.json(
        { error: "Archive not found.", errorSv: "Arkivet hittades inte." },
        { status: 404 }
      );
    }

    if (body.consent === false) {
      return NextResponse.json(
        {
          error: "Consent is required to subscribe.",
          errorSv: "Samtycke krävs för att prenumerera.",
        },
        { status: 400 }
      );
    }

    const { error } = await upsertNewsletterSubscriber({
      email,
      archiveId,
      bookTitle: bookTitle ?? book.title,
      source: "Book Archive",
    });

    if (error) {
      console.error("[archive/newsletter]", error);
      return NextResponse.json(
        {
          error: "Could not subscribe. Please try again.",
          errorSv: "Kunde inte prenumerera. Försök igen.",
        },
        { status: 500 }
      );
    }

    const waitlist = await upsertCommunityWaitlistEmail(
      email,
      `Book Archive Newsletter (${archiveId})`
    );
    if (waitlist.error) {
      console.error("[archive/newsletter] waitlist upsert", waitlist.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[archive/newsletter]", err);
    return NextResponse.json(
      {
        error: "Could not subscribe. Please try again.",
        errorSv: "Kunde inte prenumerera. Försök igen.",
      },
      { status: 500 }
    );
  }
}
