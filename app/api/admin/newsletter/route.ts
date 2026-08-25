import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/admin/api-auth";

import {

  deleteNewsletterSubscriber,

  isEmailSignupStorageReady,

  listNewsletterSubscribers,

} from "@/lib/email-signups/waitlist";

import type { NewsletterSubscriberRow } from "@/lib/supabase/admin";



export async function GET(request: Request) {

  const auth = await requireAdminUser(request, "view_analytics");

  if (!auth.ok) return auth.response;



  if (!isEmailSignupStorageReady()) {

    return NextResponse.json(

      { error: "Email storage is not configured.", subscribers: [], stats: null },

      { status: 503 }

    );

  }



  try {

    const url = new URL(request.url);

    const q = url.searchParams.get("q")?.trim().toLowerCase() ?? "";

    const archiveId = url.searchParams.get("archiveId")?.trim() ?? "";

    const status = url.searchParams.get("status")?.trim() ?? "";



    let subscribers = await listNewsletterSubscribers();

    if (archiveId) {

      subscribers = subscribers.filter((s) => s.archive_id === archiveId);

    }

    if (status) {

      subscribers = subscribers.filter((s) => s.status === status);

    }

    if (q) {

      subscribers = subscribers.filter(

        (s) =>

          s.email.toLowerCase().includes(q) ||

          (s.book_title?.toLowerCase().includes(q) ?? false)

      );

    }



    const stats = {

      total: subscribers.length,

      active: subscribers.filter((s) => s.status === "active").length,

      verified: subscribers.filter((s) => s.verified).length,

      byArchive: Object.entries(

        subscribers.reduce<Record<string, number>>((acc, s) => {

          const key = s.archive_id ?? "unknown";

          acc[key] = (acc[key] ?? 0) + 1;

          return acc;

        }, {})

      ),

    };



    return NextResponse.json({

      subscribers: subscribers as NewsletterSubscriberRow[],

      stats,

    });

  } catch (err) {

    console.error("[admin/newsletter GET]", err);

    return NextResponse.json({ error: "Failed to load subscribers" }, { status: 500 });

  }

}



export async function DELETE(request: Request) {

  const auth = await requireAdminUser(request, "view_analytics");

  if (!auth.ok) return auth.response;



  if (!isEmailSignupStorageReady()) {

    return NextResponse.json({ error: "Email storage not configured" }, { status: 503 });

  }



  try {

    const body = (await request.json()) as { id?: string };

    if (!body.id) {

      return NextResponse.json({ error: "id required" }, { status: 400 });

    }



    await deleteNewsletterSubscriber(body.id);

    return NextResponse.json({ ok: true });

  } catch (err) {

    console.error("[admin/newsletter DELETE]", err);

    return NextResponse.json({ error: "Delete failed" }, { status: 500 });

  }

}

