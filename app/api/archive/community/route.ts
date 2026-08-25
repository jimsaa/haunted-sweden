import { NextResponse } from "next/server";

import { getBookArchiveById } from "@/lib/book-archive/load-books";

import {

  insertArchiveCommunityResponse,

  isEmailSignupStorageReady,

  upsertCommunityWaitlistEmail,

} from "@/lib/email-signups/waitlist";



type Body = {

  archiveId?: string;

  investigationId?: string;

  visited?: "yes" | "not_yet";

  story?: string;

  email?: string;

};



const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



export async function POST(request: Request) {

  try {

    if (!isEmailSignupStorageReady()) {

      console.error("[archive/community] Email storage not configured");

      return NextResponse.json(

        {

          error: "Submission is temporarily unavailable.",

          errorSv: "Inskickningen är tillfälligt otillgänglig.",

        },

        { status: 503 }

      );

    }



    const body = (await request.json()) as Body;

    const archiveId = body.archiveId?.trim();

    const investigationId = body.investigationId?.trim();

    const visited = body.visited;

    const story = body.story?.trim();

    const email = body.email?.trim().toLowerCase();



    if (!archiveId || !investigationId) {

      return NextResponse.json(

        { error: "Missing archive or investigation.", errorSv: "Arkiv eller utredning saknas." },

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



    const investigation = book.investigations.find((i) => i.id === investigationId);

    if (!investigation) {

      return NextResponse.json(

        { error: "Investigation not found.", errorSv: "Utredningen hittades inte." },

        { status: 404 }

      );

    }



    if (visited !== "yes" && visited !== "not_yet") {

      return NextResponse.json(

        {

          error: "Please select whether you have visited this location.",

          errorSv: "Välj om du har besökt platsen.",

        },

        { status: 400 }

      );

    }



    if (story && story.length > 5000) {

      return NextResponse.json(

        { error: "Story is too long.", errorSv: "Berättelsen är för lång." },

        { status: 400 }

      );

    }



    if (email && !EMAIL_RE.test(email)) {

      return NextResponse.json(

        { error: "Invalid email address.", errorSv: "Ogiltig e-postadress." },

        { status: 400 }

      );

    }



    if (visited === "yes" && story && !story.trim()) {

      return NextResponse.json(

        {

          error: "Please describe your experience.",

          errorSv: "Beskriv din upplevelse.",

        },

        { status: 400 }

      );

    }



    const { error } = await insertArchiveCommunityResponse({

      archiveId,

      investigationId,

      visited,

      story: story || null,

      email: email || null,

    });



    if (error) {

      console.error("[archive/community]", error);

      return NextResponse.json(

        {

          error: "Could not submit. Please try again.",

          errorSv: "Kunde inte skicka. Försök igen.",

        },

        { status: 500 }

      );

    }



    if (email) {

      const waitlist = await upsertCommunityWaitlistEmail(

        email,

        `Book Archive Story (${archiveId})`

      );

      if (waitlist.error) {

        console.error("[archive/community] waitlist upsert", waitlist.error);

      }

    }



    return NextResponse.json({ ok: true });

  } catch (err) {

    console.error("[archive/community]", err);

    return NextResponse.json(

      {

        error: "Could not submit. Please try again.",

        errorSv: "Kunde inte skicka. Försök igen.",

      },

      { status: 500 }

    );

  }

}

