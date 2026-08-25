import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/admin/api-auth";

import {

  deleteCommunityMember,

  isEmailSignupStorageReady,

  listCommunityMembers,

} from "@/lib/email-signups/waitlist";



export async function GET(request: Request) {

  const auth = await requireAdminUser(request, "view_analytics");

  if (!auth.ok) return auth.response;



  if (!isEmailSignupStorageReady()) {

    return NextResponse.json(

      { error: "Email storage is not configured.", members: [], stats: null },

      { status: 503 }

    );

  }



  try {

    const url = new URL(request.url);

    const q = url.searchParams.get("q")?.trim().toLowerCase() ?? "";

    const status = url.searchParams.get("status")?.trim() ?? "";

    const tier = url.searchParams.get("tier")?.trim() ?? "";



    let members = await listCommunityMembers();

    if (status) members = members.filter((m) => m.status === status);

    if (tier) members = members.filter((m) => m.membership_tier === tier);

    if (q) {

      members = members.filter(

        (m) =>

          m.email.toLowerCase().includes(q) ||

          m.source.toLowerCase().includes(q)

      );

    }



    const stats = {

      total: members.length,

      active: members.filter((m) => m.status === "active").length,

      verified: members.filter((m) => m.verified).length,

      free: members.filter((m) => m.membership_tier === "free").length,

      premium: members.filter((m) => m.membership_tier === "premium").length,

    };



    return NextResponse.json({ members, stats });

  } catch (err) {

    console.error("[admin/community-members GET]", err);

    return NextResponse.json({ error: "Failed to load members" }, { status: 500 });

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



    await deleteCommunityMember(body.id);

    return NextResponse.json({ ok: true });

  } catch (err) {

    console.error("[admin/community-members DELETE]", err);

    return NextResponse.json({ error: "Delete failed" }, { status: 500 });

  }

}

