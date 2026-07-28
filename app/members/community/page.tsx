import { MembersShell } from "@/components/members/MembersShell";
import { MembersCommunityPage } from "@/components/members/MembersCommunityPage";

export default function Page() {
  return (
    <MembersShell>
      <MembersCommunityPage />
    </MembersShell>
  );
}
